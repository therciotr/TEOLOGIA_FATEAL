-- =====================================================================
-- SEEDS DO BANCO DE DADOS - Projeto Teologia FATEAL
-- Dados de exemplo para inicialização do ambiente de desenvolvimento
-- =====================================================================

-- ---------------------------------------------------------------------
-- Inserir usuários de exemplo
-- NOTA: Senhas estão em texto simples para demonstração.
-- Em produção, devem ser criptografadas (bcrypt, argon2, etc.)
-- ---------------------------------------------------------------------
INSERT INTO Usuario (id, nome, email, senha, perfil, ativo)
VALUES
  (UUID(), 'Admin', 'admin@teologia.com', 'admin123', 'admin', TRUE), -- Usuário administrador
  (UUID(), 'Professor', 'professor@teologia.com', 'prof123', 'professor', TRUE); -- Usuário professor

-- ---------------------------------------------------------------------
-- Inserir planos de estudo
-- Plano Básico: valor ajustado para R$ 80,00
-- Plano Avançado: valor ajustado para R$ 230,00
-- ---------------------------------------------------------------------
INSERT INTO Plano (id, nome, valor)
VALUES
  (UUID(), 'Plano Básico', 80.00),
  (UUID(), 'Plano Avançado', 230.00);

-- ---------------------------------------------------------------------
-- Inserir turmas e associar aos planos
-- Turma A está vinculada ao Plano Básico
-- Turma B está vinculada ao Plano Avançado
-- ---------------------------------------------------------------------
INSERT INTO Turma (id, nome, planoId)
VALUES
  (UUID(), 'Turma A', (SELECT id FROM Plano WHERE nome='Plano Básico' LIMIT 1)),
  (UUID(), 'Turma B', (SELECT id FROM Plano WHERE nome='Plano Avançado' LIMIT 1));

-- ---------------------------------------------------------------------
-- Inserir alunos com informações completas
-- Inclui dados pessoais, turma vinculada, foto 3x4 e status de matrícula
-- ---------------------------------------------------------------------
INSERT INTO Aluno (id, nome, email, telefone, dataNascimento, endereco, rg, fotoUrl, turmaId, matriculaPaga)
VALUES
  -- João ainda não pagou matrícula
  (UUID(), 'João da Silva', 'joao@teologia.com', '81988887777', '1990-05-10', 'Rua A, 123', '12345678', 'uploads/fotos/foto_joao.jpg', (SELECT id FROM Turma WHERE nome='Turma A' LIMIT 1), FALSE),
  -- Maria já pagou matrícula
  (UUID(), 'Maria de Souza', 'maria@teologia.com', '81999996666', '1995-03-20', 'Rua B, 456', '87654321', 'uploads/fotos/foto_maria.jpg', (SELECT id FROM Turma WHERE nome='Turma B' LIMIT 1), TRUE);

-- ---------------------------------------------------------------------
-- Inserir mensalidades vinculadas aos alunos
-- Status "pendente" para João e "paga" para Maria
-- ---------------------------------------------------------------------
INSERT INTO Mensalidade (id, alunoId, valor, vencimento, status)
VALUES
  (UUID(), (SELECT id FROM Aluno WHERE nome='João da Silva' LIMIT 1), 100.00, '2025-06-10', 'pendente'),
  (UUID(), (SELECT id FROM Aluno WHERE nome='Maria de Souza' LIMIT 1), 150.00, '2025-06-15', 'paga');

-- ---------------------------------------------------------------------
-- Inserir pagamento para a mensalidade de Maria
-- ---------------------------------------------------------------------
INSERT INTO Pagamento (id, mensalidadeId, data_pagamento, valor_pago, metodo)
VALUES
  (UUID(), (SELECT id FROM Mensalidade WHERE status='paga' LIMIT 1), '2025-05-29', 150.00, 'pix');

-- ---------------------------------------------------------------------
-- Inserir responsável (exemplo de responsável genérico)
-- ---------------------------------------------------------------------
INSERT INTO Responsavel (id, nome, email, telefone)
VALUES
  (UUID(), 'Carlos Lima', 'carlos@responsavel.com', '81988885555');

-- ---------------------------------------------------------------------
-- Inserir documentos para cada aluno
-- Armazenados na pasta "uploads/documentos/"
-- Cada aluno tem dois documentos de exemplo
-- ---------------------------------------------------------------------
INSERT INTO Documento (id, nome, url, alunoId)
VALUES
  -- Documentos de João da Silva
  (UUID(), 'Certidão de Nascimento', 'uploads/documentos/certidao_joao.pdf', (SELECT id FROM Aluno WHERE nome='João da Silva' LIMIT 1)),
  (UUID(), 'RG', 'uploads/documentos/rg_joao.pdf', (SELECT id FROM Aluno WHERE nome='João da Silva' LIMIT 1)),

  -- Documentos de Maria de Souza
  (UUID(), 'Certidão de Nascimento', 'uploads/documentos/certidao_maria.pdf', (SELECT id FROM Aluno WHERE nome='Maria de Souza' LIMIT 1)),
  (UUID(), 'RG', 'uploads/documentos/rg_maria.pdf', (SELECT id FROM Aluno WHERE nome='Maria de Souza' LIMIT 1));

-- =====================================================================
-- FIM DO SEED
-- Banco populado com:
-- - 2 Usuários (admin e professor)
-- - 2 Planos (Básico e Avançado)
-- - 2 Turmas (A e B)
-- - 2 Alunos com fotos, documentos e status de matrícula
-- - Mensalidades e pagamento de exemplo
-- - 1 Responsável
-- =====================================================================