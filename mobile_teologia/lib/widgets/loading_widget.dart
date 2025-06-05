import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class LoadingWidget extends StatelessWidget {
  final String? mensagem;

  const LoadingWidget({Key? key, this.mensagem}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Lottie.asset(
            'assets/lottie/loading.json',
            width: 120,
            height: 120,
            fit: BoxFit.contain,
            repeat: true,
          ),
          if (mensagem != null)
            Padding(
              padding: const EdgeInsets.only(top: 20),
              child: Text(
                mensagem!,
                style: TextStyle(fontSize: 18, color: Colors.blueGrey),
              ),
            ),
        ],
      ),
    );
  }
}