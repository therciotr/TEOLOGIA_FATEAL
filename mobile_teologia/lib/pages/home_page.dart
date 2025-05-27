import 'package:flutter/material.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import '../widgets/custom_drawer.dart';

class HomePage extends StatefulWidget {
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String? _notificacao;

  @override
  void initState() {
    super.initState();
    FirebaseMessaging.instance.requestPermission();
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      setState(() {
        _notificacao = message.notification?.title ?? "Notificação recebida!";
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(_notificacao!)),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: CustomDrawer(),
      appBar: AppBar(
        title: Text('Painel Principal'),
        actions: [
          IconButton(
            icon: Icon(Icons.qr_code_scanner),
            onPressed: () => Navigator.pushNamed(context, '/qr_code'),
            tooltip: 'Ler QR Code Pix',
          ),
        ],
      ),
      body: Center(
        child: Text('Bem-vindo ao painel da Teologia FATEAL!'),
      ),
    );
  }
}