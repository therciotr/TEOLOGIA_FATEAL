// firebase/firebase.module.ts
import {
  Module,
  Global,
  Logger,
  Provider,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';

/* ───────────── Tokens de injeção ───────────── */
export const FIREBASE_APP   = Symbol.for('FIREBASE_APP');
export const FIREBASE_ADMIN = Symbol.for('FIREBASE_ADMIN');
export const FIRESTORE      = Symbol.for('FIRESTORE');

/** Alias string mantido para retro-compatibilidade */
export const FIRESTORE_PROVIDER_STR = 'FIRESTORE_PROVIDER';
/** 👇 Alias exatamente com o nome que o código legado espera */
export const FIRESTORE_PROVIDER     = FIRESTORE_PROVIDER_STR;

/* ───────────── Providers ───────────── */
const firestoreProvider: Provider = {
  provide   : FIRESTORE,
  inject    : [FIREBASE_APP],
  useFactory: (app: admin.app.App) => app.firestore(),
};

const legacyAliasProvider: Provider = {
  provide    : FIRESTORE_PROVIDER,   // mesmo token string de antigamente
  useExisting: FIRESTORE,
};

/* ───────────── Módulo Global ───────────── */
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    /* Firebase App (singleton) */
    {
      provide: FIREBASE_APP,
      inject : [ConfigService],
      useFactory: (config: ConfigService) => {
        const log      = new Logger('FirebaseModule');
        const name     = config.get('FIREBASE_APP_NAME') ?? '[default]';
        const credPath = config.get<string>('GOOGLE_APPLICATION_CREDENTIALS');

        if (!admin.apps.some(app => app?.name === name)) {
          if (credPath?.trim()) {
            log.log(`Inicializando Firebase (${name}) com ${credPath}`);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const svc = require(credPath) as ServiceAccount;
            admin.initializeApp(
              { credential: admin.credential.cert(svc) },
              name,
            );
          } else {
            log.warn('Sem credenciais — usando applicationDefault()');
            admin.initializeApp(
              { credential: admin.credential.applicationDefault() },
              name,
            );
          }
        }

        const emulator = config.get<string>('FIRESTORE_EMULATOR_HOST');
        if (emulator?.trim()) {
          log.warn(`⚠️  Firestore EMULATOR ativo em ${emulator}`);
          process.env.FIRESTORE_EMULATOR_HOST = emulator;
        }

        return admin.app(name);
      },
    },

    /* SDK completo + Firestore + alias compatível */
    { provide: FIREBASE_ADMIN, useValue: admin },
    firestoreProvider,
    legacyAliasProvider,
  ],
  exports: [
    FIREBASE_APP,
    FIREBASE_ADMIN,
    FIRESTORE,
    FIRESTORE_PROVIDER,      // exporta também o nome antigo
    FIRESTORE_PROVIDER_STR,  // e o nome “_STR” (se alguém usar)
  ],
})
export class FirebaseModule implements OnApplicationShutdown {
  onApplicationShutdown() {
    // evita TS18047 usando optional chaining
    admin.apps.forEach(app => app?.delete?.().catch(() => null));
  }
}