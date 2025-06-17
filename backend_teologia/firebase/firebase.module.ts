// src/firebase/firebase.module.ts
import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

/**
 * 🔐 Caminho para o arquivo de credenciais Firebase
 */
const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!credsPath || !credsPath.trim()) {
  throw new Error(
    'Variável GOOGLE_APPLICATION_CREDENTIALS não definida ou vazia. ' +
    'Configure corretamente no seu .env ou docker-compose.',
  );
}

/**
 * 🔁 Garante inicialização única do Firebase Admin SDK
 * (evita erro "default app already exists" em hot-reload ou testes)
 */
const firebaseApp =
  admin.apps.length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert(require(credsPath) as ServiceAccount),
      })
    : admin.app();

/**
 * 🌍 Módulo Global que expõe o Firestore e o SDK Admin para injeção
 */
@Global()
@Module({
  providers: [
    {
      provide: 'FIRESTORE',
      useValue: firebaseApp.firestore(),
    },
    {
      provide: 'FIREBASE_ADMIN',
      useValue: admin,
    },
    {
      provide: 'FIREBASE_APP_NAME',
      useValue: firebaseApp.name,
    },
  ],
  exports: ['FIRESTORE', 'FIREBASE_ADMIN', 'FIREBASE_APP_NAME'],
})
export class FirebaseModule {}