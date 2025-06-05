import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiService {
  final String baseUrl = "https://teologiafateal.trsystemas.com.br/api";
  final _storage = FlutterSecureStorage();

  Future<Map<String, String>> _getHeaders() async {
    final token = await _storage.read(key: 'jwt_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    };
  }

  Future<List<dynamic>> getAlunos() async {
    final headers = await _getHeaders();
    final response = await http.get(Uri.parse('$baseUrl/alunos'), headers: headers);

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Erro ao carregar alunos');
    }
  }

  Future<void> criarAluno(Map<String, dynamic> alunoData) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('$baseUrl/alunos'),
      headers: headers,
      body: json.encode(alunoData),
    );

    if (response.statusCode != 201) {
      throw Exception('Erro ao criar aluno');
    }
  }

  // Adicione métodos semelhantes para mensalidades, pagamentos etc.
}