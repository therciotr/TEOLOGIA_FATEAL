import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'pages/login_page.dart';
import 'pages/home_page.dart';
import 'pages/alunos_page.dart';
import 'pages/mensalidades_page.dart';
import 'pages/notificacoes_page.dart';
import 'pages/qr_code_scanner_page.dart';

// Handler de mensagens FCM em background
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  print("Mensagem recebida em segundo plano: ${message.messageId}");
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  runApp(TeologiaApp());
}

class TeologiaApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Teologia FATEAL',
      theme: ThemeData(primarySwatch: Colors.blue),
      initialRoute: '/',
      routes: {
        '/': (context) => LoginPage(),
        '/home': (context) => HomePage(),
        '/alunos': (context) => AlunosPage(),
        '/mensalidades': (context) => MensalidadesPage(),
        '/notificacoes': (context) => NotificacoesPage(),
        '/qr_code': (context) => QRCodeScannerPage(),
      },
      debugShowCheckedModeBanner: false,
    );
  }
}