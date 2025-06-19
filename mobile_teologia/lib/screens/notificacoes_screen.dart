// lib/screens/notificacoes_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:intl/intl.dart';

import '../models/notificacao.dart';
import '../services/notificacao_service.dart';
import '../widgets/custom_drawer.dart';
import '../widgets/loading_overlay.dart';
import '../widgets/empty_state.dart';
import '../widgets/notificacao_tile.dart';

class NotificacoesScreen extends StatefulWidget {
  const NotificacoesScreen({super.key});

  @override
  State<NotificacoesScreen> createState() => _NotificacoesScreenState();
}

class _NotificacoesScreenState extends State<NotificacoesScreen> {
  final _service = NotificacaoService();
  final List<Notificacao> _ntfs = [];

  bool _loading = false;

  /* ─────────────────── ciclo de vida ─────────────────── */
  @override
  void initState() {
    super.initState();
    _carregar();
  }

  /* ─────────────────── chamadas de API ─────────────────── */
  Future<void> _carregar() async {
    if (!mounted) return;
    setState(() => _loading = true);
    LoadingOverlay.show(context);

    final res = await _service.getNotificacoes();

    if (!mounted) return;
    setState(() {
      _loading = false;
      _ntfs
        ..clear()
        ..addAll(res.data ?? []);
    });
    LoadingOverlay.hide();

    if (res.hasError) _showSnack(res.errorMsg);
  }

  /* ─────────────────── helpers ─────────────────── */
  void _showSnack(String msg, {Color? color}) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(msg), backgroundColor: color ?? Colors.red),
    );
  }

  String _formatData(BuildContext context, String raw) {
    final t = AppLocalizations.of(context)!;
    final date = DateTime.tryParse(raw);
    if (date == null) return raw;
    return DateFormat.yMd(t.localeName).add_Hm().format(date);
  }

  /* ─────────────────── UI ─────────────────── */
  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      drawer: const CustomDrawer(),
      appBar: AppBar(title: Text(t.notifications)),
      body: RefreshIndicator(
        onRefresh: _carregar,
        child: _loading
            ? const SizedBox() // overlay cobre a tela
            : _ntfs.isEmpty
                ? EmptyState(
                    message: t.nenhumaNotificacao,
                    animation: 'assets/lottie/empty_list.json',
                    actionLabel: t.tryAgain,
                    onAction: _carregar,
                  )
                : ListView.separated(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 16, vertical: 12),
                    itemCount: _ntfs.length,
                    separatorBuilder: (_, __) =>
                        const SizedBox(height: 8),
                    itemBuilder: (_, i) {
                      final n = _ntfs[i];

                      return Dismissible(
                        key: ValueKey(n.id),
                        direction: DismissDirection.endToStart,
                        background: Container(
                          alignment: Alignment.centerRight,
                          padding:
                              const EdgeInsets.symmetric(horizontal: 20),
                          color: Colors.redAccent,
                          child: const Icon(Icons.delete,
                              color: Colors.white),
                        ),
                        onDismissed: (_) {
                          setState(() => _ntfs.removeAt(i));
                          _showSnack(t.sucessoOperacao,
                              color: Colors.green.shade700);
                        },
                        child: NotificacaoTile(
                          notificacao: n.copyWith(
                            dataLegivel: _formatData(context, n.data),
                          ),
                          onTap: () {
                            // marca como lida na UI
                            setState(() => _ntfs[i] =
                                _ntfs[i].copyWith(lido: true));
                          },
                        ),
                      );
                    },
                  ),
      ),
    );
  }
}