import 'package:flutter/material.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import '../widgets/custom_drawer.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String? _notificacao;
  late final FirebaseMessaging _firebaseMessaging;

  @override
  void initState() {
    super.initState();
    _firebaseMessaging = FirebaseMessaging.instance;
    _setupNotificacoes();
  }

  void _setupNotificacoes() {
    // Permissão (iOS) e debug de token opcional
    _firebaseMessaging.requestPermission();

    // Notificações recebidas em foreground
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      final title = message.notification?.title ?? 'Nova Notificação';
      final body = message.notification?.body ?? '';
      final msg = '$title\n$body';

      if (!mounted) return;

      setState(() => _notificacao = msg);

      // SnackBar com botão para ocultar
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(msg),
          duration: const Duration(seconds: 6),
          action: SnackBarAction(
            label: 'OK',
            textColor: Colors.white,
            onPressed: () => ScaffoldMessenger.of(context).hideCurrentSnackBar(),
          ),
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    final primaryColor = Theme.of(context).colorScheme.primary;

    return Scaffold(
      drawer: const CustomDrawer(),
      appBar: AppBar(
        title: const Text('Painel Principal'),
        backgroundColor: primaryColor,
        actions: [
          IconButton(
            icon: const Icon(Icons.qr_code_scanner),
            tooltip: 'Ler QR Code Pix',
            onPressed: () => Navigator.pushNamed(context, '/qr_code'),
          ),
        ],
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Text(
            _notificacao ?? '📖 Bem-vindo ao painel da Teologia FATEAL!',
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 18),
          ),
        ),
      ),
    );
  }
}