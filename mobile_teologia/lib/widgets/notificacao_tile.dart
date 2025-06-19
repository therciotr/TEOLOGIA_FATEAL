// lib/widgets/notificacao_tile.dart
// --------------------------------------------------------
// ListTile especializado para exibir uma Notificação.
// --------------------------------------------------------
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../models/notificacao.dart';

class NotificacaoTile extends StatelessWidget {
  const NotificacaoTile({
    super.key,
    required this.notificacao,
    this.onTap,
  });

  /// Modelo de domínio.
  final Notificacao notificacao;

  /// Callback opcional (ex.: marcar como lida, navegar, etc.).
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final lido   = notificacao.lido ?? false;

    /* ───── Data legível ───── */
    final dateParsed = DateTime.tryParse(notificacao.data) ?? DateTime.now();
    final locale     = Localizations.localeOf(context).toLanguageTag();
    final dataFormatada =
        DateFormat('dd/MM · HH:mm', locale).format(dateParsed);

    /* ───── Widget ───── */
    return Semantics(
      label: 'Notificação: ${notificacao.titulo}',
      selected: !lido,
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        leading: Stack(
          alignment: Alignment.topRight,
          children: [
            CircleAvatar(
              backgroundColor:
                  lido ? scheme.surfaceVariant : scheme.tertiaryContainer,
              foregroundColor:
                  lido ? scheme.outline : scheme.onTertiaryContainer,
              child: Icon(
                lido ? Icons.notifications_none : Icons.notifications_active,
              ),
            ),
            if (!lido)
              /* Badge azul indicando “novo” */
              Container(
                width: 10,
                height: 10,
                decoration: BoxDecoration(
                  color: scheme.primary,
                  shape: BoxShape.circle,
                ),
              ),
          ],
        ),
        title: Text(
          notificacao.titulo,
          style: TextStyle(
            fontWeight: lido ? FontWeight.w400 : FontWeight.w600,
            overflow: TextOverflow.ellipsis,
          ),
        ),
        subtitle: Text(
          notificacao.mensagem,
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),
        trailing: Text(
          dataFormatada,
          style: Theme.of(context).textTheme.labelSmall,
        ),
        onTap: onTap ?? () => _showDialog(context),
      ),
    );
  }

  /* ──────────────────────────
   *  Fallback: exibe dialogo
   * ────────────────────────── */
  void _showDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title  : Text(notificacao.titulo),
        content: Text(notificacao.mensagem),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }
}