
CREATE TABLE usuarios (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    perfil VARCHAR(50),
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE planos (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nome VARCHAR(100) NOT NULL,
    valor DECIMAL(10,2) NOT NULL
);

CREATE TABLE turmas (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nome VARCHAR(100) NOT NULL,
    planoId CHAR(36),
    FOREIGN KEY (planoId) REFERENCES planos(id)
);

CREATE TABLE alunos (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    turma_id CHAR(36),
    FOREIGN KEY (turma_id) REFERENCES turmas(id)
);

CREATE TABLE responsaveis (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20)
);

CREATE TABLE mensalidades (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    alunoId CHAR(36) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    vencimento DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente',
    FOREIGN KEY (alunoId) REFERENCES alunos(id)
);

CREATE TABLE pagamentos (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    mensalidadeId CHAR(36) NOT NULL,
    data_pagamento DATE NOT NULL,
    valor_pago DECIMAL(10,2) NOT NULL,
    metodo VARCHAR(20) NOT NULL,
    FOREIGN KEY (mensalidadeId) REFERENCES mensalidades(id)
);
