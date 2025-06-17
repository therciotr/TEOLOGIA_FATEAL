import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../theme/theme_provider.dart';
import '../theme/language_provider.dart';
import '../widgets/custom_drawer.dart';

class ConfiguracoesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    final langProvider = Provider.of<LanguageProvider>(context);
    final isDark = themeProvider.isDark;
    final locale = langProvider.locale.languageCode;

    return Scaffold(
      drawer: CustomDrawer(),
      appBar: AppBar(
        title: const Text('Configurações'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          SwitchListTile.adaptive(
            title: const Text('Modo escuro'),
            value: isDark,
            onChanged: (_) => themeProvider.toggle(),
            secondary: const Icon(Icons.brightness_6),
          ),
          const Divider(),

          ListTile(
            leading: const Icon(Icons.language),
            title: const Text('Idioma'),
            subtitle: Text(locale == 'pt' ? 'Português (Brasil)' : 'Inglês (English)'),
            onTap: () => _selecionarIdioma(context),
          ),
          const Divider(),

          ListTile(
            leading: const Icon(Icons.info_outline),
            title: const Text('Sobre o app'),
            onTap: () => _showSobreDialog(context),
          ),
        ],
      ),
    );
  }

  void _selecionarIdioma(BuildContext context) {
    showDialog(
      context: context,
      builder: (_) => SimpleDialog(
        title: const Text('Selecionar idioma'),
        children: [
          SimpleDialogOption(
            onPressed: () {
              Navigator.pop(context);
              context.read<LanguageProvider>().setLocale('pt');
            },
            child: const Text('🇧🇷 Português'),
          ),
          SimpleDialogOption(
            onPressed: () {
              Navigator.pop(context);
              context.read<LanguageProvider>().setLocale('en');
            },
            child: const Text('🇺🇸 Inglês'),
          ),
        ],
      ),
    );
  }

  void _showSobreDialog(BuildContext context) {
    showAboutDialog(
      context: context,
      applicationName: 'Teologia FATEAL',
      applicationVersion: 'v1.0.0',
      children: const [
        Text('Aplicativo oficial da Faculdade Teológica FATEAL.'),
      ],
    );
  }
}