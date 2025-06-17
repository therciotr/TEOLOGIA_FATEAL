// lib/services/api_service.dart
// -----------------------------------------------------------------------------
// Camada REST central da aplicação (Dio + JWT + Retry + Refresh-Token)
// -----------------------------------------------------------------------------
//
// • Suporte a .env (API_BASE_URL)
// • Cabeçalho Authorization automático
// • Renovação de token transparente quando receber 401
// • Retry exponencial em falha de rede (3 tentativas)
// • Verificação de conectividade (connectivity_plus)
// • Pretty logger apenas em debug
// • Tipagem forte para respostas (ApiResponse<T>)
// -----------------------------------------------------------------------------

import 'dart:async';
import 'dart:io';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:dio/dio.dart';
import 'package:dio/io.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';

import '../models/aluno.dart';
import '../models/mensalidade.dart';
import '../models/api_response.dart';

class ApiService {
  /* -------------------------------------------------------------------------- */
  /*  SINGLETON                                                                 */
  /* -------------------------------------------------------------------------- */
  ApiService._() {
    _initDio();
  }
  static final ApiService _instance = ApiService._();
  factory ApiService() => _instance;

  /* -------------------------------------------------------------------------- */
  /*  INTERNOS                                                                   */
  /* -------------------------------------------------------------------------- */
  final _storage  = const FlutterSecureStorage();
  late final Dio _dio;

  // Controla refresh-token para evitar múltiplas chamadas simultâneas
  final _refreshLock = Lock();

  void _initDio() {
    final baseUrl = dotenv.env['API_BASE_URL']?.trimEnd('/') ??
        'https://teologiafateal.trsystemas.com.br/api';

    final opts = BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 15),
      sendTimeout: const Duration(seconds: 10),
      contentType: Headers.jsonContentType,
      responseType: ResponseType.json,
    );

    _dio = Dio(opts);

    // Resolve problemas de certificado em DEV (opcional - comentar em prod!)
    (_dio.httpClientAdapter as IOHttpClientAdapter).onHttpClientCreate =
        (client) {
      client.badCertificateCallback = (cert, host, port) => kDebugMode;
      return client;
    };

    // Interceptores -----------------------------------------------------------
    _dio.interceptors.addAll([
      _AuthInterceptor(_storage),
      _TokenRefreshInterceptor(_storage, _refreshLock, _dio),
      _RetryInterceptor(),
      if (kDebugMode)
        PrettyDioLogger(
          requestHeader: true,
          requestBody: true,
          responseBody: true,
          compact: true,
        ),
    ]);
  }

  /* -------------------------------------------------------------------------- */
  /*  AUTENTICAÇÃO                                                              */
  /* -------------------------------------------------------------------------- */
  Future<ApiResponse<void>> login(String email, String senha) async {
    if (await _offline) return ApiResponse(error: 'Sem conexão à Internet');
    try {
      final r = await _dio.post('/auth/login', data: {
        'email': email,
        'senha': senha,
      });

      final token = r.data['token'] as String?;
      if (token == null || token.isEmpty) {
        return ApiResponse(error: 'Token ausente');
      }
      await _storage.write(key: 'jwt_token', value: token);
      return ApiResponse(data: null);
    } on DioException catch (e) {
      return ApiResponse(error: _readError(e));
    }
  }

  Future<void> logout() async {
    await _storage.delete(key: 'jwt_token');
  }

  /* -------------------------------------------------------------------------- */
  /*  ALUNOS                                                                    */
  /* -------------------------------------------------------------------------- */
  Future<ApiResponse<List<Aluno>>> getAlunos() async {
    if (await _offline) return ApiResponse(error: 'Você está offline');
    try {
      final r = await _dio.get('/alunos');
      final list = (r.data as List).map((e) => Aluno.fromMap(e)).toList();
      return ApiResponse(data: list);
    } on DioException catch (e) {
      return ApiResponse(error: _readError(e));
    }
  }

  Future<ApiResponse<Aluno>> getAluno(int id) async {
    try {
      final r = await _dio.get('/alunos/$id');
      return ApiResponse(data: Aluno.fromMap(r.data));
    } on DioException catch (e) {
      return ApiResponse(error: _readError(e));
    }
  }

  Future<ApiResponse<void>> createAluno(Map<String, dynamic> body) async {
    try {
      await _dio.post('/alunos', data: body);
      return ApiResponse(data: null);
    } on DioException catch (e) {
      return ApiResponse(error: _readError(e));
    }
  }

  /* -------------------------------------------------------------------------- */
  /*  MENSALIDADES                                                              */
  /* -------------------------------------------------------------------------- */
  Future<ApiResponse<List<Mensalidade>>> getMensalidades() async {
    try {
      final r = await _dio.get('/mensalidades');
      final list = (r.data as List)
          .map((e) => Mensalidade.fromMap(e))
          .toList();
      return ApiResponse(data: list);
    } on DioException catch (e) {
      return ApiResponse(error: _readError(e));
    }
  }

  /* -------------------------------------------------------------------------- */
  /*  HELPERS                                                                   */
  /* -------------------------------------------------------------------------- */
  Future<bool> get _offline async =>
      (await Connectivity().checkConnectivity()) == ConnectivityResult.none;

  String _readError(DioException e) {
    switch (e.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        return 'Tempo de conexão esgotado. Tente novamente.';
      case DioExceptionType.badResponse:
        final data = e.response?.data;
        return data is Map && data['message'] != null
            ? data['message'].toString()
            : 'Servidor retornou status ${e.response?.statusCode}';
      default:
        return 'Erro inesperado. Verifique sua conexão.';
    }
  }
}

/* ========================================================================== */
/*  INTERCEPTOR: JWT                                                          */
/* ========================================================================== */
class _AuthInterceptor extends Interceptor {
  _AuthInterceptor(this._storage);
  final FlutterSecureStorage _storage;

  @override
  void onRequest(RequestOptions o, RequestInterceptorHandler h) async {
    final token = await _storage.read(key: 'jwt_token');
    if (token?.isNotEmpty == true) {
      o.headers[HttpHeaders.authorizationHeader] = 'Bearer $token';
    }
    h.next(o);
  }
}

/* ========================================================================== */
/*  INTERCEPTOR: REFRESH-TOKEN (401)                                          */
/* ========================================================================== */
class _TokenRefreshInterceptor extends Interceptor {
  _TokenRefreshInterceptor(this._storage, this._lock, this._dio);
  final FlutterSecureStorage _storage;
  final Lock _lock;
  final Dio _dio;

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401 && !_lock.locked) {
      try {
        await _lock.synchronized(() async {
          // Checa se alguém já atualizou
          final freshToken = await _storage.read(key: 'jwt_token');
          if (freshToken != null &&
              err.requestOptions.headers[HttpHeaders.authorizationHeader] !=
                  'Bearer $freshToken') {
            // Outro refresh já ocorreu – repete requisição
            final clone = await _retry(err.requestOptions);
            return handler.resolve(clone);
          }

          // Chama endpoint de refresh
          final refreshResp = await _dio.post('/auth/refresh');
          final newToken = refreshResp.data['token'] as String?;
          if (newToken != null && newToken.isNotEmpty) {
            await _storage.write(key: 'jwt_token', value: newToken);
            final clone = await _retry(err.requestOptions);
            return handler.resolve(clone);
          }
        });
      } catch (_) {/* falhou – cai para handler.next */}
    }
    handler.next(err);
  }

  Future<Response<dynamic>> _retry(RequestOptions r) async {
    final newOptions = Options(
      method: r.method,
      headers: r.headers,
      contentType: r.contentType,
      responseType: r.responseType,
      followRedirects: r.followRedirects,
      validateStatus: r.validateStatus,
      receiveDataWhenStatusError: r.receiveDataWhenStatusError,
    );
    return _dio.request(r.path,
        data: r.data,
        queryParameters: r.queryParameters,
        options: newOptions,
        cancelToken: r.cancelToken,
        onReceiveProgress: r.onReceiveProgress,
        onSendProgress: r.onSendProgress);
  }
}

/* ========================================================================== */
/*  INTERCEPTOR: RETRY em falhas de REDE                                      */
/* ========================================================================== */
class _RetryInterceptor extends Interceptor {
  @override
  Future onError(DioException err, ErrorInterceptorHandler handler) async {
    // Não aplica retry se não for erro de rede
    if (err.type != DioExceptionType.unknown || err.error is! SocketException) {
      return handler.next(err);
    }

    const maxAttempts = 3;
    for (var attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await Future.delayed(Duration(milliseconds: 300 * attempt));
        return handler.resolve(await err.requestOptions
            .retry()); // extension abaixo
      } catch (e) {
        if (attempt == maxAttempts) return handler.next(err);
      }
    }
  }
}

/* ========================================================================== */
/*  EXTENSION para Retry                                                      */
/* ========================================================================== */
extension _RequestRetry on RequestOptions {
  Future<Response<T>> retry<T>() async {
    final dio = Dio()..options = this.baseOptions;
    return dio.fetch<T>(this);
  }
}
