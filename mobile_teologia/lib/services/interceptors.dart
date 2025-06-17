import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// Interceptor para adicionar token JWT às requisições.
class AuthInterceptor extends Interceptor {
  final FlutterSecureStorage _storage;

  AuthInterceptor(this._storage);

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    final token = await _storage.read(key: 'jwt_token');
    if (token != null && token.isNotEmpty) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    return handler.next(options);
  }
}

/// Interceptor para tentar novamente se falhar por rede.
class RetryOnSocketExceptionInterceptor extends Interceptor {
  @override
  Future<void> onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.type == DioExceptionType.unknown &&
        err.error is! FormatException &&
        err.requestOptions.extra['retry'] != true) {
      final options = err.requestOptions;
      options.extra['retry'] = true;

      for (var attempt = 0; attempt < 3; attempt++) {
        try {
          await Future.delayed(Duration(milliseconds: 300 * (attempt + 1)));
          final response = await Dio().fetch(options);
          return handler.resolve(response);
        } catch (_) {}
      }
    }
    return handler.next(err);
  }
}