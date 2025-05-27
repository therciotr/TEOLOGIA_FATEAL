import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static final String baseUrl = dotenv.env['API_URL']!;

  static Future<List<dynamic>> getAlunos() async {
    final response = await http.get(Uri.parse("\$baseUrl/alunos"));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw Exception("Erro ao buscar alunos");
  }
}
