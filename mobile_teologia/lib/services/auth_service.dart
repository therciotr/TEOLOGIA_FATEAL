// lib/services/auth_service.dart
import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:jwt_decode/jwt_decode.dart';

/// Exceção amigável para UI.
class AuthException implements Exception {
  const AuthException(this.message);
  final String message;
  @override
  String toString() => 'AuthException: $message';
}

/// Serviço de autenticação.
///
/// Exemplo:
/// ```dart
/// final ok = await AuthService().login(email, senha);
/// if (ok) Navigator.pushReplacementNamed(context, '/home');
/// ```
class AuthService {
  /* ───────────────── CONFIG ───────────────── */
  static final String _baseUrl =
      dotenv.env['API_URL'] ?? 'https://teologiafateal.trsystemas.com.br/api';

  static const _tokenKey = 'jwt_token';
  static final _storage = FlutterSecureStorage(
    aOptions: const AndroidOptions(encryptedSharedPreferences: true),
  );

  final http.Client _http;
  AuthService({http.Client? client}) : _http = client ?? http.Client();

  /* ───────────────── PUBLIC API ───────────────── */

  /// Autentica e armazena o JWT.
  Future<bool> login(String email, String password) async {
    final res = await _safePost('/auth/login', body: {
      'email': email,
      'password': password,
    });

    final token = res['token'] as String?;
    if (token == null || token.isEmpty) {
      throw const AuthException('Token ausente na resposta');
    }
    await _saveToken(token);
    return true;
  }

  /// Registro (caso sua API permita).
  Future<bool> register(
      {required String name,
      required String email,
      required String password}) async {
    await _safePost('/auth/register', body: {
      'name': name,
      'email': email,
      'password': password,
    });
    // muitos back-ends já devolvem o token
    return await login(email, password);
  }

  /// Envia e-mail de recuperação.
  Future<bool> forgotPassword(String email) async {
    await _safePost('/auth/forgot', body: {'email': email});
    return true;
  }

  /// Retorna dados do usuário logado (ex.: /me).
  Future<Map<String, dynamic>> getProfile() async {
    final res = await _safeGet('/auth/me');
    return res as Map<String, dynamic>;
  }

  /// Logout remove o token.
  Future<void> logout() async => _storage.delete(key: _tokenKey);

  /* ───────────────── HELPERS ───────────────── */

  Future<String?> get token async => _storage.read(key: _tokenKey);

  Future<bool> get isLoggedIn async {
    final t = await token;
    return t != null && !Jwt.isExpired(t);
  }

  /* ─────────── HTTP WRAPPERS (com refresh) ─────────── */

  Future<dynamic> _safeGet(String path) =>
      _request(() => _http.get(_uri(path), headers: _authHeaders()));

  Future<dynamic> _safePost(String path, {Map<String, dynamic>? body}) =>
      _request(() => _http.post(_uri(path),
          headers: _authHeaders(), body: jsonEncode(body)));

  /// Envolve requisições e faz _refresh token_ transparente se 401.
  Future<dynamic> _request(Future<http.Response> Function() call) async {
    try {
      final res = await call().timeout(const Duration(seconds: 15));
      if (res.statusCode == 401 && await _tryRefresh()) {
        // tenta novamente com token novo
        final retry = await call();
        return _parseResponse(retry);
      }
      return _parseResponse(res);
    } on SocketException {
      throw const AuthException('Sem conexão com a internet');
    } on TimeoutException {
      throw const AuthException('Tempo de conexão esgotado');
    }
  }

  dynamic _parseResponse(http.Response res) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return jsonDecode(res.body.isEmpty ? '{}' : res.body);
    } else {
      if (kDebugMode) {
        debugPrint('AuthService: ${res.statusCode} → ${res.body}');
      }
      throw AuthException(
          'Erro ${res.statusCode}: ${res.body.isNotEmpty ? res.body : 'Resposta vazia'}');
    }
  }

  /* ─────────── REFRESH TOKEN ─────────── */

  bool _refreshing = false;
  final List<Completer<void>> _refreshQueue = [];

  Future<bool> _tryRefresh() async {
    if (_refreshing) {
      // aguarda refresh em andamento
      final c = Completer<void>();
      _refreshQueue.add(c);
      await c.future;
      return (await token) != null;
    }

    _refreshing = true;
    try {
      final oldToken = await token;
      if (oldToken == null) return false;

      final res = await _http.post(
        _uri('/auth/refresh'),
        headers: {
          HttpHeaders.contentTypeHeader: 'application/json',
          HttpHeaders.authorizationHeader: 'Bearer $oldToken',
        },
      );

      if (res.statusCode == 200) {
        final newToken = jsonDecode(res.body)['token'] as String?;
        if (newToken != null && newToken.isNotEmpty) {
          await _saveToken(newToken);
          return true;
        }
      }
      await logout();
      return false;
    } finally {
      _refreshing = false;
      // libera quem estava aguardando
      for (final c in _refreshQueue) {
        if (!c.isCompleted) c.complete();
      }
      _refreshQueue.clear();
    }
  }

  /* ─────────── UTIL ─────────── */

  Uri _uri(String path) => Uri.parse('$_baseUrl$path');

  Map<String, String> _authHeaders({Map<String, String>? extra}) {
    return {
      HttpHeaders.contentTypeHeader: 'application/json',
      if (extra != null) ...extra,
    };
  }

  Future<void> _saveToken(String t) => _storage.write(key: _tokenKey, value: t);
}