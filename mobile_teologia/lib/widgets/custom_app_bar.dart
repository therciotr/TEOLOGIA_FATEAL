// lib/widgets/custom_app_bar.dart
// -----------------------------------------------------------------------------
// AppBar reutilizável (Material 3) – preparado para temas claro/escuro,
// gradiente opcional, subtítulo e integração com sistema (status-bar).
// -----------------------------------------------------------------------------
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  const CustomAppBar({
    super.key,
    required this.title,

    // opções comuns
    this.subtitle,
    this.actions,
    this.showBack = true,

    // gradiente
    this.gradient,
    this.elevation = 0,

    // sistema
    this.systemUiOverlayStyle,

    // interceptador de voltar
    this.onWillPop,
    this.bottom,
    this.toolbarHeight,
  });

  // conteúdo principal
  final String          title;
  final String?         subtitle;
  final List<Widget>?   actions;

  // aparência
  final bool            showBack;
  final Gradient?       gradient;
  final double          elevation;

  // system-bar (status bar)
  final SystemUiOverlayStyle? systemUiOverlayStyle;

  // interceptador de voltar
  final Future<bool> Function()? onWillPop;

  // bottom (tabs, etc.)  / altura custom
  final PreferredSizeWidget? bottom;
  final double?              toolbarHeight;

  /* ────────────────────────── PreferredSize ─────────────────────────── */

  @override
  Size get preferredSize {
    final height = toolbarHeight ?? kToolbarHeight;
    return Size.fromHeight(
      bottom == null ? height : height + bottom!.preferredSize.height,
    );
  }

  /* ───────────────────────────── Build ──────────────────────────────── */

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final textTheme = Theme.of(context).textTheme;

    final bgColor   = gradient == null ? scheme.surface : Colors.transparent;
    final fgColor   = scheme.onSurface;

    final titleColumn = Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment : MainAxisAlignment.center,
      children: [
        Text(title,
            style: textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
              color: fgColor,
            )),
        if (subtitle != null) ...[
          const SizedBox(height: 2),
          Text(subtitle!,
              style: textTheme.labelSmall?.copyWith(color: fgColor)),
        ],
      ],
    );

    final appBar = AppBar(
      automaticallyImplyLeading: false, // controlamos manualmente
      backgroundColor : bgColor,
      foregroundColor : fgColor,
      elevation       : elevation,
      centerTitle     : true,
      toolbarHeight   : toolbarHeight,
      surfaceTintColor: bgColor,          // remove “tint” Material 3
      shadowColor     : scheme.outlineVariant.withOpacity(0.25),
      systemOverlayStyle: systemUiOverlayStyle ??
          (Theme.of(context).brightness == Brightness.dark
              ? SystemUiOverlayStyle.light
              : SystemUiOverlayStyle.dark),

      leading: showBack
          ? IconButton(
              icon     : const Icon(Icons.arrow_back),
              tooltip  : MaterialLocalizations.of(context).backButtonTooltip,
              onPressed: () async {
                // aplica interceptador, se houver
                final canPop = onWillPop == null ? true : await onWillPop!();
                if (canPop && Navigator.canPop(context)) {
                  Navigator.pop(context);
                }
              },
            )
          : null,

      title  : titleColumn,
      actions: actions,
      bottom : bottom,
      flexibleSpace: gradient != null
          ? Container(decoration: BoxDecoration(gradient: gradient))
          : null,
    );

    // se não há interceptador, devolvemos o appBar simples
    if (onWillPop == null) return appBar;

    // caso contrário, envolvemos num WillPopScope
    return WillPopScope(
      onWillPop: onWillPop,
      child: appBar,
    );
  }
}