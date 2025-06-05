import 'package:flutter/material.dart';

class CustomDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          DrawerHeader(
            child: Text('Teologia FATEAL', style: TextStyle(fontSize: 20, color: Colors.white)),
            decoration: BoxDecoration(color: Colors.blue),
          ),
          ListTile(
            title: Text('Início'),
            onTap: () => Navigator.pushReplacementNamed(context, '/home'),
          ),
          ListTile(
            title: Text('Alunos'),
            onTap: () => Navigator.pushReplacementNamed(context, '/alunos'),
          ),
          ListTile(
            title: Text('Mensalidades'),
            onTap: () => Navigator.pushReplacementNamed(context, '/mensalidades'),
          ),
          ListTile(
            title: Text('Notificações'),
            onTap: () => Navigator.pushReplacementNamed(context, '/notificacoes'),
          ),
          ListTile(
            title: Text('Sair'),
            onTap: () => Navigator.pushReplacementNamed(context, '/'),
          ),
        ],
      ),
    );
  }
}