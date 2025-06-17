import 'package:flutter/material.dart';
import 'package:teologiafateal/services/auth_service.dart';

class PerfilScreen extends StatefulWidget {
  const PerfilScreen({super.key});

  @override
  State<PerfilScreen> createState() => _PerfilScreenState();
}

class _PerfilScreenState extends State<PerfilScreen> {
  String? email;
  bool carregando = true;

  @override
  void initState() {
    super.initState();
    carregarUsuario();
  }

  Future<void> carregarUsuario() async {
    final token = await AuthService().token;
    // Exemplo fictício: extrair e-mail do JWT ou buscar do backend
    // Aqui apenas uma simulação para fins de exibição
    setState(() {
      email = "usuario@email.com"; // simulação
      carregando = false;
    });
  }

  void _logout() async {
    await AuthService().logout();
    if (mounted) {
      Navigator.pushReplacementNamed(context, '/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Meu Perfil')),
      body: carregando
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                children: [
                  const Icon(Icons.person, size: 100, color: Colors.blue),
                  const SizedBox(height: 20),
                  Text(email ?? '', style: Theme.of(context).textTheme.titleMedium),
                  const SizedBox(height: 20),
                  ElevatedButton.icon(
                    onPressed: _logout,
                    icon: const Icon(Icons.logout),
                    label: const Text('Sair da conta'),
                  )
                ],
              ),
            ),
    );
  }
}