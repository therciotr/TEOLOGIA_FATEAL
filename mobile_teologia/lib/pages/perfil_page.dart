// lib/pages/perfil_page.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '../widgets/custom_drawer.dart';
import '../theme/theme_provider.dart';
import '../services/auth_service.dart';
import '../models/usuario.dart';

class PerfilPage extends StatelessWidget {
  const PerfilPage({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n   = AppLocalizations.of(context)!;
    final theme  = Theme.of(context);
    final auth   = context.watch<AuthService>();           // fornece usuário + logout()
    final user   = auth.usuario;                           // Usuario? (pode vir null)
    final tProv  = context.read<ThemeProvider>();          // para alternar claro/escuro

    return Scaffold(
      drawer: const CustomDrawer(),
      appBar: AppBar(title: Text(l10n.meuPerfil)),
      body: user == null
          ? Center(child: Text(l10n.loading))
          : RefreshIndicator(
              onRefresh: () async => await auth.refreshUsuario(),
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
                children: [
                  // ─── Avatar, nome & e-mail ────────────────────────────────
                  Center(
                    child: Column(
                      children: [
                        CircleAvatar(
                          radius: 48,
                          backgroundColor: theme.colorScheme.surfaceVariant,
                          backgroundImage: user.avatarUrl != null
                              ? NetworkImage(user.avatarUrl!) as ImageProvider
                              : null,
                          child: user.avatarUrl == null
                              ? const Icon(Icons.person, size: 48)
                              : null,
                        ),
                        const SizedBox(height: 16),
                        Text(user.nome,
                            style: theme.textTheme.titleLarge,
                            textAlign: TextAlign.center),
                        const SizedBox(height: 4),
                        Text(user.email,
                            style: theme.textTheme.bodyMedium
                                ?.copyWith(color: theme.colorScheme.outline),
                            textAlign: TextAlign.center),
                      ],
                    ),
                  ),

                  const SizedBox(height: 32),
                  const Divider(),

                  // ─── Ações ────────────────────────────────────────────────
                  ListTile(
                    leading: const Icon(Icons.edit),
                    title: Text(l10n.editar),
                    trailing: const Icon(Icons.chevron_right),
                    onTap: () => Navigator.pushNamed(context, '/perfil/editar'),
                  ),
                  SwitchListTile(
                    secondary: const Icon(Icons.dark_mode),
                    title: Text(l10n.toggleTheme),
                    value: tProv.isDark,
                    onChanged: (_) => tProv.toggle(),
                  ),
                  ListTile(
                    leading: const Icon(Icons.logout),
                    title: Text(l10n.logout),
                    onTap: () {
                      auth.logout();
                      Navigator.pushNamedAndRemoveUntil(context, '/', (_) => false);
                    },
                  ),
                ],
              ),
            ),
    );
  }
}