/* =======================================================================
   BANCO: Teologia FATEAL – Estrutura completa (v2)
   Última revisão: 2025-06-16
   ======================================================================= */

/* =============================== USUÁRIOS ============================== */
CREATE TABLE IF NOT EXISTS Usuario (
  id         CHAR(36)      PRIMARY KEY,              -- UUID
  nome       VARCHAR(255)  NOT NULL,
  email      VARCHAR(255)  NOT NULL UNIQUE,
  senha      VARCHAR(255)  NOT NULL,                 -- HASH!
  perfil     VARCHAR(100)  NOT NULL,                 -- admin, professor…
  ativo      BOOLEAN       DEFAULT TRUE,
  criadoEm   DATETIME      DEFAULT CURRENT_TIMESTAMP,
  atualizadoEm DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

/* =============================== PLANOS ================================ */
CREATE TABLE IF NOT EXISTS Plano (
  id     CHAR(36)     PRIMARY KEY,
  nome   VARCHAR(255) NOT NULL,
  valor  DECIMAL(10,2)NOT NULL
);

/* =============================== TURMAS =============================== */
CREATE TABLE IF NOT EXISTS Turma (
  id       CHAR(36)     PRIMARY KEY,
  nome     VARCHAR(255) NOT NULL,
  planoId  CHAR(36),
  FOREIGN KEY (planoId) REFERENCES Plano(id)
      ON DELETE SET NULL
);

/* =============================== ALUNOS =============================== */
CREATE TABLE IF NOT EXISTS Aluno (
  id             CHAR(36)     PRIMARY KEY,
  nome           VARCHAR(255) NOT NULL,
  email          VARCHAR(255) NOT NULL UNIQUE,
  telefone       VARCHAR(20),
  cpf            VARCHAR(14),                           -- NOVO
  dataNascimento DATE,
  endereco       VARCHAR(255),
  rg             VARCHAR(50),
  fotoUrl        VARCHAR(255),
  turmaId        CHAR(36),
  matriculaPaga  BOOLEAN      DEFAULT FALSE,
  criadoEm       DATETIME     DEFAULT CURRENT_TIMESTAMP,
  atualizadoEm   DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (turmaId) REFERENCES Turma(id)
      ON DELETE SET NULL
);

/* ===================== RESPONSÁVEIS E RELAÇÃO ========================= */
CREATE TABLE IF NOT EXISTS Responsavel (
  id       CHAR(36)     PRIMARY KEY,
  nome     VARCHAR(255) NOT NULL,
  email    VARCHAR(255) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  cpf      VARCHAR(14)                           -- NOVO
);

CREATE TABLE IF NOT EXISTS AlunoResponsavel (
  id             CHAR(36) PRIMARY KEY,
  alunoId        CHAR(36) NOT NULL,
  responsavelId  CHAR(36) NOT NULL,
  parentesco     VARCHAR(100),                   -- Pai, Mãe, Tio…
  FOREIGN KEY (alunoId)       REFERENCES Aluno(id)       ON DELETE CASCADE,
  FOREIGN KEY (responsavelId) REFERENCES Responsavel(id) ON DELETE CASCADE
);

/* ============================ MENSALIDADES ============================ */
CREATE TABLE IF NOT EXISTS Mensalidade (
  id         CHAR(36)      PRIMARY KEY,
  alunoId    CHAR(36)      NOT NULL,
  valor      DECIMAL(10,2) NOT NULL,
  vencimento DATE          NOT NULL,
  status     VARCHAR(50)   DEFAULT 'pendente',  -- pago, pendente, atrasado
  FOREIGN KEY (alunoId) REFERENCES Aluno(id) ON DELETE CASCADE
);

/* ============================ PAGAMENTOS ============================== */
CREATE TABLE IF NOT EXISTS Pagamento (
  id             CHAR(36)      PRIMARY KEY,
  mensalidadeId  CHAR(36)      NOT NULL,
  data_pagamento DATE          NOT NULL,
  valor_pago     DECIMAL(10,2) NOT NULL,
  metodo         VARCHAR(100)  NOT NULL,        -- PIX, Boleto…
  FOREIGN KEY (mensalidadeId) REFERENCES Mensalidade(id) ON DELETE CASCADE
);

/* ======== HISTÓRICO DE ALTERAÇÕES DE PAGAMENTO (AUDITORIA) =========== */
CREATE TABLE IF NOT EXISTS HistoricoPagamento (
  id              CHAR(36) PRIMARY KEY,
  pagamentoId     CHAR(36) NOT NULL,
  alteracao       TEXT     NOT NULL,
  usuarioId       CHAR(36),
  dataAlteracao   DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pagamentoId) REFERENCES Pagamento(id) ON DELETE CASCADE,
  FOREIGN KEY (usuarioId)   REFERENCES Usuario(id)
);

/* ============================ NOTIFICAÇÕES =========================== */
CREATE TABLE IF NOT EXISTS Notificacao (
  id        CHAR(36)     PRIMARY KEY,
  titulo    VARCHAR(255) NOT NULL,
  mensagem  TEXT         NOT NULL,
  dataEnvio DATETIME     DEFAULT CURRENT_TIMESTAMP,
  lido      BOOLEAN      DEFAULT FALSE,
  alunoId   CHAR(36),
  FOREIGN KEY (alunoId) REFERENCES Aluno(id) ON DELETE CASCADE
);

/* ============================== DOCUMENTOS =========================== */
CREATE TABLE IF NOT EXISTS Documento (
  id        CHAR(36)     PRIMARY KEY,
  nome      VARCHAR(255) NOT NULL,
  url       VARCHAR(255) NOT NULL,
  alunoId   CHAR(36)     NOT NULL,
  criadoEm  DATETIME     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (alunoId) REFERENCES Aluno(id) ON DELETE CASCADE
);

/* ============================= LOGS DE ACESSO ======================== */
CREATE TABLE IF NOT EXISTS LogAcesso (
  id        CHAR(36)     PRIMARY KEY,
  usuarioId CHAR(36),
  acao      VARCHAR(255),
  ip        VARCHAR(50),
  data      DATETIME     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuarioId) REFERENCES Usuario(id)
);

/* =============================== ÍNDICES ============================= */
/* Melhora performance em buscas frequentes. */
CREATE INDEX IF NOT EXISTS idx_aluno_email        ON Aluno(email);
CREATE INDEX IF NOT EXISTS idx_mensalidade_status ON Mensalidade(status);
CREATE INDEX IF NOT EXISTS idx_notificacao_lido   ON Notificacao(lido);
CREATE INDEX IF NOT EXISTS idx_pagamento_metodo   ON Pagamento(metodo);

/* =====================================================================
   FIM DO SCRIPT
   ===================================================================== */