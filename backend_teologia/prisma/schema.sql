-- =====================================================================
-- BANCO DE DADOS: Teologia FATEAL
-- Estrutura completa, revisada e comentada
-- =====================================================================

-- ---------------------------------------------------------------------
-- Tabela de usuários do sistema
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Usuario (
    id CHAR(36) PRIMARY KEY,                          -- Identificador UUID
    nome VARCHAR(255) NOT NULL,                       -- Nome completo do usuário
    email VARCHAR(255) UNIQUE NOT NULL,               -- E-mail (único)
    senha VARCHAR(255) NOT NULL,                      -- Senha criptografada (hash em produção!)
    perfil VARCHAR(100) NOT NULL,                     -- Perfil (admin, professor, etc.)
    ativo BOOLEAN DEFAULT TRUE                        -- Status: ativo ou inativo
);

-- ---------------------------------------------------------------------
-- Tabela de planos
-- Cada plano pode estar vinculado a uma ou mais turmas
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Plano (
    id CHAR(36) PRIMARY KEY,                          -- Identificador UUID
    nome VARCHAR(255) NOT NULL,                       -- Nome do plano
    valor DECIMAL(10,2) NOT NULL                      -- Valor do plano
);

-- ---------------------------------------------------------------------
-- Tabela de turmas
-- Cada turma pode ter um plano associado (opcional)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Turma (
    id CHAR(36) PRIMARY KEY,                          -- Identificador UUID
    nome VARCHAR(255) NOT NULL,                       -- Nome da turma
    planoId CHAR(36),                                 -- Plano vinculado (opcional)
    FOREIGN KEY (planoId) REFERENCES Plano(id)
        ON DELETE SET NULL                            -- Se o plano for removido, planoId fica NULL
);

-- ---------------------------------------------------------------------
-- Tabela de alunos
-- Inclui status de matrícula (campo novo: matriculaPaga)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Aluno (
    id CHAR(36) PRIMARY KEY,                          -- Identificador UUID
    nome VARCHAR(255) NOT NULL,                       -- Nome completo do aluno
    email VARCHAR(255) UNIQUE NOT NULL,               -- E-mail (único)
    telefone VARCHAR(20),                             -- Telefone (opcional)
    dataNascimento DATE,                              -- Data de nascimento (opcional)
    endereco VARCHAR(255),                            -- Endereço (opcional)
    rg VARCHAR(50),                                   -- Documento de identidade (opcional)
    fotoUrl VARCHAR(255),                             -- URL da foto 3x4 do aluno
    turmaId CHAR(36),                                 -- Turma à qual o aluno pertence (opcional)
    matriculaPaga BOOLEAN DEFAULT FALSE COMMENT 'Indica se o aluno já pagou a matrícula', -- NOVO CAMPO
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,     -- Data de criação
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (turmaId) REFERENCES Turma(id)
        ON DELETE SET NULL                            -- Se a turma for removida, turmaId fica NULL
);

-- ---------------------------------------------------------------------
-- Tabela de mensalidades
-- Cada mensalidade está vinculada a um aluno
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Mensalidade (
    id CHAR(36) PRIMARY KEY,                          -- Identificador UUID
    alunoId CHAR(36) NOT NULL,                        -- Aluno responsável
    valor DECIMAL(10,2) NOT NULL,                     -- Valor da mensalidade
    vencimento DATE NOT NULL,                         -- Data de vencimento
    status VARCHAR(50) DEFAULT 'pendente',            -- Status (paga, pendente, etc.)
    FOREIGN KEY (alunoId) REFERENCES Aluno(id)
        ON DELETE CASCADE                             -- Se o aluno for removido, mensalidades também
);

-- ---------------------------------------------------------------------
-- Tabela de pagamentos
-- Cada pagamento está vinculado a uma mensalidade
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Pagamento (
    id CHAR(36) PRIMARY KEY,                          -- Identificador UUID
    mensalidadeId CHAR(36) NOT NULL,                  -- Mensalidade paga
    data_pagamento DATE NOT NULL,                     -- Data do pagamento
    valor_pago DECIMAL(10,2) NOT NULL,                -- Valor pago
    metodo VARCHAR(100) NOT NULL,                     -- Método (ex: PIX, boleto, etc.)
    FOREIGN KEY (mensalidadeId) REFERENCES Mensalidade(id)
        ON DELETE CASCADE                             -- Se a mensalidade for removida, pagamentos também
);

-- ---------------------------------------------------------------------
-- Tabela de responsáveis
-- Cadastro de responsáveis dos alunos
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Responsavel (
    id CHAR(36) PRIMARY KEY,                          -- Identificador UUID
    nome VARCHAR(255) NOT NULL,                       -- Nome completo
    email VARCHAR(255) UNIQUE NOT NULL,               -- E-mail (único)
    telefone VARCHAR(20)                              -- Telefone de contato (opcional)
);

-- ---------------------------------------------------------------------
-- Tabela de documentos dos alunos
-- Cada aluno pode ter vários documentos anexados
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Documento (
    id CHAR(36) PRIMARY KEY,                          -- Identificador UUID
    nome VARCHAR(255) NOT NULL,                       -- Nome do documento
    url VARCHAR(255) NOT NULL,                        -- URL para visualização/download
    alunoId CHAR(36) NOT NULL,                        -- Aluno associado ao documento
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,     -- Data de criação
    FOREIGN KEY (alunoId) REFERENCES Aluno(id)
        ON DELETE CASCADE                             -- Se o aluno for removido, documentos também
);

-- =====================================================================
-- FIM DO SCRIPT - Banco pronto para produção
-- Inclui: usuários, planos, turmas, alunos (com matrícula), mensalidades, pagamentos, responsáveis e documentos
-- =====================================================================