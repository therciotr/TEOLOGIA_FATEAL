// lib/widgets/loading_overlay.dart
// -----------------------------------------------------------------------------
// Overlay de carregamento reutilizável com suporte a Lottie e mensagem opcional.
// Exemplo:
//   LoadingOverlay.show(context, message: 'Carregando...');
//   await algumaOperacao();
//   LoadingOverlay.hide();
// -----------------------------------------------------------------------------
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class LoadingOverlay {
  LoadingOverlay._();

  static final ValueNotifier<OverlayEntry?> _entry = ValueNotifier(null);

  /// Exibe o overlay
  static void show(BuildContext context, {String? message}) {
    if (_entry.value != null) return; // já visível

    final overlay = OverlayEntry(
      builder: (ctx) => Stack(
        children: [
          Positioned.fill(
            child: AnimatedOpacity(
              opacity: 1.0,
              duration: const Duration(milliseconds: 200),
              child: Container(
                color: Colors.black54,
                child: Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      _buildAnimation(),
                      if (message != null) ...[
                        const SizedBox(height: 20),
                        Text(
                          message,
                          style: const TextStyle(
                            fontSize: 16,
                            color: Colors.white,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );

    final overlayState = Overlay.of(context);
    if (overlayState != null) {
      overlayState.insert(overlay);
      _entry.value = overlay;
    }
  }

  /// Remove o overlay
  static void hide() {
    _entry.value?.remove();
    _entry.value = null;
  }

  /// Lottie com fallback
  static Widget _buildAnimation() {
    try {
      return Lottie.asset(
        'assets/lottie/loading.json',
        width: 120,
        height: 120,
        fit: BoxFit.contain,
        repeat: true,
      );
    } catch (_) {
      return const CircularProgressIndicator(
        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
      );
    }
  }
}