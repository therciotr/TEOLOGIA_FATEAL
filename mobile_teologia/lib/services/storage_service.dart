import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// Serviço central de armazenamento seguro (JWT, preferências, etc).
class StorageService {
  static const _jwtKey = 'jwt_token';
  static final _storage = FlutterSecureStorage();

  static Future<void> saveToken(String token) async {
    await _storage.write(key: _jwtKey, value: token);
  }

  static Future<String?> getToken() async {
    return await _storage.read(key: _jwtKey);
  }

  static Future<void> clearToken() async {
    await _storage.delete(key: _jwtKey);
  }
}