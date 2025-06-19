// lib/widgets/section_title.dart
// ---------------------------------------------------------------
// Texto título de seção com sub-linhado opcional.
// ---------------------------------------------------------------
import 'package:flutter/material.dart';

class SectionTitle extends StatelessWidget {
  const SectionTitle(this.text, {super.key, this.padding = const EdgeInsets.symmetric(vertical: 12)});

  final String text;
  final EdgeInsets padding;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Padding(
      padding: padding,
      child: Row(
        children: [
          Text(text,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w700,
                  )),
          const SizedBox(width: 8),
          Expanded(
            child: Divider(thickness: 1.5, color: scheme.primary.withOpacity(.4)),
          ),
        ],
      ),
    );
  }
}