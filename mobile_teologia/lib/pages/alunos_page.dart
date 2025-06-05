import 'package:flutter/material.dart';
import '../widgets/custom_drawer.dart';
import '../services/api_service.dart';
import '../widgets/aluno_card.dart';

class AlunosPage extends StatefulWidget {
  @override
  _AlunosPageState createState() => _AlunosPageState();
}

class _AlunosPageState extends State<AlunosPage> {
  List<dynamic> alunos = [];
  bool carregando = true;

  @override
  void initState() {
    super.initState();
    carregarAlunos();
  }

  void carregarAlunos() async {
    alunos = await ApiService.getAlunos();
    setState(() {
      carregando = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: CustomDrawer(),
      appBar: AppBar(title: Text('Alunos')),
      body: carregando
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: alunos.length,
              itemBuilder: (context, index) {
                return AlunoCard(aluno: alunos[index]);
              },
            ),
    );
  }
}