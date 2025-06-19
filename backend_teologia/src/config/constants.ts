// src/config/constants.ts

/**
 * 🔒 Constantes globais utilizadas no projeto Teologia FATEAL
 */

/* ───────────────────── FIREBASE ───────────────────── */
export const FIRESTORE_PROVIDER = 'FIRESTORE_PROVIDER'; // Token de injeção
export const FIRESTORE_ALUNOS_COLLECTION = 'alunos';    // Nome da coleção de alunos
export const FIRESTORE_MENSALIDADES_COLLECTION = 'mensalidades'; // 🔄 Adicionado
export const FIRESTORE_BATCH_LIMIT = 500;               // 🔄 Adicionado: Limite padrão de operações em lote

/* ───────────────────── AMBIENTE ───────────────────── */
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL || '',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL || '',
  FIREBASE_PRIVATE_KEY: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS || '',
};

/* ───────────────────── GLOBAL CONFIG ───────────────────── */
export const GLOBAL_CONFIG = {
  API_PREFIX: 'api',
  API_VERSION: 'v1',
  APP_NAME: 'Teologia FATEAL',
};

/* ───────────────────── UPLOADS ───────────────────── */
export const UPLOAD_DIR_BASE = 'uploads';                      // Pasta raiz dos uploads
export const DOCUMENTOS_UPLOAD_DIR = 'uploads/documentos';     // Pasta específica para documentos do aluno
export const FOTOS_UPLOAD_DIR = 'uploads/fotos';               // 🔄 Adicionado: fotos 3x4
export const MAX_UPLOAD_SIZE_MB = 10;                          // 🔄 Adicionado: tamanho máximo por arquivo

/* ───────────────────── MENSALIDADES / PAGAMENTOS ───────────────────── */
export const PAGAMENTO_TIMEOUT_MINUTES = 15;                   // 🔄 Adicionado: tempo limite para pagamento pendente
export const MENSALIDADE_VENCIMENTO_PADRAO = 10;               // 🔄 Adicionado: dia padrão de vencimento (ex: dia 10)