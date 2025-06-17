import 'package:flutter/material.dart';
import '../models/pagamento.dart';
import '../services/pagamento_service.dart';

class PagamentoScreen extends StatefulWidget {
  const PagamentoScreen({super.key});

  @override
  State<PagamentoScreen> createState() => _PagamentoScreenState();
}

class _PagamentoScreenState extends State<PagamentoScreen> {
  List<Pagamento> list = [];
  bool load = true;

  @override
  void initState() {
    super.initState();
    _carregar();
  }

  Future<void> _carregar() async {
    final res = await PagamentoService().getPagamentos();
    setState(() {
      load = false;
      list = res.data ?? [];
    });
  }

  void _confirmar(int id) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Confirmar pagamento'),
        content: const Text('Deseja marcar como pago?'),
        actions: [
          TextButton(
            child: const Text('Cancelar'),
            onPressed: () => Navigator.pop(context),
          ),
          ElevatedButton(
            child: const Text('Confirmar'),
            onPressed: () async {
              Navigator.pop(context);
              await PagamentoService().pagar(id);
              _carregar();
            },
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text('Pagamentos')),
        body: load
            ? const Center(child: CircularProgressIndicator())
            : list.isEmpty
                ? const Center(child: Text('Nenhum pagamento encontrado.'))
                : RefreshIndicator(
                    onRefresh: _carregar,
                    child: ListView.separated(
                      padding: const EdgeInsets.all(16),
                      itemCount: list.length,
                      separatorBuilder: (_, __) => const Divider(height: 0),
                      itemBuilder: (_, i) {
                        final p = list[i];
                        return ListTile(
                          title: Text(p.aluno),
                          subtitle: Text('Data ${p.data}'),
                          trailing: p.pago
                              ? const Icon(Icons.check_circle,
                                  color: Colors.green)
                              : IconButton(
                                  icon: const Icon(Icons.check_circle_outline),
                                  onPressed: () => _confirmar(p.id),
                                ),
                        );
                      },
                    ),
                  ),
      );
}