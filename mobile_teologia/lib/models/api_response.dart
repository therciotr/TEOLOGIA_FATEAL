// lib/models/api_response.dart
import 'package:equatable/equatable.dart';

/// Modelo genérico para padronizar qualquer resposta de serviço.
///
/// ```dart
/// final r = ApiResponse.success(data);  // ok
/// final e = ApiResponse.error('Falha...');  // erro
///
/// r.when(
///   success: (d) => print('🎉 $d'),
///   error:   (msg) => print('💥 $msg'),
/// );
/// ```
class ApiResponse<T> extends Equatable {
  const ApiResponse._({this.data, this.error});

  /// Dados devolvidos pela API (pode ser null se for erro).
  final T? data;

  /// Mensagem de erro (pode ser null se deu certo).
  final String? error;

  /*──────────────────────── Factories ───────────────────────*/

  /// Constrói um `ApiResponse` bem-sucedido.
  factory ApiResponse.success(T data) =>
      ApiResponse._(data: data);

  /// Constrói um `ApiResponse` com falha.
  factory ApiResponse.error(String message) =>
      ApiResponse._(error: message);

  /// Constrói a partir de um JSON bruto, recebendo:
  /// * `mapper` – função que converte o `Map<String,dynamic>` para `T`.
  ///
  /// Útil quando sua API devolve `{ "data": {...}, "error": null }`
  factory ApiResponse.fromJson(
    Map<String, dynamic> json, {
    required T Function(dynamic raw) mapper,
  }) {
    final error = json['error'] as String?;
    final data  = error == null ? mapper(json['data']) : null;
    return ApiResponse._(data: data, error: error);
  }

  /*──────────────────── Status helpers ──────────────────────*/

  bool get isSuccess => error == null;
  bool get ok        => isSuccess;

  bool get isError   => error != null;
  String get message => error ?? '';

  /*──────────────────────── Utilitários ─────────────────────*/

  /// Executa `success` *ou* `error` de acordo com o estado.
  R when<R>({
    required R Function(T data) success,
    required R Function(String msg) error,
  }) =>
      isSuccess ? success(data as T) : error(message);

  /// Variante que permite omitir um dos callbacks.
  R maybeWhen<R>({
    R Function(T data)? success,
    R Function(String msg)? error,
    required R Function() orElse,
  }) =>
      isSuccess
          ? (success != null ? success(data as T) : orElse())
          : (error   != null ? error(message)      : orElse());

  /// Clona alterando campos.
  ApiResponse<T> copyWith({T? data, String? error}) =>
      ApiResponse._(
        data:  data  ?? this.data,
        error: error ?? this.error,
      );

  Map<String, dynamic> toJson(
    dynamic Function(T value) mapper,
  ) =>
      {
        'data' : data != null ? mapper(data as T) : null,
        'error': error,
      };

  @override
  List<Object?> get props => [data, error];

  @override
  String toString() =>
      'ApiResponse(${isSuccess ? '✅ data=$data' : '❌ error=$error'})';
}