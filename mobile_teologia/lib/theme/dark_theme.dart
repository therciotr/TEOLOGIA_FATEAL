import 'package:flutter/material.dart';

/// 🌙 Tema escuro oficial da FATEAL.
final ThemeData darkTheme = ThemeData(
  brightness: Brightness.dark,
  useMaterial3: true,
  colorSchemeSeed: Colors.indigo, // Azul-escuro FATEAL
  visualDensity: VisualDensity.adaptivePlatformDensity,

  // ─── AppBar ────────────────────────────────────────────────
  appBarTheme: const AppBarTheme(
    elevation: 0,
    centerTitle: true,
    backgroundColor: Colors.transparent,
    foregroundColor: Colors.white,
    titleTextStyle: TextStyle(
      fontSize: 20,
      fontWeight: FontWeight.w600,
      color: Colors.white,
    ),
    iconTheme: IconThemeData(color: Colors.white),
  ),

  // ─── Botões ────────────────────────────────────────────────
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: Colors.indigoAccent,
      foregroundColor: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 24),
    ),
  ),

  // ─── Cartões ───────────────────────────────────────────────
  cardTheme: CardTheme(
    color: const Color(0xFF1E1E2E),
    shadowColor: Colors.black45,
    elevation: 2,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(16),
    ),
  ),

  // ─── Inputs ────────────────────────────────────────────────
  inputDecorationTheme: InputDecorationTheme(
    filled: true,
    fillColor: Colors.grey.shade900,
    labelStyle: const TextStyle(color: Colors.white70),
    hintStyle: const TextStyle(color: Colors.white38),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide.none,
    ),
  ),

  // ─── Ícones ────────────────────────────────────────────────
  iconTheme: const IconThemeData(
    color: Colors.white70,
  ),

  // ─── Texto Geral ───────────────────────────────────────────
  textTheme: const TextTheme(
    bodyMedium: TextStyle(color: Colors.white70),
    titleLarge: TextStyle(color: Colors.white),
    labelLarge: TextStyle(color: Colors.white70),
  ),
);