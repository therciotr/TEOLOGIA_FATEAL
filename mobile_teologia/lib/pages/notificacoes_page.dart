import 'package:flutter/material.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '../widgets/custom_drawer.dart';

class NotificacoesPage extends StatefulWidget {
  const NotificacoesPage({super.key});

  @override
  State<NotificacoesPage> createState() => _NotificacoesPageState();
}

class _NotificacoesPageState extends State<NotificacoesPage> {
  final List<String> _notificacoes = [];

  @override
  void initState() {
    super.initState();

    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      final title = message.notification?.title ?? '🔔 Notificação';
      final body = message.notification?.body ?? '';
      final conteudo = '$title\n$body';

      if (mounted) {
        setState(() => _notificacoes.insert(0, conteudo));
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(conteudo)),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      drawer: const CustomDrawer(),
      appBar: AppBar(title: Text(t.notifications)),
      body: _notificacoes.isEmpty
          ? Center(
              child: Text(
                '🔕 ${t.nenhumaNotificacao ?? "Nenhuma notificação recebida"}',
                style: TextStyle(color: Colors.grey.shade600),
              ),
            )
          : ListView.builder(
              itemCount: _notificacoes.length,
              itemBuilder: (_, index) {
                final msg = _notificacoes[index];
                return ListTile(
                  leading: const Icon(Icons.notifications),
                  title: Text(msg),
                );
              },
            ),
    );
  }
}