// lib/widgets/form_input_field.dart
// -----------------------------------------------------------------------------
// TextFormField reutilizável com validação integrada, suporte a senhas
// e personalização de aparência (Material 3).
// -----------------------------------------------------------------------------
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// Tipos de validação “plug-and-play”.
enum InputValidator {
  none,
  requiredField,
  email,
  regex,
}

/// Campo de texto reutilizável.
class FormInputField extends StatefulWidget {
  const FormInputField({
    super.key,
    required this.label,
    required this.controller,

    // aparência
    this.icon,
    this.hint,
    this.keyboardType,
    this.textCapitalization = TextCapitalization.none,
    this.obscure = false,
    this.maxLength,

    // validação
    this.validator = InputValidator.none,
    this.regexPattern,
    this.minLength,
    this.customError,

    // extras
    this.inputFormatters,
    this.onChanged,
    this.onSubmitted,
    this.enabled = true,
  });

  /* ────────── Parâmetros ────────── */
  final String                    label;
  final String?                   hint;
  final IconData?                 icon;
  final TextEditingController     controller;

  // teclado / texto
  final TextInputType?            keyboardType;
  final TextCapitalization        textCapitalization;
  final bool                      obscure;
  final int?                      maxLength;

  // validação
  final InputValidator            validator;
  final String?                   regexPattern;
  final int?                      minLength;
  final String?                   customError;

  // comportamento
  final List<TextInputFormatter>? inputFormatters;
  final ValueChanged<String>?     onChanged;
  final ValueChanged<String>?     onSubmitted;
  final bool                      enabled;

  @override
  State<FormInputField> createState() => _FormInputFieldState();
}

class _FormInputFieldState extends State<FormInputField> {
  bool _obscure = false;

  @override
  void initState() {
    super.initState();
    _obscure = widget.obscure;
  }

  /* ────────── Validação ────────── */
  String? _validator(String? value) {
    final v = value?.trim() ?? '';

    // vazio
    if (widget.validator == InputValidator.requiredField && v.isEmpty) {
      return widget.customError ?? 'Campo obrigatório';
    }

    // mínimo
    if (widget.minLength != null && v.length < widget.minLength!) {
      return widget.customError ??
          'Mínimo de ${widget.minLength} caracteres';
    }

    // e-mail
    if (widget.validator == InputValidator.email && v.isNotEmpty) {
      final exp = RegExp(
        r"^[\w\.\-]+@([\w\-]+\.)+[A-Za-z]{2,}$",
        caseSensitive: false,
      );
      if (!exp.hasMatch(v)) {
        return widget.customError ?? 'E-mail inválido';
      }
    }

    // regex custom
    if (widget.validator == InputValidator.regex &&
        widget.regexPattern != null &&
        v.isNotEmpty) {
      if (!RegExp(widget.regexPattern!).hasMatch(v)) {
        return widget.customError ?? 'Formato inválido';
      }
    }

    return null; // ok
  }

  /* ────────── Build ────────── */
  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;

    return TextFormField(
      controller        : widget.controller,
      enabled           : widget.enabled,
      keyboardType      : widget.keyboardType,
      textCapitalization: widget.textCapitalization,
      obscureText       : _obscure,
      maxLength         : widget.maxLength,
      inputFormatters   : widget.inputFormatters,
      validator         : _validator,
      onChanged         : widget.onChanged,
      onFieldSubmitted  : widget.onSubmitted,
      decoration: InputDecoration(
        labelText  : widget.label,
        hintText   : widget.hint,
        counterText: '', // oculta o contador de caracteres
        prefixIcon : widget.icon != null
            ? Icon(widget.icon, color: colors.primary)
            : null,
        suffixIcon : widget.obscure
            ? IconButton(
                tooltip : _obscure ? 'Mostrar' : 'Ocultar',
                icon    : Icon(
                  _obscure ? Icons.visibility : Icons.visibility_off,
                ),
                onPressed: () => setState(() => _obscure = !_obscure),
              )
            : null,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 14, vertical: 18),
      ),
    );
  }
}