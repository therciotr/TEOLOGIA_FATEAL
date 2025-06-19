import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:lottie/lottie.dart';
import '../services/auth_service.dart';

class RecoverPasswordPage extends StatefulWidget {
  const RecoverPasswordPage({super.key});

  @override
  State<RecoverPasswordPage> createState() => _RecoverPasswordPageState();
}

class _RecoverPasswordPageState extends State<RecoverPasswordPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailC = TextEditingController();
  final _auth = AuthService();

  bool _loading = false;
  bool _sent = false;

  Future<void> _sendLink() async {
    if (!_formKey.currentState!.validate()) return;

    FocusScope.of(context).unfocus(); // Fecha o teclado
    setState(() => _loading = true);

    final ok = await _auth.forgotPassword(_emailC.text.trim());

    setState(() {
      _loading = false;
      _sent = ok;
    });

    if (!ok && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(AppLocalizations.of(context)!.invalidCredentials),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  void dispose() {
    _emailC.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    final primary = Theme.of(context).colorScheme.primary;

    if (_sent) {
      return Scaffold(
        appBar: AppBar(
          elevation: 0,
          backgroundColor: Colors.transparent,
          foregroundColor: primary,
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Lottie.asset(
                  'assets/lottie/email_sent.json',
                  width: 180,
                ),
                const SizedBox(height: 24),
                Text(
                  t.linkSent,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: primary,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 32),
                FilledButton.icon(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.login),
                  label: Text(t.backToLogin),
                ),
              ],
            ),
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(t.recoverPassword),
        backgroundColor: primary,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              Icon(Icons.mail_outline, size: 64, color: primary),
              const SizedBox(height: 32),

              TextFormField(
                controller: _emailC,
                keyboardType: TextInputType.emailAddress,
                autofocus: true,
                decoration: InputDecoration(
                  labelText: t.email,
                  hintText: "exemplo@email.com",
                  prefixIcon: const Icon(Icons.email_outlined),
                  border: const OutlineInputBorder(),
                ),
                validator: (v) {
                  if (v == null || v.trim().isEmpty) {
                    return t.campoObrigatorio;
                  } else if (!v.contains('@')) {
                    return t.emailInvalido;
                  }
                  return null;
                },
              ),

              const SizedBox(height: 24),

              _loading
                  ? const CircularProgressIndicator()
                  : SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        onPressed: _sendLink,
                        icon: const Icon(Icons.send),
                        label: Text(t.sendLink),
                      ),
                    ),
            ],
          ),
        ),
      ),
    );
  }
}