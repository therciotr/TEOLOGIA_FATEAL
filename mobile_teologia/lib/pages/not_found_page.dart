import 'package:flutter/material.dart';

class NotFoundPage extends StatelessWidget {
  const NotFoundPage({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
        body: Center(
          child: Text(
            '404 – Página não encontrada',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
        ),
      );
}