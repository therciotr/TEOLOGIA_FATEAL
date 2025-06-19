import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import '../services/api_service.dart';
import '../models/api_response.dart';

class CadastrarAlunoPage extends StatefulWidget {
  const CadastrarAlunoPage({super.key});

  @override
  State<CadastrarAlunoPage> createState() => _CadastrarAlunoPageState();
}

class _CadastrarAlunoPageState extends State<CadastrarAlunoPage> {
  final _nomeC = TextEditingController();
  final _emailC = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _loading = false;

  Future<void> _salvar() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _loading = true);

    try {
      final res = await ApiService().criarAluno({
        'nome': _nomeC.text.trim(),
        'email': _emailC.text.trim(),
      });

      if (res.ok) {
        Navigator.pop(context, true); // Retorna true para atualizar lista
      } else {
        _mostrarErro(res.error ?? 'Erro ao cadastrar aluno');
      }
    } catch (e) {
      _mostrarErro('Erro inesperado: $e');
    } finally {
      setState(() => _loading = false);
    }
  }

  void _mostrarErro(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(msg), backgroundColor: Colors.red),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        title: Text(t.cadastrarAluno),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _nomeC,
                decoration: InputDecoration(labelText: t.nome),
                validator: (v) =>
                    v == null || v.trim().isEmpty ? t.campoObrigatorio : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _emailC,
                decoration: InputDecoration(labelText: t.email),
                keyboardType: TextInputType.emailAddress,
                validator: (v) {
                  if (v == null || v.trim().isEmpty) {
                    return t.campoObrigatorio;
                  } else if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(v)) {
                    return t.emailInvalido;
                  }
                  return null;
                },
              ),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: _loading ? null : _salvar,
                  icon: _loading
                      ? const SizedBox(
                          width: 16,
                          height: 16,
                          child: CircularProgressIndicator(
                            color: Colors.white,
                            strokeWidth: 2,
                          ),
                        )
                      : const Icon(Icons.save),
                  label: Text(_loading ? t.salvando : t.salvar),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}