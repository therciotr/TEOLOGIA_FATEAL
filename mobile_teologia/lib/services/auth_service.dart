class AuthService {
  // Exemplo simples (troque por autenticação real via backend)
  static Future<bool> login(String email, String senha) async {
    await Future.delayed(Duration(seconds: 1));
    if (email == "admin@teste.com" && senha == "123456") {
      // Salvar token (exemplo)
      // SharedPreferences prefs = await SharedPreferences.getInstance();
      // await prefs.setString('token', 'fake_token');
      return true;
    }
    return false;
  }

  static Future<void> logout() async {
    // Remova token do usuário
    // SharedPreferences prefs = await SharedPreferences.getInstance();
    // await prefs.remove('token');
  }
}