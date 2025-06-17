// lib/screens/login_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '../services/auth_service.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  /* ───────────── Controllers & State ───────────── */
  final _formKey        = GlobalKey<FormState>();
  final _emailC         = TextEditingController();
  final _senhaC         = TextEditingController();
  final _auth           = AuthService();            // injeção simples

  bool _loading         = false;
  bool _obscure         = true;

  /* ───────────── Actions ───────────── */
  Future<void> _doLogin() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _loading = true);
    final ok = await _auth.login(
      _emailC.text.trim(),
      _senhaC.text.trim(),
    );
    setState(() => _loading = false);

    if (!mounted) return;

    if (ok) {
      Navigator.pushReplacementNamed(context, '/home');
    } else {
      _showSnack(
        AppLocalizations.of(context)!.invalidCredentials,
        Colors.red,
      );
    }
  }

  void _showSnack(String msg, Color color) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(msg), backgroundColor: color),
    );
  }

  /* ───────────── UI ───────────── */
  @override
  Widget build(BuildContext context) {
    final t       = AppLocalizations.of(context)!;
    final primary = Theme.of(context).colorScheme.primary;

    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Card(
            elevation: 6,
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      t.appTitle,
                      style: Theme.of(context)
                          .textTheme
                          .headlineSmall
                          ?.copyWith(color: primary, fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: 32),

                    /* ---------- EMAIL ---------- */
                    TextFormField(
                      controller: _emailC,
                      keyboardType: TextInputType.emailAddress,
                      decoration: InputDecoration(
                        labelText: t.email,
                        prefixIcon: const Icon(Icons.email_outlined),
                      ),
                      validator: (v) {
                        if (v == null || v.trim().isEmpty) {
                          return t.campoObrigatorio;
                        }
                        if (!v.contains('@')) {
                          return t.emailInvalido;
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),

                    /* ---------- SENHA ---------- */
                    TextFormField(
                      controller: _senhaC,
                      obscureText: _obscure,
                      decoration: InputDecoration(
                        labelText: t.password,
                        prefixIcon: const Icon(Icons.lock_outline),
                        suffixIcon: IconButton(
                          onPressed: () =>
                              setState(() => _obscure = !_obscure),
                          icon: Icon(
                            _obscure
                                ? Icons.visibility_off_outlined
                                : Icons.visibility_outlined,
                          ),
                          tooltip: _obscure ? t.showPassword : t.hidePassword,
                        ),
                      ),
                      validator: (v) =>
                          (v == null || v.isEmpty) ? t.campoObrigatorio : null,
                    ),
                    const SizedBox(height: 24),

                    /* ---------- BOTÃO ---------- */
                    SizedBox(
                      width: double.infinity,
                      child: FilledButton(
                        onPressed: _loading ? null : _doLogin,
                        child: _loading
                            ? const SizedBox(
                                height: 22,
                                width: 22,
                                child: CircularProgressIndicator(strokeWidth: 2),
                              )
                            : Text(t.login),
                      ),
                    ),

                    /* ---------- LINK RECUPERAR ---------- */
                    TextButton(
                      onPressed: () =>
                          Navigator.pushNamed(context, '/recover_password'),
                      child: Text(t.recoverPassword),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  /* ───────────── Cleanup ───────────── */
  @override
  void dispose() {
    _emailC.dispose();
    _senhaC.dispose();
    super.dispose();
  }
}