import 'package:flutter/material.dart';

class AlunoCard extends StatelessWidget {
  final Map aluno;

  const AlunoCard({required this.aluno});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListTile(
        title: Text(aluno['nome']),
        subtitle: Text(aluno['email']),
        trailing: Text("Turma: ${aluno['turma']}"),
      ),
    );
  }
}