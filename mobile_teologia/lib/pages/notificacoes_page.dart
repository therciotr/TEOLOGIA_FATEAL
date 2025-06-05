import 'package:flutter/material.dart';
import '../widgets/custom_drawer.dart';

class NotificacoesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Aqui pode integrar o Firebase Messaging para notificações push
    return Scaffold(
      drawer: CustomDrawer(),
      appBar: AppBar(title: Text('Notificações')),
      body: Center(child: Text('Aqui serão exibidas as notificações de vencimento, etc.')),
    );
  }
}