// lib/models/aluno.dart
import 'package:equatable/equatable.dart';

import 'documento.dart';

/// Representa um aluno cadastrado no sistema FATEAL.
///
/// * Usa `Equatable` → comparação por valor.
/// * Campos opcionais claramente anotados com `?`.
/// * `copyWith` para facilitar atualizações imutáveis.
/// * Métodos de serialização/​desserialização separados para:
///   • REST/JSON (`fromJson` | `toJson`)  
///   • Firestore (`fromFirestore` | `toFirestore`)
class Aluno extends Equatable {
  const Aluno({
    required this.id,
    required this.nome,
    required this.email,
    this.telefone,
    this.endereco,
    this.rg,
    this.turmaId,
    this.fotoUrl,
    this.matriculaPaga = false,
    this.documentos = const [],
  });

  // ───────────────────────── Campos ──────────────────────────
  final String id;
  final String nome;
  final String email;
  final String? telefone;
  final String? endereco;
  final String? rg;
  final String? turmaId;
  final String? fotoUrl;
  final bool   matriculaPaga;
  final List<Documento> documentos;

  // ───────────────────── Factory helpers ─────────────────────
  factory Aluno.fromJson(Map<String, dynamic> json) => Aluno(
        id:             json['id']               as String,
        nome:           json['nome']             as String? ?? '',
        email:          json['email']            as String? ?? '',
        telefone:       json['telefone']         as String?,
        endereco:       json['endereco']         as String?,
        rg:             json['rg']               as String?,
        turmaId:        json['turmaId']          as String?,
        fotoUrl:        json['fotoUrl']          as String?,
        matriculaPaga:  json['matriculaPaga']    as bool?    ?? false,
        documentos: (json['documentos'] as List<dynamic>?)
                ?.map((e) => Documento.fromJson(e as Map<String, dynamic>))
                .toList() ??
            const [],
      );

  Map<String, dynamic> toJson() => {
        'id'            : id,
        'nome'          : nome,
        'email'         : email,
        'telefone'      : telefone,
        'endereco'      : endereco,
        'rg'            : rg,
        'turmaId'       : turmaId,
        'fotoUrl'       : fotoUrl,
        'matriculaPaga' : matriculaPaga,
        'documentos'    : documentos.map((d) => d.toJson()).toList(),
      };

  // Firestore usa `createdAt/updatedAt` em nível de documento
  factory Aluno.fromFirestore(Map<String, dynamic> data) =>
      Aluno.fromJson(data);

  Map<String, dynamic> toFirestore() => toJson();

  // ───────────────────── Utilidades extra ────────────────────
  Aluno copyWith({
    String?               id,
    String?               nome,
    String?               email,
    String?               telefone,
    String?               endereco,
    String?               rg,
    String?               turmaId,
    String?               fotoUrl,
    bool?                 matriculaPaga,
    List<Documento>?      documentos,
  }) =>
      Aluno(
        id:             id             ?? this.id,
        nome:           nome           ?? this.nome,
        email:          email          ?? this.email,
        telefone:       telefone       ?? this.telefone,
        endereco:       endereco       ?? this.endereco,
        rg:             rg             ?? this.rg,
        turmaId:        turmaId        ?? this.turmaId,
        fotoUrl:        fotoUrl        ?? this.fotoUrl,
        matriculaPaga:  matriculaPaga  ?? this.matriculaPaga,
        documentos:     documentos     ?? this.documentos,
      );

  @override
  List<Object?> get props => [
        id,
        nome,
        email,
        telefone,
        endereco,
        rg,
        turmaId,
        fotoUrl,
        matriculaPaga,
        documentos,
      ];
}