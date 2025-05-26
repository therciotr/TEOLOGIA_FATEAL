
-- Banco de Dados: teologia_ad_sao_bento

CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(50) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- (Demais tabelas omitidas para resumo)
