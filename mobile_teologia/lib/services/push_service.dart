import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

class PushService {
  static Future<void> init() async {
    await Firebase.initializeApp();
    FirebaseMessaging messaging = FirebaseMessaging.instance;

    // Solicita permissão
    await messaging.requestPermission();

    // Escuta mensagens em foreground
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      print('Notificação recebida em foreground: ${message.notification?.title}');
      // Aqui pode exibir Snackbar, dialog, etc
    });

    // Escuta mensagens em background já está no main.dart com onBackgroundMessage
  }
}