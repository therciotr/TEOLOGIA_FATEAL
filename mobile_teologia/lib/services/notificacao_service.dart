// lib/services/notificacao_service.dart
import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

import '../models/notificacao.dart';
import '../models/api_response.dart';

class NotificacaoService {
  /* ───────────────── BASE CONFIG ───────────────── */
  static final String _baseUrl =
      dotenv.env['API_URL'] ?? 'https://teologiafateal.trsystemas.com.br/api';

  final _storage = const FlutterSecureStorage();
  final http.Client _http;
  NotificacaoService({http.Client? client}) : _http = client ?? http.Client();

  Future<Map<String, String>> _headers() async {
    final token = await _storage.read(key: 'jwt_token');
    return {
      HttpHeaders.contentTypeHeader: 'application/json',
      if (token != null) HttpHeaders.authorizationHeader: 'Bearer $token',
    };
  }

  Uri _uri(String path) => Uri.parse('$_baseUrl$path');

  /* ───────────────── PUBLIC API ───────────────── */

  /// Lista notificações do usuário.
  Future<ApiResponse<List<Notificacao>>> getNotificacoes() async {
    try {
      final res = await _http
          .get(_uri('/notificacoes'), headers: await _headers())
          .timeout(const Duration(seconds: 12));

      if (res.statusCode == 200) {
        final raw = json.decode(res.body);
        if (raw is! List) {
          return ApiResponse(error: 'Formato inesperado de resposta');
        }

        final notif = raw.cast<Map>().map<Notificacao>((e) {
          try {
            return Notificacao.fromJson(Map<String, dynamic>.from(e));
          } catch (err) {
            if (kDebugMode) debugPrint('Notificação inválida: $e');
            return Notificacao(
              id: 0,
              titulo: 'Inválido',
              mensagem: 'Erro ao decodificar',
              data: '',
            );
          }
        }).toList();

        return ApiResponse(data: notif);
      }
      return ApiResponse(error: 'Erro ${res.statusCode}: ${res.body}');
    } on SocketException {
      return ApiResponse(error: 'Sem conexão com a Internet');
    } on TimeoutException {
      return ApiResponse(error: 'Tempo de conexão esgotado');
    } catch (e) {
      return ApiResponse(error: 'Falha inesperada');
    }
  }

  /// Marca notificação como lida.
  Future<ApiResponse<bool>> marcarLida(int id) async {
    try {
      final res = await _http.patch(
        _uri('/notificacoes/$id/lida'),
        headers: await _headers(),
      );

      return res.statusCode == 200
          ? ApiResponse(data: true)
          : ApiResponse(error: 'Erro ${res.statusCode}');
    } catch (_) {
      return ApiResponse(error: 'Não foi possível marcar como lida');
    }
  }

  /// Remove TODAS as notificações.
  Future<ApiResponse<bool>> limparNotificacoes() async {
    try {
      final res = await _http.delete(
        _uri('/notificacoes'),
        headers: await _headers(),
      );
      return res.statusCode == 200
          ? ApiResponse(data: true)
          : ApiResponse(error: 'Erro ${res.statusCode}');
    } catch (_) {
      return ApiResponse(error: 'Falha ao limpar notificações');
    }
  }
}