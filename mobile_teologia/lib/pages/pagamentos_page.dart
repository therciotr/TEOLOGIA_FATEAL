import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '../models/pagamento.dart';
import '../services/pagamento_service.dart';
import '../widgets/custom_drawer.dart';

class PagamentosPage extends StatefulWidget {
  const PagamentosPage({super.key});

  @override
  State<PagamentosPage> createState() => _PagamentosPageState();
}

class _PagamentosPageState extends State<PagamentosPage> {
  List<Pagamento> pagamentos = [];
  bool carregando = true;

  @override
  void initState() {
    super.initState();
    carregarPagamentos();
  }

  Future<void> carregarPagamentos() async {
    final response = await PagamentoService().getPagamentos();

    if (!mounted) return;
    setState(() {
      carregando = false;
      if (response.ok && response.data != null) {
        pagamentos = response.data!;
      } else {
        _mostrarErro(response.error ?? 'Erro ao carregar pagamentos.');
      }
    });
  }

  Future<void> marcarPago(int id) async {
    final response = await PagamentoService().pagar(id);

    if (!mounted) return;
    if (response.ok) {
      await carregarPagamentos();
      _mostrarMensagem(AppLocalizations.of(context)!.salvo);
    } else {
      _mostrarErro(response.error ?? 'Erro ao marcar pagamento.');
    }
  }

  void confirmarPagamento(int id) {
    final t = AppLocalizations.of(context)!;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(t.confirmarPagamento ?? 'Confirmar pagamento'),
        content: Text(t.desejaMarcarPago ?? 'Deseja realmente marcar como pago?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(t.cancel ?? 'Cancelar'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              marcarPago(id);
            },
            child: Text(t.confirmar ?? 'Confirmar'),
          ),
        ],
      ),
    );
  }

  void _mostrarErro(String mensagem) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(mensagem), backgroundColor: Colors.red),
    );
  }

  void _mostrarMensagem(String mensagem) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(mensagem), backgroundColor: Colors.green),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      drawer: const CustomDrawer(),
      appBar: AppBar(title: Text(t.payments)),
      body: carregando
          ? const Center(child: CircularProgressIndicator())
          : pagamentos.isEmpty
              ? Center(child: Text(t.nenhumPagamento))
              : RefreshIndicator(
                  onRefresh: carregarPagamentos,
                  child: ListView.builder(
                    itemCount: pagamentos.length,
                    itemBuilder: (context, index) {
                      final pagamento = pagamentos[index];
                      final valorFormatado = 'R\$ ${pagamento.valor.toStringAsFixed(2)}';
                      final dataFormatada = DateFormat('dd/MM/yyyy').format(pagamento.data);

                      return Card(
                        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                        elevation: 2,
                        child: ListTile(
                          leading: Icon(
                            pagamento.pago ? Icons.check_circle : Icons.pending,
                            color: pagamento.pago ? Colors.green : Colors.orange,
                          ),
                          title: Text('${pagamento.aluno}'),
                          subtitle: Text('$dataFormatada • $valorFormatado'),
                          trailing: pagamento.pago
                              ? const Icon(Icons.lock, color: Colors.grey)
                              : IconButton(
                                  icon: const Icon(Icons.check_circle_outline),
                                  tooltip: t.confirmarPagamento ?? 'Confirmar pagamento',
                                  onPressed: () => confirmarPagamento(pagamento.id),
                                ),
                        ),
                      );
                    },
                  ),
                ),
    );
  }
}