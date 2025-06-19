import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../theme/theme_provider.dart';
import '../theme/language_provider.dart';
import '../widgets/custom_drawer.dart';

class ConfiguracoesScreen extends StatelessWidget {
  const ConfiguracoesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final tp = Provider.of<ThemeProvider>(context);
    final lp = Provider.of<LanguageProvider>(context);

    return Scaffold(
      drawer: const CustomDrawer(),
      appBar: AppBar(title: const Text('Configurações')),
      body: ListView(
        children: [
          SwitchListTile(
            title: const Text('Tema escuro'),
            value: tp.isDark,
            onChanged: (_) => tp.toggle(),
            secondary: const Icon(Icons.dark_mode),
          ),
          ListTile(
            leading: const Icon(Icons.language),
            title: const Text('Idioma'),
            subtitle:
                Text(lp.locale.languageCode == 'pt' ? 'Português' : 'English'),
            onTap: () => _selecionarIdioma(context, lp),
          ),
        ],
      ),
    );
  }

  void _selecionarIdioma(BuildContext context, LanguageProvider lp) {
    showModalBottomSheet(
      context: context,
      builder: (_) => ListView(
        shrinkWrap: true,
        children: [
          RadioListTile(
            title: const Text('Português'),
            value: 'pt',
            groupValue: lp.locale.languageCode,
            onChanged: (v) {
              lp.setLocale('pt');
              Navigator.pop(context);
            },
          ),
          RadioListTile(
            title: const Text('English'),
            value: 'en',
            groupValue: lp.locale.languageCode,
            onChanged: (v) {
              lp.setLocale('en');
              Navigator.pop(context);
            },
          ),
        ],
      ),
    );
  }
}