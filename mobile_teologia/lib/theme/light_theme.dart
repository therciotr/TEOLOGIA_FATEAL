import 'package:flutter/material.dart';

/// 🎨 Tema claro oficial da FATEAL.
final ThemeData lightTheme = ThemeData(
  brightness: Brightness.light,
  useMaterial3: true,
  colorSchemeSeed: Colors.indigo, // Azul institucional
  visualDensity: VisualDensity.adaptivePlatformDensity,

  // ─── AppBar ────────────────────────────────────────────────
  appBarTheme: const AppBarTheme(
    elevation: 0,
    centerTitle: true,
    backgroundColor: Colors.transparent,
    foregroundColor: Colors.black87,
    titleTextStyle: TextStyle(
      fontSize: 20,
      fontWeight: FontWeight.w600,
      color: Colors.black87,
    ),
    iconTheme: IconThemeData(color: Colors.black87),
  ),

  // ─── Botões ────────────────────────────────────────────────
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: Colors.indigo,
      foregroundColor: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 24),
    ),
  ),

  // ─── Cartões ───────────────────────────────────────────────
  cardTheme: CardTheme(
    color: Colors.white,
    shadowColor: Colors.black12,
    elevation: 3,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(16),
    ),
  ),

  // ─── Inputs ────────────────────────────────────────────────
  inputDecorationTheme: InputDecorationTheme(
    filled: true,
    fillColor: Colors.grey.shade100,
    labelStyle: const TextStyle(color: Colors.black54),
    hintStyle: const TextStyle(color: Colors.black38),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide.none,
    ),
  ),

  // ─── Ícones ────────────────────────────────────────────────
  iconTheme: const IconThemeData(
    color: Colors.black54,
  ),

  // ─── Texto Geral ───────────────────────────────────────────
  textTheme: const TextTheme(
    bodyMedium: TextStyle(color: Colors.black87),
    titleLarge: TextStyle(color: Colors.black),
    labelLarge: TextStyle(color: Colors.black87),
  ),
);