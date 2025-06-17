// lib/main.dart
// ╔══════════════════════════════════════════════════════════╗
// ║  Ponto de entrada da aplicação mobile da FATEAL          ║
// ║  ▸ .env + Firebase + FCM                                 ║
// ║  ▸ PushService (foreground / background)                 ║
// ║  ▸ ThemeProvider (claro/escuro + persistência)           ║
// ║  ▸ Internacionalização (gen-l10n)                        ║
// ║  ▸ Tratamento global de erros / Crashlytics (opcional)   ║
// ╚══════════════════════════════════════════════════════════╝
// lib/main.dart
import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'package:provider/provider.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

import 'firebase_options.dart';
import 'services/push_service.dart' as push;

import 'theme/theme_provider.dart';
import 'theme/language_provider.dart';
import 'app.dart';
import 'l10n/l10n.dart'; // se você tiver essa pasta de suporte à localização

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();
export 'main.dart' show navigatorKey;

@pragma('vm:entry-point')
Future<void> _firebaseBackgroundBridge(RemoteMessage message) async {
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  return push.firebaseBackgroundHandler(message);
}

Future<void> _bootstrap() async {
  WidgetsFlutterBinding.ensureInitialized();

  await dotenv.load(fileName: '.env');

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  FirebaseMessaging.onBackgroundMessage(_firebaseBackgroundBridge);

  await push.PushService.init();

  await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
}

void main() async {
  await _bootstrap();

  runZonedGuarded(
    () {
      runApp(
        MultiProvider(
          providers: [
            ChangeNotifierProvider(create: (_) => ThemeProvider()),
            ChangeNotifierProvider(create: (_) => LanguageProvider()),
          ],
          child: const _BootstrapWrapper(),
        ),
      );
    },
    (error, stack) {
      if (kDebugMode) {
        print('Erro não capturado: $error\n$stack');
      }
    },
  );
}

class _BootstrapWrapper extends StatelessWidget {
  const _BootstrapWrapper();

  @override
  Widget build(BuildContext context) {
    ErrorWidget.builder = (details) {
      return Material(
        color: Colors.red.shade50,
        child: Center(
          child: Text(
            'Ocorreu um erro inesperado 🙈\n${details.exception}',
            style: const TextStyle(color: Colors.red),
            textAlign: TextAlign.center,
          ),
        ),
      );
    };

    final banner = kDebugMode
        ? const Banner(
            message: 'DEBUG',
            location: BannerLocation.topStart,
            color: Colors.blueAccent,
          )
        : const SizedBox.shrink();

    return Stack(
      children: [
        const _LocalizedAppWrapper(),
        banner,
      ],
    );
  }
}

class _LocalizedAppWrapper extends StatelessWidget {
  const _LocalizedAppWrapper();

  @override
  Widget build(BuildContext context) {
    final langProvider = Provider.of<LanguageProvider>(context);

    return MaterialApp(
      navigatorKey: navigatorKey,
      title: 'Teologia FATEAL',
      themeMode: Provider.of<ThemeProvider>(context).themeMode,
      theme: ThemeProvider.light,
      darkTheme: ThemeProvider.dark,

      // 🌍 Internacionalização real
      locale: langProvider.locale,
      supportedLocales: const [Locale('pt'), Locale('en')],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],

      debugShowCheckedModeBanner: false,
      home: MobileTeologiaApp(navigatorKey: navigatorKey),
    );
  }
}