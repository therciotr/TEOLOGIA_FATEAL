// lib/widgets/error_banner.dart
// ---------------------------------------------------------------
// Banner reutilizável para exibir erros (“snack-style” persistente).
// ---------------------------------------------------------------
import 'package:flutter/material.dart';

class ErrorBanner extends StatelessWidget {
  const ErrorBanner({
    super.key,
    required this.message,
    this.onRetry,
  });

  final String       message;
  final VoidCallback? onRetry;

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme;

    return Material(
      color : color.errorContainer,
      child : Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child  : Row(
          children: [
            Icon(Icons.warning_amber_rounded, color: color.onErrorContainer),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                message,
                style: TextStyle(color: color.onErrorContainer),
              ),
            ),
            if (onRetry != null)
              TextButton(
                onPressed: onRetry,
                child: const Text('Tentar novamente'),
              ),
          ],
        ),
      ),
    );
  }
}