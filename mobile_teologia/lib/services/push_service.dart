// lib/services/push_service.dart
// --------------------------------------------------------------
// Serviço (singleton) responsável por:
//   • solicitar permissão ao usuário (Android 13+/iOS)            
//   • registrar-se no FCM e monitorar mudança de token           
//   • exibir notificações locais (heads-up) quando o app          
//     estiver em primeiro plano                                  
//   • despachar deep-link pelo payload `route` ao clicar na       
//     notificação, em **qualquer** estado do app                  
// --------------------------------------------------------------
// Mantenha este serviço totalmente isolado de widgets. Ele não
// referencia BuildContext e pode ser usado em *qualquer* camada
// da aplicação.

import 'dart:async';
import 'dart:io';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'package:mobile_teologia/main.dart' show navigatorKey; // chave global

/* ╔══════════════════════════════════════════════════════════════╗
   ║                     HANDLER EM 2º-PLANO                      ║
   ║    – precisa ser TOP-LEVEL (fora de classes) para AOT       ║
   ╚══════════════════════════════════════════════════════════════╝ */
@pragma('vm:entry-point')
Future<void> firebaseBackgroundHandler(RemoteMessage message) async {
  await _PushService.instance._showLocal(message);
}

/// Alias para retro-compatibilidade com `main.dart`
@pragma('vm:entry-point')
Future<void> handleBackground(RemoteMessage m) => firebaseBackgroundHandler(m);

/* ╔══════════════════════════════════════════════════════════════╗
   ║                       PUSH SERVICE                           ║
   ╚══════════════════════════════════════════════════════════════╝ */
class _PushService {
  _PushService._();
  static final _PushService instance = _PushService._();

  /* ────────── Atalhos estáticos ────────── */
  static Future<void> init() => instance._init();
  @pragma('vm:entry-point')
  static Future<void> handleBg(RemoteMessage m) => instance._showLocal(m);

  /* ────────── Dependências ────────── */
  final FirebaseMessaging _fcm = FirebaseMessaging.instance;
  final FlutterLocalNotificationsPlugin _local =
      FlutterLocalNotificationsPlugin();

  // Completer indica quando já criamos canais Android
  final Completer<void> _channelReady = Completer();

  // Caso queira enviar token pro backend
  final _backendEndpoint = dotenv.env['FCM_REGISTER_URL'];

  /* =================================================================== */
  /*  BOOTSTRAP                                                          */
  /* =================================================================== */
  Future<void> _init() async {
    /* 1️⃣  Permissão: Android 13+ NOTIFICATION permission & iOS prompts */
    await _requestPermission();

    /* 2️⃣  Token & refresh listener */
    await _configureToken();

    /* 3️⃣  Notificações locais  */
    await _setupLocalNotifications();

    /* 4️⃣  Listeners de runtime  */
    FirebaseMessaging.onMessage.listen(_onForeground);
    FirebaseMessaging.onMessageOpenedApp.listen(_onOpened);
    FirebaseMessaging.onBackgroundMessage(firebaseBackgroundHandler);

    /* 5️⃣  Se o app foi aberto pela notificação quando estava fechado */
    final initialMsg = await _fcm.getInitialMessage();
    if (initialMsg != null) _onOpened(initialMsg);
  }

  /* ──────────────────────────────────────────────────────────────── */
  /*                     SOLICITA PERMISSÃO                           */
  /* ──────────────────────────────────────────────────────────────── */
  Future<void> _requestPermission() async {
    // iOS / macOS
    final settings = await _fcm.requestPermission(
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      criticalAlert: false,
      provisional: false,
      sound: true,
    );

    if (kDebugMode) {
      debugPrint('🔔 FCM permission: ${settings.authorizationStatus}');
    }

    // Android 13+: solicitar permissão explícita de notificação
    if (Platform.isAndroid) {
      final plugin = _local
          .resolvePlatformSpecificImplementation<
              AndroidFlutterLocalNotificationsPlugin>();
      final granted = await plugin?.areNotificationsEnabled() ?? true;
      if (!granted) {
        await plugin?.requestNotificationsPermission();
      }
    }
  }

  /* ──────────────────────────────────────────────────────────────── */
  /*                        TOKEN & BACKEND                           */
  /* ──────────────────────────────────────────────────────────────── */
  Future<void> _configureToken() async {
    final token = await _fcm.getToken();
    if (kDebugMode) debugPrint('🔑 FCM token: $token');
    _sendTokenToBackend(token);

    _fcm.onTokenRefresh.listen((t) {
      if (kDebugMode) debugPrint('🔄 Novo FCM token: $t');
      _sendTokenToBackend(t);
    });
  }

  Future<void> _sendTokenToBackend(String? token) async {
    if (token == null || _backendEndpoint == null) return;
    // Faça requisição HTTP POST em background; ignore erros.
    // Exemplo rápido (sem importar http):
    // unawaited(http.post(Uri.parse(_backendEndpoint!), body: {'token': token}));
  }

  /* ──────────────────────────────────────────────────────────────── */
  /*                CONFIGURA NOTIFICAÇÃO LOCAL (HEADS-UP)            */
  /* ──────────────────────────────────────────────────────────────── */
  Future<void> _setupLocalNotifications() async {
    // Canal Android para prioridade HIGH
    const channel = AndroidNotificationChannel(
      'high_importance',
      'Notificações importantes',
      description: 'Canal para exibir notificações em primeiro plano',
      importance: Importance.high,
    );

    final androidPlugin = _local
        .resolvePlatformSpecificImplementation<
            AndroidFlutterLocalNotificationsPlugin>();
    await androidPlugin?.createNotificationChannel(channel);

    _channelReady.complete();

    const initSettings = InitializationSettings(
      android: AndroidInitializationSettings('@mipmap/ic_launcher'),
      iOS: DarwinInitializationSettings(),
    );

    await _local.initialize(
      initSettings,
      onDidReceiveNotificationResponse: (resp) => _openRoute(resp.payload),
    );
  }

  /* ──────────────────────────────────────────────────────────────── */
  /*                     LISTENER: 1º PLANO                          */
  /* ──────────────────────────────────────────────────────────────── */
  void _onForeground(RemoteMessage message) => _showLocal(message);

  /* ──────────────────────────────────────────────────────────────── */
  /*           LISTENER: usuário clicou na notificação               */
  /* ──────────────────────────────────────────────────────────────── */
  void _onOpened(RemoteMessage message) {
    _openRoute(message.data['route']);
  }

  /* ──────────────────────────────────────────────────────────────── */
  /*            EXIBE NOTIFICAÇÃO LOCAL (heads-up)                   */
  /* ──────────────────────────────────────────────────────────────── */
  Future<void> _showLocal(RemoteMessage m) async {
    // Aguarda canal Android pronto
    if (!_channelReady.isCompleted) await _channelReady.future;

    final n = m.notification;
    if (n == null) return; // mensagens data-only

    const android = AndroidNotificationDetails(
      'high_importance',
      'Notificações importantes',
      channelShowBadge: true,
      importance: Importance.high,
      priority: Priority.high,
      ticker: 'ticker',
    );

    const ios = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );

    await _local.show(
      n.hashCode, // id único
      n.title,
      n.body,
      const NotificationDetails(android: android, iOS: ios),
      payload: m.data['route'],
    );
  }

  /* ──────────────────────────────────────────────────────────────── */
  /*                Abre rota quando clicar na notificação            */
  /* ──────────────────────────────────────────────────────────────── */
  void _openRoute(String? route) {
    if (route == null || route.isEmpty) return;
    navigatorKey.currentState?.pushNamed(route);
  }

  /* ──────────────────────────────────────────────────────────────── */
  /*                         TÓPICOS FCM                              */
  /* ──────────────────────────────────────────────────────────────── */
  Future<void> subscribe(String topic)   => _fcm.subscribeToTopic(topic);
  Future<void> unsubscribe(String topic) => _fcm.unsubscribeFromTopic(topic);
  Future<void> deleteToken()             => _fcm.deleteToken();
}
