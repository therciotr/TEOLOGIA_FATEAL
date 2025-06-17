-- ====================================================================
--  SEEDS – Teologia FATEAL  (v2 – compatível com schema atualizado)
-- ====================================================================

/***********************************************************************
 * 1. USUÁRIOS
 ***********************************************************************/
INSERT INTO Usuario (id, nome, email, senha, perfil)
VALUES
  (UUID(), 'Admin',      'admin@teologia.com',     'admin123', 'admin'),
  (UUID(), 'Professor',  'prof@teologia.com',      'prof123',  'professor');

/***********************************************************************
 * 2. PLANOS
 ***********************************************************************/
INSERT INTO Plano (id, nome, valor)
VALUES
  (UUID(), 'Plano Básico',    80.00),
  (UUID(), 'Plano Avançado', 230.00);

/***********************************************************************
 * 3. TURMAS
 ***********************************************************************/
INSERT INTO Turma (id, nome, planoId)
VALUES
  (UUID(), 'Turma A', (SELECT id FROM Plano WHERE nome = 'Plano Básico'    LIMIT 1)),
  (UUID(), 'Turma B', (SELECT id FROM Plano WHERE nome = 'Plano Avançado' LIMIT 1));

/***********************************************************************
 * 4. RESPONSÁVEL
 ***********************************************************************/
INSERT INTO Responsavel (id, nome, email, cpf, telefone)
VALUES
  (UUID(), 'Carlos Lima', 'carlos@responsavel.com', '111.222.333-44', '81988885555');

/***********************************************************************
 * 5. ALUNOS
 ***********************************************************************/
INSERT INTO Aluno (id, nome, email, cpf, telefone, dataNascimento, endereco, rg, fotoUrl, turmaId, matriculaPaga)
VALUES
  -- João (não pagou matrícula)
  (UUID(), 'João da Silva',  'joao@teologia.com',  '123.456.789-00',
   '81988887777', '1990-05-10', 'Rua A, 123', '12345678',
   'uploads/fotos/foto_joao.jpg',
   (SELECT id FROM Turma WHERE nome = 'Turma A' LIMIT 1), FALSE),

  -- Maria (pagou matrícula)
  (UUID(), 'Maria de Souza', 'maria@teologia.com', '987.654.321-00',
   '81999996666', '1995-03-20', 'Rua B, 456', '87654321',
   'uploads/fotos/foto_maria.jpg',
   (SELECT id FROM Turma WHERE nome = 'Turma B' LIMIT 1), TRUE);

/***********************************************************************
 * 6. RELAÇÃO ALUNO × RESPONSÁVEL
 ***********************************************************************/
INSERT INTO AlunoResponsavel (id, alunoId, responsavelId, parentesco)
VALUES
  (UUID(),
   (SELECT id FROM Aluno WHERE nome = 'João da Silva'  LIMIT 1),
   (SELECT id FROM Responsavel WHERE nome = 'Carlos Lima' LIMIT 1),
   'Pai');

/***********************************************************************
 * 7. MENSALIDADES
 ***********************************************************************/
-- João (pendente)
INSERT INTO Mensalidade (id, alunoId, valor, vencimento, status)
VALUES
  (UUID(),
   (SELECT id FROM Aluno WHERE nome = 'João da Silva' LIMIT 1),
   100.00, '2025-06-10', 'pendente');

-- Maria (paga)
INSERT INTO Mensalidade (id, alunoId, valor, vencimento, status)
VALUES
  (UUID(),
   (SELECT id FROM Aluno WHERE nome = 'Maria de Souza' LIMIT 1),
   150.00, '2025-06-15', 'pago');

/***********************************************************************
 * 8. PAGAMENTO de Maria
 ***********************************************************************/
INSERT INTO Pagamento (id, mensalidadeId, data_pagamento, valor_pago, metodo)
VALUES
  (UUID(),
   (SELECT id FROM Mensalidade WHERE status = 'pago' AND alunoId = (SELECT id FROM Aluno WHERE nome = 'Maria de Souza') LIMIT 1),
   NOW(), 150.00, 'PIX');

/***********************************************************************
 * 9. HISTÓRICO de Pagamento (auditoria)
 ***********************************************************************/
INSERT INTO HistoricoPagamento (id, pagamentoId, alteracao, usuarioId)
VALUES
  (UUID(),
   (SELECT id FROM Pagamento   WHERE valor_pago = 150.00 LIMIT 1),
   'Pagamento criado via seed',
   (SELECT id FROM Usuario WHERE email = 'admin@teologia.com' LIMIT 1));

/***********************************************************************
 * 10. DOCUMENTOS
 ***********************************************************************/
-- João
INSERT INTO Documento (id, nome, url, alunoId)
VALUES
  (UUID(), 'Certidão de Nascimento', 'uploads/documentos/certidao_joao.pdf',
          (SELECT id FROM Aluno WHERE nome = 'João da Silva'  LIMIT 1)),
  (UUID(), 'RG',                      'uploads/documentos/rg_joao.pdf',
          (SELECT id FROM Aluno WHERE nome = 'João da Silva'  LIMIT 1));

-- Maria
INSERT INTO Documento (id, nome, url, alunoId)
VALUES
  (UUID(), 'Certidão de Nascimento', 'uploads/documentos/certidao_maria.pdf',
          (SELECT id FROM Aluno WHERE nome = 'Maria de Souza' LIMIT 1)),
  (UUID(), 'RG',                      'uploads/documentos/rg_maria.pdf',
          (SELECT id FROM Aluno WHERE nome = 'Maria de Souza' LIMIT 1));

/***********************************************************************
 * 11. NOTIFICAÇÕES
 ***********************************************************************/
INSERT INTO Notificacao (id, titulo, mensagem, alunoId)
VALUES
  (UUID(), 'Boas-vindas!', 'Sua conta foi criada com sucesso.',
          (SELECT id FROM Aluno WHERE nome = 'João da Silva' LIMIT 1)),
  (UUID(), 'Pagamento confirmado', 'Recebemos o seu pagamento. Obrigado!',
          (SELECT id FROM Aluno WHERE nome = 'Maria de Souza' LIMIT 1));

/***********************************************************************
 * 12. LOG de Acesso
 ***********************************************************************/
INSERT INTO LogAcesso (id, acao, ip, usuarioId)
VALUES
  (UUID(), 'Login seed', '127.0.0.1',
          (SELECT id FROM Usuario WHERE email = 'admin@teologia.com' LIMIT 1));

-- ====================================================================
--  SEED concluído — banco populado com todos os modelos do schema
-- ====================================================================