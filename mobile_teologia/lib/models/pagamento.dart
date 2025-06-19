// lib/models/pagamento.dart
import 'package:equatable/equatable.dart';

/// Forma de pagamento (adicione mais se necessário).
enum MetodoPagamento { pix, boleto, cartao, dinheiro, outro }

MetodoPagamento _metodoFromString(String? raw) {
  switch (raw?.toLowerCase()) {
    case 'boleto':  return MetodoPagamento.boleto;
    case 'cartao':  return MetodoPagamento.cartao;
    case 'dinheiro':return MetodoPagamento.dinheiro;
    case 'pix':     return MetodoPagamento.pix;
    default:        return MetodoPagamento.outro;
  }
}

/// Estado do pagamento.
enum StatusPagamento { confirmado, pendente, estornado }

StatusPagamento _statusFromBool(bool? pago) =>
    pago == true ? StatusPagamento.confirmado : StatusPagamento.pendente;

/// Modelo imutável + comparável por valor.
class Pagamento extends Equatable {
  const Pagamento({
    required this.id,
    required this.mensalidadeId,
    required this.valor,
    required this.data,
    required this.metodo,
    required this.status,
  });

  /*─────────────── Campos ───────────────*/
  final int              id;
  final int              mensalidadeId;
  final double           valor;
  final DateTime         data;
  final MetodoPagamento  metodo;
  final StatusPagamento  status;

  /*────────── Factories robustas ────────*/
  factory Pagamento.fromMap(Map<dynamic, dynamic> map) {
    return Pagamento(
      id            : int.tryParse(map['id'].toString()) ?? 0,
      mensalidadeId : int.tryParse(map['mensalidadeId'].toString()) ?? 0,
      valor         : _toDouble(map['valor']),
      data          : _parseDate(map['data']),
      metodo        : _metodoFromString(map['metodo']?.toString()),
      status        : _statusFromBool(map['pago'] as bool?),
    );
  }

  factory Pagamento.fromJson(Map<String, dynamic> json) =>
      Pagamento.fromMap(json);

  /*──────────── Serialização ────────────*/
  Map<String, dynamic> toMap() => {
        'id'           : id,
        'mensalidadeId': mensalidadeId,
        'valor'        : valor,
        'data'         : data.toIso8601String(),
        'metodo'       : metodo.name,
        'pago'         : status == StatusPagamento.confirmado,
      };

  Map<String, dynamic> toJson() => toMap();

  /*──────────── Utilidades ──────────────*/
  Pagamento copyWith({
    int?              id,
    int?              mensalidadeId,
    double?           valor,
    DateTime?         data,
    MetodoPagamento?  metodo,
    StatusPagamento?  status,
  }) =>
      Pagamento(
        id            : id            ?? this.id,
        mensalidadeId : mensalidadeId ?? this.mensalidadeId,
        valor         : valor         ?? this.valor,
        data          : data          ?? this.data,
        metodo        : metodo        ?? this.metodo,
        status        : status        ?? this.status,
      );

  static double _toDouble(dynamic v) =>
      v is double ? v : (v is int ? v.toDouble() : double.tryParse(v.toString()) ?? 0.0);

  static DateTime _parseDate(dynamic raw) {
    if (raw is DateTime) return raw;
    if (raw is int)      => DateTime.fromMillisecondsSinceEpoch(raw);
    return DateTime.tryParse(raw?.toString() ?? '') ?? DateTime(1970);
  }

  @override
  List<Object?> get props =>
      [id, mensalidadeId, valor, data, metodo, status];

  @override
  String toString() =>
      'Pagamento(id: $id, mensalidade: $mensalidadeId, valor: $valor, '
      'data: ${data.toIso8601String()}, metodo: $metodo, status: $status)';
}