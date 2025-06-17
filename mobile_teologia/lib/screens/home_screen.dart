import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../theme/theme_provider.dart';
import '../widgets/custom_drawer.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final tp = Provider.of<ThemeProvider>(context);
    final isDark = tp.isDark;

    return Scaffold(
      drawer: const CustomDrawer(),
      appBar: AppBar(
        title: const Text('Dashboard'),
        actions: [
          IconButton(
            tooltip: isDark ? 'Tema claro' : 'Tema escuro',
            icon: Icon(isDark ? Icons.light_mode : Icons.dark_mode),
            onPressed: tp.toggle,
          ),
        ],
      ),
      body: const Center(
        child: Text(
          'Bem-vindo ao painel FATEAL 🕊️',
          style: TextStyle(fontSize: 18),
        ),
      ),
    );
  }
}