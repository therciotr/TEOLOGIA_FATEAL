// lib/screens/mensalidades_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '../models/mensalidade.dart';
import '../services/api_service.dart';

class MensalidadesScreen extends StatefulWidget {
  const MensalidadesScreen({super.key});

  @override
  State<MensalidadesScreen> createState() => _MensalidadesScreenState();
}

class _MensalidadesScreenState extends State<MensalidadesScreen> {
  /* ───────────── State ───────────── */
  final _api           = ApiService();
  List<Mensalidade> _lista = [];
  bool _loading        = true;

  /* ───────────── Ciclo de vida ───────────── */
  @override
  void initState() {
    super.initState();
    _carregar();
  }

  Future<void> _carregar() async {
    setState(() => _loading = true);
    final res = await _api.getMensalidades();
    if (!mounted) return;

    setState(() {
      _loading = false;
      if (res.ok && res.data != null) {
        _lista = res.data!;
      } else {
        _showSnack(res.error ?? 'Erro desconhecido', Colors.red);
      }
    });
  }

  /* ───────────── Helpers ───────────── */
  void _showSnack(String msg, Color color) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(msg), backgroundColor: color),
    );
  }

  Color _corStatus(String status) {
    switch (status.toLowerCase()) {
      case 'pago':
        return Colors.green;
      case 'atrasado':
        return Colors.orange;
      default:
        return Colors.red;
    }
  }

  /* ───────────── UI ───────────── */
  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(title: Text(t.tuitions)),
      body: RefreshIndicator(
        onRefresh: _carregar,
        child: _loading
            ? const Center(child: CircularProgressIndicator())
            : _lista.isEmpty
                ? Center(child: Text(t.nenhumaMensalidade))
                : ListView.separated(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 16, vertical: 8),
                    itemCount: _lista.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 8),
                    itemBuilder: (_, i) {
                      final m = _lista[i];
                      return Card(
                        elevation: 2,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: ListTile(
                          leading: CircleAvatar(
                            backgroundColor:
                                Theme.of(context).colorScheme.primary,
                            child: Text(
                              m.aluno.characters.first.toUpperCase(),
                              style: const TextStyle(color: Colors.white),
                            ),
                          ),
                          title: Text(m.aluno),
                          subtitle: Text(
                            '${t.loading}: ${m.vencimento}',
                            // ajuste de data: use DateFormat se desejar
                          ),
                          trailing: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text('R\$ ${m.valor.toStringAsFixed(2)}'),
                              const SizedBox(height: 4),
                              Chip(
                                label: Text(m.status),
                                backgroundColor: _corStatus(m.status)
                                    .withOpacity(0.15),
                                labelStyle: TextStyle(
                                  color: _corStatus(m.status),
                                  fontWeight: FontWeight.w600,
                                ),
                                padding:
                                    const EdgeInsets.symmetric(horizontal: 6),
                                visualDensity: VisualDensity.compact,
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
      ),
    );
  }
}