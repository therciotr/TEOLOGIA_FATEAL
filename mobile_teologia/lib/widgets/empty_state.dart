// lib/widgets/empty_state.dart
// ----------------------------------------------------------------------------
// Widget de estado vazio com animação Lottie ou ícone + mensagem personalizada.
// Agora inclui botão opcional de "Tentar novamente" ou qualquer ação.
// ----------------------------------------------------------------------------
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class EmptyState extends StatelessWidget {
  final String message;
  final IconData? icon;
  final String? animation;
  final String? actionLabel;
  final VoidCallback? onAction;

  const EmptyState({
    super.key,
    required this.message,
    this.icon,
    this.animation,
    this.actionLabel,
    this.onAction,
  });

  @override
  Widget build(BuildContext context) {
    final textStyle = Theme.of(context).textTheme.bodyLarge?.copyWith(
          color: Colors.grey.shade600,
        );

    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _buildVisual(),
            const SizedBox(height: 20),
            Text(
              message,
              style: textStyle,
              textAlign: TextAlign.center,
            ),
            if (onAction != null && actionLabel != null) ...[
              const SizedBox(height: 24),
              ElevatedButton.icon(
                onPressed: onAction,
                icon: const Icon(Icons.refresh),
                label: Text(actionLabel!),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildVisual() {
    if (animation != null) {
      return Lottie.asset(
        animation!,
        width: 160,
        height: 160,
        fit: BoxFit.contain,
        repeat: true,
      );
    } else {
      return Icon(
        icon ?? Icons.hourglass_empty,
        size: 64,
        color: Colors.grey.shade400,
      );
    }
  }
}