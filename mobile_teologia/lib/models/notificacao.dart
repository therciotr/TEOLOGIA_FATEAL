// lib/models/notificacao.dart
import 'package:equatable/equatable.dart';

/// Severidade / tipo – use o que fizer sentido no seu domínio.
enum NotificacaoTipo { info, alerta, aviso, erro }

NotificacaoTipo _tipoFromString(String? raw) {
  switch (raw?.toLowerCase()) {
    case 'alerta': return NotificacaoTipo.alerta;
    case 'aviso':  return NotificacaoTipo.aviso;
    case 'erro':   return NotificacaoTipo.erro;
    default:       return NotificacaoTipo.info;
  }
}

/// Status lido/não-lido, ajuda no badge de “novas”.
enum NotificacaoStatus { lida, naoLida }

NotificacaoStatus _statusFromBool(bool? lida) =>
    lida == true ? NotificacaoStatus.lida : NotificacaoStatus.naoLida;

/// Modelo imutável + comparável por valor.
class Notificacao extends Equatable {
  const Notificacao({
    required this.id,
    required this.titulo,
    required this.mensagem,
    required this.data,
    this.tipo = NotificacaoTipo.info,
    this.status = NotificacaoStatus.naoLida,
  });

  /*─────────────── Campos ───────────────*/
  final int                id;
  final String             titulo;
  final String             mensagem;
  final DateTime           data;      // agora é DateTime!
  final NotificacaoTipo    tipo;
  final NotificacaoStatus  status;

  /*────────── Factories robustas ────────*/
  factory Notificacao.fromMap(Map<dynamic, dynamic> map) {
    final rawData = map['data'];

    return Notificacao(
      id       : int.tryParse(map['id'].toString()) ?? 0,
      titulo   : map['titulo']?.toString()   ?? '—',
      mensagem : map['mensagem']?.toString() ?? '—',
      data     : _parseDate(rawData),
      tipo     : _tipoFromString(map['tipo']?.toString()),
      status   : _statusFromBool(map['lida'] as bool?),
    );
  }

  factory Notificacao.fromJson(Map<String, dynamic> json) =>
      Notificacao.fromMap(json);

  /*──────────── Serialização ────────────*/
  Map<String, dynamic> toMap() => {
        'id'     : id,
        'titulo' : titulo,
        'mensagem': mensagem,
        'data'   : data.toIso8601String(),
        'tipo'   : tipo.name,
        'lida'   : status == NotificacaoStatus.lida,
      };

  Map<String, dynamic> toJson() => toMap();

  /*──────────── Utilidades ──────────────*/
  Notificacao copyWith({
    int?               id,
    String?            titulo,
    String?            mensagem,
    DateTime?          data,
    NotificacaoTipo?   tipo,
    NotificacaoStatus? status,
  }) =>
      Notificacao(
        id       : id       ?? this.id,
        titulo   : titulo   ?? this.titulo,
        mensagem : mensagem ?? this.mensagem,
        data     : data     ?? this.data,
        tipo     : tipo     ?? this.tipo,
        status   : status   ?? this.status,
      );

  static DateTime _parseDate(dynamic raw) {
    if (raw is DateTime) return raw;
    if (raw is int)      return DateTime.fromMillisecondsSinceEpoch(raw);
    return DateTime.tryParse(raw?.toString() ?? '') ?? DateTime(1970);
  }

  @override
  List<Object?> get props => [id, titulo, mensagem, data, tipo, status];

  @override
  String toString() =>
      'Notificacao(id: $id, titulo: $titulo, data: ${data.toIso8601String()}, '
      'tipo: $tipo, status: $status)';
}