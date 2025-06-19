import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Provider responsável por internacionalização (i18n).
///
/// • Persiste a escolha em `SharedPreferences`.
/// • Permite alterar para qualquer idioma da lista `supportedLocales`.
/// • Caso o idioma salvo não esteja na lista, volta para o locale do sistema.
class LanguageProvider extends ChangeNotifier {
  // ───────────────────────── Configuração ─────────────────────────
  static const _prefsKey = 'locale_code';

  /// 🌍 Idiomas aceitos pelo app (mantenha DRY — use aqui e no MaterialApp).
  static const supportedLocales = <Locale>[
    Locale('pt', 'BR'),
    Locale('en', 'US'),
  ];

  /// Locale atualmente em uso. Enquanto carrega → `null` (usa systemLocale).
  Locale? _locale;
  Locale? get locale => _locale;

  // ───────────────────────── Construtor ───────────────────────────
  LanguageProvider() {
    _init();
  }

  // ───────────────────────── API pública ──────────────────────────
  /// Altera o idioma. Retorna `false` se o locale não for suportado.
  Future<bool> setLocale(Locale locale) async {
    // Evita setar locales não suportados.
    if (!supportedLocales.contains(locale)) return false;

    _locale = locale;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_prefsKey, locale.toLanguageTag());
    return true;
  }

  /// Alterna ciclicamente entre os idiomas suportados → útil para botão “Trocar”.
  Future<void> toggle() async {
    final idx = supportedLocales.indexOf(_locale ?? supportedLocales.first);
    final next = supportedLocales[(idx + 1) % supportedLocales.length];
    await setLocale(next);
  }

  // ───────────────────────── Internos ────────────────────────────
  Future<void> _init() async {
    final prefs = await SharedPreferences.getInstance();
    final code  = prefs.getString(_prefsKey);

    // Se houver código salvo *e* ele for compatível com a lista → usa-o
    if (code != null) {
      final loc = _tryParseLocale(code);
      if (loc != null && supportedLocales.contains(loc)) {
        _locale = loc;
      }
    }
    // Caso contrário, deixa null para herdar `ui.window.locale`.
    notifyListeners();
  }

  /// Converte "pt_BR" ou "en-US" em `Locale`, retornando null se inválido.
  Locale? _tryParseLocale(String tag) {
    final parts = tag.split(RegExp('[-_]'));
    if (parts.isEmpty) return null;
    return parts.length == 1 ? Locale(parts.first) : Locale(parts[0], parts[1]);
  }
}