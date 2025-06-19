// lib/services/pagamento_service.dart
import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

import '../models/api_response.dart';
import '../models/pagamento.dart';

class PagamentoService {
  /* ─────────── Configuração ─────────── */
  static final String _baseUrl =
      dotenv.env['API_URL'] ?? 'https://teologiafateal.trsystemas.com.br/api';

  final _storage = const FlutterSecureStorage();
  final http.Client _http;
  PagamentoService({http.Client? client}) : _http = client ?? http.Client();

  Future<Map<String, String>> _headers() async {
    final token = await _storage.read(key: 'jwt_token');
    return {
      HttpHeaders.contentTypeHeader: 'application/json',
      if (token != null) HttpHeaders.authorizationHeader: 'Bearer $token',
    };
  }

  Uri _uri(String path) => Uri.parse('$_baseUrl$path');

  /* ─────────── Endpoints ─────────── */

  /// Obtém a lista de pagamentos.
  Future<ApiResponse<List<Pagamento>>> getPagamentos() async {
    try {
      final res = await _http
          .get(_uri('/pagamentos'), headers: await _headers())
          .timeout(const Duration(seconds: 12));

      if (res.statusCode == 200) {
        final body = json.decode(res.body);
        if (body is! List) {
          return ApiResponse(error: 'Formato inesperado de resposta');
        }

        final list = body.cast<Map>().map<Pagamento>((e) {
          try {
            return Pagamento.fromJson(Map<String, dynamic>.from(e));
          } catch (_) {
            if (kDebugMode) debugPrint('Pagamento inválido: $e');
            // Mantém o app vivo ignorando item inválido
            return Pagamento(
              id: 0,
              aluno: 'Desconhecido',
              valor: 0,
              data: '',
              pago: false,
            );
          }
        }).toList();

        return ApiResponse(data: list);
      }

      return ApiResponse(error: 'Erro ${res.statusCode}: ${res.reasonPhrase}');
    } on SocketException {
      return ApiResponse(error: 'Sem conexão com a Internet');
    } on TimeoutException {
      return ApiResponse(error: 'Tempo de conexão esgotado');
    } catch (_) {
      return ApiResponse(error: 'Falha inesperada');
    }
  }

  /// Marca um pagamento como “pago”.
  Future<ApiResponse<bool>> pagar(int id) async {
    try {
      final res = await _http.post(
        _uri('/pagamentos/$id/pagar'),
        headers: await _headers(),
      );

      return res.statusCode == 200
          ? ApiResponse(data: true)
          : ApiResponse(error: 'Erro ${res.statusCode}: ${res.body}');
    } on SocketException {
      return ApiResponse(error: 'Sem conexão com a Internet');
    } catch (_) {
      return ApiResponse(error: 'Falha ao marcar pagamento');
    }
  }
}