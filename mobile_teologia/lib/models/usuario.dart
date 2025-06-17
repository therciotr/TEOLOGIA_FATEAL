// lib/models/usuario.dart
import 'package:equatable/equatable.dart';

/// Perfis/funções aceitos no sistema.
/// Adicione novos conforme necessário (ex.: secretaria, coordenador …).
enum PerfilUsuario { admin, professor, aluno, responsavel, outro }

PerfilUsuario _perfilFromString(String? raw) {
  switch (raw?.toLowerCase()) {
    case 'admin':      return PerfilUsuario.admin;
    case 'professor':  return PerfilUsuario.professor;
    case 'aluno':      return PerfilUsuario.aluno;
    case 'responsavel':return PerfilUsuario.responsavel;
    default:           return PerfilUsuario.outro;
  }
}

/// Modelo imutável de **Usuário**.
class Usuario extends Equatable {
  const Usuario({
    required this.id,
    required this.nome,
    required this.email,
    this.perfil = PerfilUsuario.outro,
    this.avatarUrl,
    this.token,
    this.criadoEm,
  });

  /*─────────────── Campos ───────────────*/
  final int            id;
  final String         nome;
  final String         email;
  final PerfilUsuario  perfil;
  final String?        avatarUrl;  // foto opcional
  final String?        token;      // JWT ou session-token, se disponível
  final DateTime?      criadoEm;   // timestamp de criação

  /*────────── Factories robustas ────────*/
  factory Usuario.fromMap(Map<dynamic, dynamic> map) {
    return Usuario(
      id        : int.tryParse(map['id'].toString()) ?? 0,
      nome      : map['nome']   ?? '',
      email     : map['email']  ?? '',
      perfil    : _perfilFromString(map['perfil']?.toString()),
      avatarUrl : map['avatarUrl'],
      token     : map['token'],
      criadoEm  : _parseDate(map['criadoEm']),
    );
  }

  factory Usuario.fromJson(Map<String, dynamic> json) =>
      Usuario.fromMap(json);

  /*──────────── Serialização ────────────*/
  Map<String, dynamic> toMap() => {
        'id'        : id,
        'nome'      : nome,
        'email'     : email,
        'perfil'    : perfil.name,
        'avatarUrl' : avatarUrl,
        'token'     : token,
        'criadoEm'  : criadoEm?.toIso8601String(),
      };

  Map<String, dynamic> toJson() => toMap();

  /*──────────── Utilidades ──────────────*/
  Usuario copyWith({
    int?            id,
    String?         nome,
    String?         email,
    PerfilUsuario?  perfil,
    String?         avatarUrl,
    String?         token,
    DateTime?       criadoEm,
  }) =>
      Usuario(
        id        : id        ?? this.id,
        nome      : nome      ?? this.nome,
        email     : email     ?? this.email,
        perfil    : perfil    ?? this.perfil,
        avatarUrl : avatarUrl ?? this.avatarUrl,
        token     : token     ?? this.token,
        criadoEm  : criadoEm  ?? this.criadoEm,
      );

  static DateTime? _parseDate(dynamic raw) {
    if (raw == null)   return null;
    if (raw is DateTime) return raw;
    if (raw is int)      return DateTime.fromMillisecondsSinceEpoch(raw);
    return DateTime.tryParse(raw.toString());
  }

  /*──────── Equatable override ──────────*/
  @override
  List<Object?> get props =>
      [id, nome, email, perfil, avatarUrl, token, criadoEm];

  @override
  String toString() =>
      'Usuario(id: $id, nome: $nome, email: $email, perfil: $perfil)';
}