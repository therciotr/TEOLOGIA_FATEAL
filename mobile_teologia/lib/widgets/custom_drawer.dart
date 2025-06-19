// lib/widgets/custom_drawer.dart
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:provider/provider.dart';

import '../theme/theme_provider.dart';
import '../theme/language_provider.dart';

class CustomDrawer extends StatelessWidget {
  const CustomDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    final t         = AppLocalizations.of(context)!;
    final themeProv = context.watch<ThemeProvider>();
    final langProv  = context.watch<LanguageProvider>();
    final color     = Theme.of(context).colorScheme;

    // rota que está sendo exibida ― para “destacar” no Drawer
    final current = ModalRoute.of(context)?.settings.name;

    return Drawer(
      child: SafeArea(
        child: Column(
          children: [
            _DrawerHeader(color: color),
            Expanded(
              child: ListView(
                padding: EdgeInsets.zero,
                children: [
                  _DrawerItem(
                    active: current == '/home',
                    icon: Icons.home,
                    label: t.dashboard,
                    onTap: () => _go(context, '/home'),
                  ),
                  _DrawerItem(
                    active: current == '/alunos',
                    icon: Icons.school,
                    label: t.students,
                    onTap: () => _go(context, '/alunos'),
                  ),
                  _DrawerItem(
                    active: current == '/mensalidades',
                    icon: Icons.payment,
                    label: t.tuitions,
                    onTap: () => _go(context, '/mensalidades'),
                  ),
                  _DrawerItem(
                    active: current == '/notificacoes',
                    icon: Icons.notifications,
                    label: t.notifications,
                    onTap: () => _go(context, '/notificacoes'),
                  ),
                  const Divider(),
                  SwitchListTile(
                    secondary: Icon(
                      themeProv.isDark ? Icons.dark_mode : Icons.light_mode,
                      color: color.primary,
                    ),
                    title: Text(themeProv.isDark ? t.themeDark : t.themeLight),
                    value: themeProv.isDark,
                    onChanged: (_) => themeProv.toggle(),
                  ),
                  ListTile(
                    leading: const Icon(Icons.language),
                    title: Text(t.language),
                    trailing: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: langProv.locale.languageCode,
                        items: const [
                          DropdownMenuItem(value: 'pt', child: Text('PT')),
                          DropdownMenuItem(value: 'en', child: Text('EN')),
                        ],
                        onChanged: langProv.setLocale,
                      ),
                    ),
                  ),
                  const Divider(),
                  _DrawerItem(
                    icon: Icons.logout,
                    label: t.logout,
                    onTap: () => _confirmLogout(context, t),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Text(
                'v1.0.0',
                style: Theme.of(context).textTheme.labelSmall,
              ),
            ),
          ],
        ),
      ),
    );
  }

  /* ───────────────────────── Helpers ───────────────────────── */
  void _go(BuildContext ctx, String route) {
    Navigator.pop(ctx); // fecha o drawer primeiro
    if (ModalRoute.of(ctx)?.settings.name != route) {
      Navigator.pushReplacementNamed(ctx, route);
    }
  }

  void _confirmLogout(BuildContext context, AppLocalizations t) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(t.logout),
        content: Text(t.confirmar),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: Text(t.cancel),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(ctx);
              Navigator.pushNamedAndRemoveUntil(ctx, '/', (_) => false);
            },
            child: Text(t.logout),
          ),
        ],
      ),
    );
  }
}

/*══════════════════════════════════════════════════════════════*/
/*  Cabeçalho do Drawer                                          */
/*══════════════════════════════════════════════════════════════*/
class _DrawerHeader extends StatelessWidget {
  const _DrawerHeader({required this.color});
  final ColorScheme color;

  @override
  Widget build(BuildContext context) {
    // TODO: substituir por nome/e-mail reais do usuário logado
    return UserAccountsDrawerHeader(
      decoration: BoxDecoration(color: color.primary),
      currentAccountPicture: CircleAvatar(
        backgroundColor: color.onPrimary,
        child: Icon(Icons.person, size: 40, color: color.primary),
      ),
      accountName: const Text('Usuário Demo'),
      accountEmail: const Text('demo@email.com'),
    );
  }
}

/*══════════════════════════════════════════════════════════════*/
/*  Item reutilizável                                            */
/*══════════════════════════════════════════════════════════════*/
class _DrawerItem extends StatelessWidget {
  const _DrawerItem({
    required this.icon,
    required this.label,
    required this.onTap,
    this.active = false,
  });

  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final bool active;

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme;
    return ListTile(
      leading: Icon(icon, color: active ? color.primary : color.onSurfaceVariant),
      title: Text(
        label,
        style: TextStyle(
          color: active ? color.primary : null,
          fontWeight: active ? FontWeight.bold : null,
        ),
      ),
      onTap: onTap,
    );
  }
}