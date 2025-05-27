import 'package:flutter/material.dart';
import '../services/auth_service.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final emailController = TextEditingController();
  final senhaController = TextEditingController();
  bool carregando = false;
  String? erro;

  void _login() async {
    setState(() {
      carregando = true;
      erro = null;
    });
    final sucesso = await AuthService.login(emailController.text, senhaController.text);
    setState(() {
      carregando = false;
    });
    if (sucesso) {
      Navigator.pushReplacementNamed(context, '/home');
    } else {
      setState(() {
        erro = "Login ou senha inválidos";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Card(
          margin: EdgeInsets.all(24),
          child: Padding(
            padding: EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text('Teologia FATEAL', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                SizedBox(height: 16),
                TextField(
                  controller: emailController,
                  decoration: InputDecoration(labelText: 'E-mail'),
                ),
                TextField(
                  controller: senhaController,
                  decoration: InputDecoration(labelText: 'Senha'),
                  obscureText: true,
                ),
                if (erro != null)
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text(erro!, style: TextStyle(color: Colors.red)),
                  ),
                SizedBox(height: 16),
                ElevatedButton(
                  onPressed: carregando ? null : _login,
                  child: carregando
                      ? CircularProgressIndicator()
                      : Text('Entrar'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}