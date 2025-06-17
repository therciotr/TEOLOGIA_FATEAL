import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

/// Widget de carregamento animado (Lottie) com fallback para
/// [CircularProgressIndicator] caso o JSON não seja encontrado.
///
/// • Suporta dark mode automaticamente  
/// • Possui tamanho configurável  
/// • Pode exibir texto opcional ou ocultar a animação (“modo esqueleto”)
class LoadingWidget extends StatelessWidget {
  /// Texto exibido logo abaixo da animação.
  final String? mensagem;

  /// Caminho do asset Lottie.  Padrão: `'assets/lottie/loading.json'`.
  final String asset;

  /// Largura/altura da animação.  Padrão = 120 px.
  final double size;

  /// Se `false`, oculta a animação e mostra apenas o texto.
  final bool showAnimation;

  const LoadingWidget({
    super.key,
    this.mensagem,
    this.asset = 'assets/lottie/loading.json',
    this.size = 120,
    this.showAnimation = true,
  });

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme.primary;

    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (showAnimation)
            // Tenta carregar a animação; se falhar, usa progress indicator
            FutureBuilder(
              future: _precache(context),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.done &&
                    snapshot.hasData &&
                    snapshot.data == true) {
                  return Lottie.asset(
                    asset,
                    width: size,
                    height: size,
                    fit: BoxFit.contain,
                    repeat: true,
                  );
                }
                return SizedBox(
                  width: size * 0.5,
                  height: size * 0.5,
                  child: CircularProgressIndicator(color: color),
                );
              },
            ),
          if (mensagem != null) ...[
            const SizedBox(height: 20),
            Text(
              mensagem!,
              style: TextStyle(
                fontSize: 16,
                color: Theme.of(context).colorScheme.onBackground,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ],
      ),
    );
  }

  /// Faz o pré-cache do asset e retorna `true` se encontrado.
  Future<bool> _precache(BuildContext context) async {
    try {
      await precacheLottie(
        asset,
        context,
        delegates: const LottieDelegates(),
      );
      return true;
    } catch (_) {
      return false;
    }
  }
}