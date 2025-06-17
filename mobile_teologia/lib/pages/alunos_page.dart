import 'package:flutter/material.dart';
import 'package:mobile_teologia/models/aluno.dart';
import 'package:mobile_teologia/services/api_service.dart';
import 'package:mobile_teologia/widgets/aluno_card.dart';
import 'package:mobile_teologia/widgets/custom_drawer.dart';
import 'package:mobile_teologia/models/api_response.dart';

class AlunosPage extends StatefulWidget {
  const AlunosPage({super.key});

  @override
  State<AlunosPage> createState() => _AlunosPageState();
}

class _AlunosPageState extends State<AlunosPage>
    with SingleTickerProviderStateMixin {
  final ApiService _api = ApiService();

  /*─────────────────── estado ───────────────────*/
  List<Aluno> _alunos        = [];
  List<Aluno> _filtrados     = [];
  bool        _carregando    = true;
  String      _erro          = '';
  String      _query         = '';

  /*─────────────────── life-cycle ───────────────*/
  @override
  void initState() {
    super.initState();
    _buscarAlunos();
  }

  /*─────────────────── métodos ──────────────────*/
  Future<void> _buscarAlunos() async {
    setState(() {
      _carregando = true;
      _erro       = '';
    });

    final ApiResponse<List<Aluno>> res = await _api.getAlunos();

    if (!mounted) return;

    if (res.success) {
      _alunos    = res.data ?? [];
      _filtrar();
    } else {
      _erro = res.errorMsg;
    }

    setState(() => _carregando = false);
  }

  void _filtrar([String q = '']) {
    _query      = q;
    _filtrados  = q.isEmpty
        ? _alunos
        : _alunos
            .where((a) => a.nome.toLowerCase().contains(q.toLowerCase()))
            .toList();
    setState(() {});
  }

  /*─────────────────── UI ───────────────────────*/
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      drawer: const CustomDrawer(),

      appBar: AppBar(
        title: const Text('Alunos'),
        centerTitle: true,
        actions: [
          IconButton(
            tooltip: 'Recarregar',
            onPressed: _buscarAlunos,
            icon: const Icon(Icons.refresh),
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(56),
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
            child: TextField(
              onChanged: _filtrar,
              decoration: InputDecoration(
                hintText: 'Pesquisar pelo nome…',
                prefixIcon: const Icon(Icons.search),
                border: const OutlineInputBorder(),
                filled: true,
                fillColor: theme.colorScheme.surfaceVariant.withOpacity(.3),
              ),
            ),
          ),
        ),
      ),

      floatingActionButton: FloatingActionButton(
        tooltip: 'Novo aluno',
        onPressed: () => Navigator.pushNamed(context, '/alunos/cadastrar')
            .then((_) => _buscarAlunos()),
        child: const Icon(Icons.person_add),
      ),

      body: _carregando
          ? const Center(child: CircularProgressIndicator())
          : _erro.isNotEmpty
              ? _ErroWidget(mensagem: _erro, onRetry: _buscarAlunos)
              : RefreshIndicator(
                  onRefresh: _buscarAlunos,
                  child: _filtrados.isEmpty
                      ? const Center(child: Text('Nenhum aluno encontrado'))
                      : ListView.builder(
                          physics: const BouncingScrollPhysics(),
                          padding: const EdgeInsets.all(16),
                          itemCount: _filtrados.length,
                          itemBuilder: (ctx, i) => FadeTransition(
                            opacity: _animation(ctx, i),
                            child: AlunoCard(aluno: _filtrados[i]),
                          ),
                        ),
                ),
    );
  }

  /// pequena animação de fade-in por item
  Animation<double> _animation(BuildContext ctx, int index) {
    final controller = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    )..forward();
    return Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(
      parent : controller,
      curve  : Interval(index / 10, 1, curve: Curves.easeOut),
    ));
  }
}

/*──────────────────────── helpers ───────────────────────*/
class _ErroWidget extends StatelessWidget {
  const _ErroWidget({required this.mensagem, required this.onRetry});

  final String mensagem;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize : MainAxisSize.min,
        children     : [
          Text(mensagem, textAlign: TextAlign.center,
              style: TextStyle(color: Theme.of(context).colorScheme.error)),
          const SizedBox(height: 12),
          ElevatedButton.icon(
            onPressed: onRetry,
            icon : const Icon(Icons.refresh),
            label: const Text('Tentar novamente'),
          ),
        ],
      ),
    );
  }
}