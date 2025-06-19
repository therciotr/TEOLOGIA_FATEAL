// lib/models/mensalidade.dart
//
//  Modelo imutável + tip-safe para representar a mensalidade de um aluno.
//  Inclui:
//    • Enum <-> String bidirecional
//    • Construtores tolerantes a dados “sujos” (REST / Firestore)
//    • copyWith(), Equatable, toMap()/fromMap()
//    • Validação leve de valores negativos
// ---------------------------------------------------------------------------

import 'package:equatable/equatable.dart';

/// Estados possíveis de uma mensalidade.
///
///  • [pago]       – quitada  
///  • [pendente]   – ainda dentro do prazo  
///  • [atrasado]   – vencida  
///  • [desconhecido] – fallback caso o backend envie algo inesperado
enum MensalidadeStatus { pago, pendente, atrasado, desconhecido }

/*──────────────────────── Helpers de Enum ↔ String ────────────────────────*/
MensalidadeStatus _statusFromString(String? raw) {
  switch (raw?.toLowerCase()) {
    case 'pago':     return MensalidadeStatus.pago;
    case 'pendente': return MensalidadeStatus.pendente;
    case 'atrasado': return MensalidadeStatus.atrasado;
    default:         return MensalidadeStatus.desconhecido;
  }
}

String _statusToString(MensalidadeStatus s) => s.name;

/*────────────────────────────────  Modelo  ────────────────────────────────*/
class Mensalidade extends Equatable {
  const Mensalidade({
    required this.id,
    required this.aluno,
    required this.vencimento,
    required this.valor,
    required this.status,
  }) : assert(valor >= 0, 'Valor não pode ser negativo');

  // ─── Atributos ─────────────────────────────────────────────────────────
  final int                id;
  final String             aluno;
  final DateTime           vencimento;
  final double             valor;
  final MensalidadeStatus  status;

  // ─── Construção segura a partir de Map/JSON ───────────────────────────
  factory Mensalidade.fromMap(Map<dynamic, dynamic> map) {
    return Mensalidade(
      id        : int.tryParse(map['id'].toString()) ?? 0,
      aluno     : (map['aluno'] ?? '—').toString(),
      valor     : _numToDouble(map['valor']),
      vencimento: _parseDate(map['vencimento']),
      status    : _statusFromString(map['status']?.toString()),
    );
  }
  factory Mensalidade.fromJson(Map<String, dynamic> json) =>
      Mensalidade.fromMap(json);

  // ─── Serialização ─────────────────────────────────────────────────────
  Map<String, dynamic> toMap() => {
        'id'        : id,
        'aluno'     : aluno,
        'vencimento': vencimento.toIso8601String(),
        'valor'     : valor,
        'status'    : _statusToString(status),
      };
  Map<String, dynamic> toJson() => toMap();

  // ─── copyWith() helper ────────────────────────────────────────────────
  Mensalidade copyWith({
    int?               id,
    String?            aluno,
    DateTime?          vencimento,
    double?            valor,
    MensalidadeStatus? status,
  }) =>
      Mensalidade(
        id        : id        ?? this.id,
        aluno     : aluno     ?? this.aluno,
        vencimento: vencimento?? this.vencimento,
        valor     : valor     ?? this.valor,
        status    : status    ?? this.status,
      );

  // ─── Equatable ────────────────────────────────────────────────────────
  @override
  List<Object?> get props => [id, aluno, vencimento, valor, status];

  @override
  String toString() =>
      'Mensalidade(id: $id, aluno: $aluno, valor: $valor, '
      'venc: ${vencimento.toIso8601String()}, status: $status)';

  // ─── Helpers internos ────────────────────────────────────────────────
  static double _numToDouble(dynamic raw) =>
      raw is num ? raw.toDouble() : double.tryParse(raw.toString()) ?? 0.0;

  static DateTime _parseDate(dynamic raw) {
    if (raw is DateTime) return raw;
    if (raw is int)      return DateTime.fromMillisecondsSinceEpoch(raw);
    return DateTime.tryParse(raw?.toString() ?? '') ?? DateTime(1970);
  }
}