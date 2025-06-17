import 'package:flutter/material.dart';

class ErroScreen extends StatelessWidget {
  const ErroScreen({super.key, required this.msg});

  final String msg;

  @override
  Widget build(BuildContext context) => Scaffold(
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(32),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.error_outline,
                    size: 80, color: Colors.redAccent),
                const SizedBox(height: 24),
                Text(msg,
                    style: Theme.of(context).textTheme.titleMedium,
                    textAlign: TextAlign.center),
                const SizedBox(height: 32),
                ElevatedButton.icon(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.arrow_back),
                  label: const Text('Voltar'),
                ),
              ],
            ),
          ),
        ),
      );
}