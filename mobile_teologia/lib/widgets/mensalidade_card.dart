// lib/widgets/mensalidade_card.dart
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '../models/mensalidade.dart';

/// Card que exibe as principais informações de uma [Mensalidade].
///
/// • Formata valores e datas de acordo com o locale  
/// • Mostra um [Chip] colorido indicando o status  
/// • Usa tema atual (light/dark) automaticamente
class MensalidadeCard extends StatelessWidget {
  const MensalidadeCard({
    super.key,
    required this.mensalidade,
  });

  final Mensalidade mensalidade;

  @override
  Widget build(BuildContext context) {
    final t        = AppLocalizations.of(context)!;
    final locale   = Localizations.localeOf(context).toString();
    final currency = NumberFormat.simpleCurrency(locale: locale);
    final dateFmt  = DateFormat.yMd(locale);

    // ---------- Paleta de cores baseada no status ----------
    final statusColor = switch (mensalidade.status) {
      'pago'      => Colors.green.shade600,
      'pendente'  => Colors.orange.shade700,
      'atrasado'  => Colors.red.shade600,
      _           => Theme.of(context).colorScheme.primary,
    };

    return Card(
      elevation: 1,
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        title: Text(
          mensalidade.aluno,
          style: const TextStyle(fontWeight: FontWeight.w600),
        ),
        subtitle: Padding(
          padding: const EdgeInsets.only(top: 4),
          child: Text(
            '${t.tuitions} • ${t.vencimento}: ${dateFmt.format(DateTime.parse(mensalidade.vencimento))}',
          ),
        ),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              currency.format(mensalidade.valor),
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Theme.of(context).colorScheme.primary,
              ),
            ),
            const SizedBox(height: 4),
            Chip(
              label: Text(
                _statusLabel(t, mensalidade.status),
                style: const TextStyle(color: Colors.white),
              ),
              backgroundColor: statusColor,
              visualDensity: VisualDensity.compact,
              materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
            ),
          ],
        ),
        onTap: () {
          // TODO: navegue para detalhes, se existir
        },
      ),
    );
  }

  /// Converte o status em label traduzido.
  String _statusLabel(AppLocalizations t, String status) => switch (status) {
        'pago'      => t.ok,
        'pendente'  => t.nenhumaMensalidade,
        'atrasado'  => t.tryAgain,
        _           => status,
      };
}