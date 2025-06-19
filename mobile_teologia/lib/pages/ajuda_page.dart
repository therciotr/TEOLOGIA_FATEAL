import 'package:flutter/material.dart';
import '../widgets/custom_drawer.dart';
import 'package:url_launcher/url_launcher.dart';

/// Página de Ajuda e Suporte com FAQs e contatos.
class AjudaPage extends StatelessWidget {
  const AjudaPage({super.key});

  // WhatsApp, E-mail, ou site de suporte (você pode ajustar conforme desejar)
  void _abrirWhatsApp() async {
    const url = 'https://wa.me/5581999999999?text=Olá,+preciso+de+ajuda+com+o+app+da+FATEAL';
    if (await canLaunchUrl(Uri.parse(url))) {
      await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
    }
  }

  void _enviarEmail() async {
    final Uri emailUri = Uri(
      scheme: 'mailto',
      path: 'suporte@fateal.edu.br',
      query: 'subject=Ajuda%20com%20o%20App%20FATEAL&body=Descreva%20seu%20problema%20aqui...',
    );
    if (await canLaunchUrl(emailUri)) {
      await launchUrl(emailUri);
    }
  }

  @override
  Widget build(BuildContext context) {
    final Color primaryColor = Theme.of(context).colorScheme.primary;

    return Scaffold(
      drawer: const CustomDrawer(),
      appBar: AppBar(
        title: const Text('Ajuda'),
        backgroundColor: primaryColor,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Dúvidas Frequentes',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),

            ExpansionTile(
              title: const Text('Como faço login no aplicativo?'),
              children: const [
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16),
                  child: Text(
                    'Você deve usar o e-mail cadastrado junto à instituição e sua senha pessoal. '
                    'Caso tenha esquecido a senha, use o botão "Esqueci minha senha" na tela de login.',
                  ),
                ),
              ],
            ),
            ExpansionTile(
              title: const Text('Não consigo visualizar meus boletos.'),
              children: const [
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16),
                  child: Text(
                    'Verifique se há conexão com a internet. Caso o problema persista, entre em contato com o setor financeiro.',
                  ),
                ),
              ],
            ),
            ExpansionTile(
              title: const Text('Como atualizo meus dados pessoais?'),
              children: const [
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16),
                  child: Text(
                    'No menu lateral, vá em "Perfil" e clique em "Editar dados". '
                    'Altere as informações desejadas e salve.',
                  ),
                ),
              ],
            ),

            const SizedBox(height: 24),
            const Divider(),

            const SizedBox(height: 12),
            const Text(
              'Precisa de mais ajuda?',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
            ),

            const SizedBox(height: 12),
            Row(
              children: [
                ElevatedButton.icon(
                  onPressed: _abrirWhatsApp,
                  icon: const Icon(Icons.chat),
                  label: const Text('WhatsApp'),
                ),
                const SizedBox(width: 12),
                ElevatedButton.icon(
                  onPressed: _enviarEmail,
                  icon: const Icon(Icons.email),
                  label: const Text('E-mail'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}