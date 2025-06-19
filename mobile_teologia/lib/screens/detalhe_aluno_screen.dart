import 'package:flutter/material.dart';
import '../models/aluno.dart';
import '../services/api_service.dart';
import 'erro_screen.dart';

class DetalheAlunoScreen extends StatelessWidget {
  const DetalheAlunoScreen({super.key, required this.id});

  final int id;

  Future<Aluno?> _load() async {
    final res = await ApiService().getAluno(id);
    return res.data;
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: Text('Aluno #$id')),
        body: FutureBuilder<Aluno?>(
          future: _load(),
          builder: (_, snap) {
            if (snap.connectionState != ConnectionState.done) {
              return const Center(child: CircularProgressIndicator());
            }
            if (snap.hasError || snap.data == null) {
              return const ErroScreen(msg: 'Não foi possível carregar aluno.');
            }
            final a = snap.data!;
            return ListView(
              padding: const EdgeInsets.all(24),
              children: [
                ListTile(title: const Text('Nome'), subtitle: Text(a.nome)),
                ListTile(title: const Text('E-mail'), subtitle: Text(a.email)),
                ListTile(title: const Text('Turma'), subtitle: Text(a.turma)),
                if (a.matricula != null)
                  ListTile(
                      title: const Text('Matrícula'),
                      subtitle: Text(a.matricula!)),
                if (a.telefone != null)
                  ListTile(
                      title: const Text('Telefone'),
                      subtitle: Text(a.telefone!)),
              ],
            );
          },
        ),
      );
}