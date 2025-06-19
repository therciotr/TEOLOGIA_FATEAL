// lib/widgets/aluno_card.dart
import 'package:flutter/material.dart';
import '../models/aluno.dart'; // ✅ modelo tipado

class AlunoCard extends StatelessWidget {
  const AlunoCard({
    super.key,
    required this.aluno,
    this.onTap,
  });

  /// Dados do aluno a exibir.
  final Aluno aluno;

  /// Callback quando o card é tocado (navegar / detalhe).
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;

    return Semantics(
      label: 'Aluno ${aluno.nome}, turma ${aluno.turma ?? "N/A"}',
      child: Card(
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(12),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Row(
              children: [
                // ─── Avatar / Inicial ───────────────────────────────
                _AlunoAvatar(urlFoto: aluno.fotoUrl, nome: aluno.nome),
                const SizedBox(width: 12),

                // ─── Nome + e-mail ─────────────────────────────────
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        aluno.nome,
                        style: Theme.of(context)
                            .textTheme
                            .titleMedium
                            ?.copyWith(fontWeight: FontWeight.w600),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 2),
                      Text(
                        aluno.email,
                        style: Theme.of(context).textTheme.bodySmall,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),

                // ─── Turma badge ───────────────────────────────────
                if (aluno.turma != null && aluno.turma!.isNotEmpty)
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: scheme.primary.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      aluno.turma!,
                      style: TextStyle(
                        fontSize: 12,
                        color: scheme.primary,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/*───────────────────────────────────────────────────────────────────*/
/*  Avatar circular: usa foto se houver, senão mostra inicial.       */
/*───────────────────────────────────────────────────────────────────*/
class _AlunoAvatar extends StatelessWidget {
  const _AlunoAvatar({this.urlFoto, required this.nome});

  final String? urlFoto;
  final String nome;

  @override
  Widget build(BuildContext context) {
    final initials = nome.isNotEmpty ? nome[0].toUpperCase() : '?';

    return CircleAvatar(
      radius: 24,
      backgroundColor: Theme.of(context).colorScheme.primary.withOpacity(0.15),
      foregroundImage:
          (urlFoto != null && urlFoto!.isNotEmpty) ? NetworkImage(urlFoto!) : null,
      child: Text(
        initials,
        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
      ),
    );
  }
}