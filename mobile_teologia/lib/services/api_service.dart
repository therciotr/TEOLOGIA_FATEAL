import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "https://SEU_BACKEND_URL/api"; // Troque pelo seu endpoint real

  static Future<List<dynamic>> getAlunos() async {
    final response = await http.get(Uri.parse("$baseUrl/alunos"));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw Exception("Erro ao buscar alunos");
  }

  static Future<List<dynamic>> getMensalidades() async {
    final response = await http.get(Uri.parse("$baseUrl/mensalidades"));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw Exception("Erro ao buscar mensalidades");
  }

  static Future<bool> login(String email, String senha) async {
    final response = await http.post(
      Uri.parse("$baseUrl/auth/login"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({"email": email, "senha": senha}),
    );
    if (response.statusCode == 200) {
      // Salve token do backend aqui (ex: SharedPreferences)
      return true;
    }
    return false;
  }
}