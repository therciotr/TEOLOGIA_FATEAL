"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MENSALIDADE_VENCIMENTO_PADRAO = exports.PAGAMENTO_TIMEOUT_MINUTES = exports.MAX_UPLOAD_SIZE_MB = exports.FOTOS_UPLOAD_DIR = exports.DOCUMENTOS_UPLOAD_DIR = exports.UPLOAD_DIR_BASE = exports.GLOBAL_CONFIG = exports.ENV = exports.FIRESTORE_BATCH_LIMIT = exports.FIRESTORE_MENSALIDADES_COLLECTION = exports.FIRESTORE_ALUNOS_COLLECTION = exports.FIRESTORE_PROVIDER = void 0;
exports.FIRESTORE_PROVIDER = 'FIRESTORE_PROVIDER';
exports.FIRESTORE_ALUNOS_COLLECTION = 'alunos';
exports.FIRESTORE_MENSALIDADES_COLLECTION = 'mensalidades';
exports.FIRESTORE_BATCH_LIMIT = 500;
exports.ENV = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '3000', 10),
    DATABASE_URL: process.env.DATABASE_URL || '',
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL || '',
    FIREBASE_PRIVATE_KEY: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS || '',
};
exports.GLOBAL_CONFIG = {
    API_PREFIX: 'api',
    API_VERSION: 'v1',
    APP_NAME: 'Teologia FATEAL',
};
exports.UPLOAD_DIR_BASE = 'uploads';
exports.DOCUMENTOS_UPLOAD_DIR = 'uploads/documentos';
exports.FOTOS_UPLOAD_DIR = 'uploads/fotos';
exports.MAX_UPLOAD_SIZE_MB = 10;
exports.PAGAMENTO_TIMEOUT_MINUTES = 15;
exports.MENSALIDADE_VENCIMENTO_PADRAO = 10;
