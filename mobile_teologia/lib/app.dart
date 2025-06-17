import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:provider/provider.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import 'theme/theme_provider.dart';
import 'theme/light_theme.dart';
import 'theme/dark_theme.dart';
import 'theme/language_provider.dart';

import 'pages/login_page.dart';
import 'pages/home_page.dart';
import 'pages/alunos_page.dart';
import 'pages/mensalidades_page.dart';
import 'pages/notificacoes_page.dart';
import 'pages/qr_code_scanner_page.dart';
import 'pages/not_found_page.dart';

/// Observador global de rotas (útil para logs e integração com push-service).
final RouteObserver<PageRoute> routeObserver = RouteObserver<PageRoute>();

class MobileTeologiaApp extends StatelessWidget {
  const MobileTeologiaApp({super.key, required this.navigatorKey});

  /// Chave global compartilhada p/ navegação programática (push-service, etc.).
  final GlobalKey<NavigatorState> navigatorKey;

  @override
  Widget build(BuildContext context) {
    final themeProvider    = context.watch<ThemeProvider>();
    final languageProvider = context.watch<LanguageProvider>();

    return MaterialApp(
      // —————————————————— i18n ——————————————————
      locale: languageProvider.locale,          // ← muda em tempo-real
      localizationsDelegates: const [
        AppLocalizations.delegate,              // l10n gerado
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: languageProvider.supportedLocales,

      // —————————————————— Infra ——————————————————
      navigatorKey: navigatorKey,
      navigatorObservers: [routeObserver],
      debugShowCheckedModeBanner: false,
      title: 'Teologia FATEAL',

      // —————————————————— Temas ——————————————————
      theme:  LightTheme.data,
      darkTheme: DarkTheme.data,
      themeMode: themeProvider.themeMode,       // system / light / dark

      // —————————————————— Rotas ——————————————————
      onGenerateRoute: _onGenerateRoute,        // dinâmica + parâmetro
      onUnknownRoute : (_) => _fade(const NotFoundPage()),

      // —————————————————— Responsividade global ——————————————————
      builder: (context, child) {
        final mq = MediaQuery.of(context);
        return MediaQuery(
          data: mq.copyWith(textScaleFactor: mq.textScaleFactor.clamp(0.8, 1.2)),
          child: child ?? const SizedBox.shrink(),
        );
      },
    );
  }

  /// Rotas nomeadas, mas com suporte a parâmetros via settings.arguments.
  Route<dynamic> _onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case '/':
        return _fade(const LoginPage());
      case '/home':
        return _fade(const HomePage());
      case '/alunos':
        return _fade(const AlunosPage());
      case '/mensalidades':
        return _fade(const MensalidadesPage());
      case '/notificacoes':
        return _fade(const NotificacoesPage());
      case '/qr_code':
        return _fade(const QRCodeScannerPage());
      /* Exemplos com parâmetro:
      case '/aluno':
        final id = settings.arguments as int?;
        return _fade(AlunoDetalhePage(id: id));
      */
      default:
        return _fade(const NotFoundPage());
    }
  }

  /// Helper de transição “fade”.
  PageRouteBuilder _fade(Widget child) => PageRouteBuilder(
        pageBuilder: (_, __, ___) => child,
        transitionsBuilder: (_, anim, __, page) =>
            FadeTransition(opacity: anim, child: page),
        transitionDuration: const Duration(milliseconds: 200),
      );
}