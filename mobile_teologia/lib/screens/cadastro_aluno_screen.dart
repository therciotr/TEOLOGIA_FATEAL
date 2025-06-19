import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../models/api_response.dart';

class CadastroAlunoScreen extends StatefulWidget {
  const CadastroAlunoScreen({super.key});

  @override
  State<CadastroAlunoScreen> createState() => _CadastroAlunoScreenState();
}

class _CadastroAlunoScreenState extends State<CadastroAlunoScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nomeC = TextEditingController();
  final _emailC = TextEditingController();
  bool load = false;

  Future<void> _salvar() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => load = true);
    final res = await ApiService().createAluno({
      'nome': _nomeC.text.trim(),
      'email': _emailC.text.trim(),
    });
    setState(() => load = false);

    if (res.ok) {
      Navigator.pop(context, true);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(res.errorMsg), backgroundColor: Colors.red),
      );
    }
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text('Cadastrar Aluno')),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Form(
            key: _formKey,
            child: Column(
              children: [
                TextFormField(
                  controller: _nomeC,
                  decoration: const InputDecoration(labelText: 'Nome'),
                  validator: (v) =>
                      (v == null || v.trim().isEmpty) ? 'Obrigatório' : null,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _emailC,
                  decoration: const InputDecoration(labelText: 'E-mail'),
                  validator: (v) =>
                      (v == null || !v.contains('@')) ? 'E-mail inválido' : null,
                ),
                const SizedBox(height: 32),
                load
                    ? const CircularProgressIndicator()
                    : FilledButton(
                        onPressed: _salvar, child: const Text('Salvar')),
              ],
            ),
          ),
        ),
      );
}