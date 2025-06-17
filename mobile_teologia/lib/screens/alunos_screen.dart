import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '../models/aluno.dart';
import '../services/api_service.dart';
import '../widgets/empty_state.dart';
import '../widgets/loading_overlay.dart';

class AlunosScreen extends StatefulWidget {
  const AlunosScreen({super.key});

  @override
  State<AlunosScreen> createState() => _AlunosScreenState();
}

class _AlunosScreenState extends State<AlunosScreen> {
  final _api = ApiService();
  final List<Aluno> _alunos = [];

  bool _carregando = false;

  @override
  void initState() {
    super.initState();
    _buscarAlunos();
  }

  Future<void> _buscarAlunos() async {
    if (!mounted) return;
    setState(() => _carregando = true);

    LoadingOverlay.show(context);

    final res = await _api.getAlunos();

    if (!mounted) return;
    setState(() {
      _carregando = false;
      _alunos
        ..clear()
        ..addAll(res.data ?? []);
    });

    LoadingOverlay.hide();

    if (res.hasError) _showSnack(res.errorMsg ?? 'Erro ao buscar alunos');
  }

  void _showSnack(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(msg),
        backgroundColor: Colors.red.shade400,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(title: Text(t.students)),
      body: RefreshIndicator(
        onRefresh: _buscarAlunos,
        child: _carregando
            ? const SizedBox() // overlay já cobre tudo
            : _alunos.isEmpty
                ? EmptyState(
                    message: t.nenhumAluno,
                    animation: 'assets/lottie/empty_list.json',
                    actionLabel: t.tentarNovamente,
                    onAction: _buscarAlunos,
                  )
                : ListView.separated(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.all(16),
                    itemCount: _alunos.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemBuilder: (_, i) {
                      final aluno = _alunos[i];
                      return Card(
                        elevation: 3,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: ListTile(
                          leading: CircleAvatar(
                            backgroundColor: Theme.of(context).primaryColorLight,
                            child: Text(
                              aluno.nome.isNotEmpty ? aluno.nome[0] : '?',
                              style: const TextStyle(color: Colors.white),
                            ),
                          ),
                          title: Text(aluno.nome),
                          subtitle: Text(aluno.email),
                          trailing: Text(aluno.turma),
                          onTap: () => Navigator.pushNamed(
                            context,
                            '/alunos/visualizar',
                            arguments: aluno.id,
                          ),
                        ),
                      );
                    },
                  ),
      ),
    );
  }
}