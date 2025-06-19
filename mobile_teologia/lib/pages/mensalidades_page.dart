import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import '../widgets/custom_drawer.dart';
import '../services/api_service.dart';
import '../widgets/mensalidade_card.dart';

/// Página que lista as mensalidades.
class MensalidadesPage extends StatefulWidget {
  const MensalidadesPage({super.key});

  @override
  State<MensalidadesPage> createState() => _MensalidadesPageState();
}

class _MensalidadesPageState extends State<MensalidadesPage> {
  List<dynamic> mensalidades = [];
  bool carregando = true;

  final ApiService apiService = ApiService();

  @override
  void initState() {
    super.initState();
    carregarMensalidades();
  }

  Future<void> carregarMensalidades() async {
    try {
      final resultado = await apiService.getMensalidades();
      setState(() {
        mensalidades = resultado;
      });
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao carregar mensalidades: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() => carregando = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    final corPrimaria = Theme.of(context).colorScheme.primary;

    return Scaffold(
      drawer: const CustomDrawer(),
      appBar: AppBar(
        title: Text(t.tuitions),
        backgroundColor: corPrimaria,
      ),
      body: carregando
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: carregarMensalidades,
              child: mensalidades.isEmpty
                  ? ListView(
                      physics: const AlwaysScrollableScrollPhysics(),
                      children: const [
                        SizedBox(height: 80),
                        Center(child: Text('Nenhuma mensalidade encontrada')),
                      ],
                    )
                  : ListView.separated(
                      itemCount: mensalidades.length,
                      separatorBuilder: (_, __) => const Divider(height: 0),
                      itemBuilder: (context, index) {
                        return MensalidadeCard(
                          mensalidade: mensalidades[index],
                        );
                      },
                    ),
            ),
    );
  }
}