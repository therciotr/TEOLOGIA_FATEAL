import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  static const String baseUrl = "https://teologiafateal.trsystemas.com.br/api"; // Ajuste aqui

  static Future<bool> login(String email, String senha) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'senha': senha}),
    );
    if (response.statusCode == 200) {
      // Aqui você pode armazenar o token JWT para requisições futuras
      return true;
    } else {
      return false;
    }
  }
}