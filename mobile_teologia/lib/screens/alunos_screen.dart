import 'package:flutter/material.dart';
import '../services/api_service.dart';

class AlunosScreen extends StatefulWidget {
  @override
  _AlunosScreenState createState() => _AlunosScreenState();
}

class _AlunosScreenState extends State<AlunosScreen> {
  List<dynamic> alunos = [];
  bool carregando = true;

  @override
  void initState() {
    super.initState();
    carregarAlunos();
  }

  void carregarAlunos() async {
    final data = await ApiService.getAlunos();
    setState(() {
      alunos = data;
      carregando = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Alunos')),
      body: carregando
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: alunos.length,
              itemBuilder: (context, index) {
                final aluno = alunos[index];
                return Card(
                  margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: ListTile(
                    title: Text(aluno['nome']),
                    subtitle: Text(aluno['email']),
                    trailing: Text('Turma: ${aluno['turma']}'),
                  ),
                );
              },
            ),
    );
  }
}