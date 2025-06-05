import 'package:flutter/material.dart';
import 'pages/login_page.dart';
import 'pages/home_page.dart';
import 'pages/alunos_page.dart';
import 'pages/mensalidades_page.dart';
import 'pages/notificacoes_page.dart';
import 'pages/qr_code_scanner_page.dart';

class App extends StatelessWidget {
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