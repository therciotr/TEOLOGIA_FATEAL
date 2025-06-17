import 'dart:async';
import 'package:flutter/scheduler.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Chave usada no SharedPreferences.
const _kPrefKey = 'themeMode';

/// Provider responsável por gerenciar o tema (claro, escuro ou sistema).
///
/// • Persiste a escolha localmente.  
/// • Permite alternar manualmente ou seguir o tema do sistema.  
/// • Exponibiliza o `ThemeMode` completo, não apenas bool.
class ThemeProvider with ChangeNotifier {
  ThemeProvider() {
    _init();
  }

  /// Modo atual do app (`system`, `light` ou `dark`).
  ThemeMode _themeMode = ThemeMode.system;
  ThemeMode get themeMode => _themeMode;

  /// Atalho de leitura – retorna `true` se o tema **renderizado** no momento é escuro.
  ///
  /// Útil para widgets que só precisam saber se o UI atual está dark ou não.
  bool get isDark {
    switch (_themeMode) {
      case ThemeMode.dark:
        return true;
      case ThemeMode.light:
        return false;
      case ThemeMode.system:
        final brightness = SchedulerBinding.instance.platformDispatcher.platformBrightness;
        return brightness == Brightness.dark;
    }
  }

  /* ───────────────────────────
     API Pública
  ─────────────────────────── */

  /// Alterna entre **claro** e **escuro**.
  /// • Se estiver em `system`, força para light → dark.  
  /// • Salva a preferência.
  void toggle() {
    if (_themeMode == ThemeMode.dark) {
      setTheme(ThemeMode.light);
    } else {
      setTheme(ThemeMode.dark);
    }
  }

  /// Define explicitamente o `ThemeMode` desejado.
  Future<void> setTheme(ThemeMode mode) async {
    _themeMode = mode;
    notifyListeners();
    await _prefs?.setInt(_kPrefKey, mode.index);
  }

  /* ───────────────────────────
     Persistência
  ─────────────────────────── */

  SharedPreferences? _prefs;

  Future<void> _init() async {
    _prefs ??= await SharedPreferences.getInstance();
    final storedIndex = _prefs!.getInt(_kPrefKey);

    if (storedIndex != null && storedIndex >= 0 && storedIndex <= 2) {
      _themeMode = ThemeMode.values[storedIndex];
    } else {
      _themeMode = ThemeMode.system; // padrão
    }

    notifyListeners();
  }
}