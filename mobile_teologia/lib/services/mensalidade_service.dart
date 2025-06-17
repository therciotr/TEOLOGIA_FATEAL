import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../models/mensalidade.dart';
import '../models/api_response.dart';

class MensalidadeService {
  static const String baseUrl = "https://teologiafateal.trsystemas.com.br/api";
  final _storage = const FlutterSecureStorage();

  Future<Map<String, String>> _getHeaders() async {
    final token = await _storage.read(key: 'jwt_token');
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  Future<ApiResponse<List<Mensalidade>>> getMensalidades() async {
    try {
      final headers = await _getHeaders();
      final response = await http.get(Uri.parse('$baseUrl/mensalidades'), headers: headers);
      if (response.statusCode == 200) {
        final List list = jsonDecode(response.body);
        final mensalidades = list.map((e) => Mensalidade.fromMap(e)).toList();
        return ApiResponse(data: mensalidades);
      }
      return ApiResponse(error: 'Erro ${response.statusCode}');
    } catch (e) {
      return ApiResponse(error: 'Falha de conexão');
    }
  }
}