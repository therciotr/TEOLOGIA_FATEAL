
INSERT INTO usuarios (id, nome, email, senha, perfil, ativo)
VALUES (UUID(), 'Admin', 'admin@fateal.com.br', 'admin123', 'ADMIN', TRUE);

INSERT INTO planos (id, nome, valor)
VALUES 
    (UUID(), 'Plano Básico', 150.00),
    (UUID(), 'Plano Avançado', 300.00);

INSERT INTO turmas (id, nome, planoId)
SELECT UUID(), 'Turma A', id FROM planos WHERE nome = 'Plano Básico';

INSERT INTO turmas (id, nome, planoId)
SELECT UUID(), 'Turma B', id FROM planos WHERE nome = 'Plano Avançado';

INSERT INTO alunos (id, nome, email, telefone, turma_id)
SELECT UUID(), 'João Silva', 'joao@fateal.com.br', '11999999999', id FROM turmas WHERE nome = 'Turma A';

INSERT INTO alunos (id, nome, email, telefone, turma_id)
SELECT UUID(), 'Maria Santos', 'maria@fateal.com.br', '11888888888', id FROM turmas WHERE nome = 'Turma B';

INSERT INTO responsaveis (id, nome, email, telefone)
VALUES 
    (UUID(), 'Carlos Silva', 'carlos@fateal.com.br', '11777777777'),
    (UUID(), 'Ana Santos', 'ana@fateal.com.br', '11666666666');

INSERT INTO mensalidades (id, alunoId, valor, vencimento, status)
SELECT UUID(), id, 150.00, DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'pendente' FROM alunos WHERE nome = 'João Silva';

INSERT INTO mensalidades (id, alunoId, valor, vencimento, status)
SELECT UUID(), id, 300.00, DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'pendente' FROM alunos WHERE nome = 'Maria Santos';

INSERT INTO pagamentos (id, mensalidadeId, data_pagamento, valor_pago, metodo)
SELECT UUID(), id, CURDATE(), 150.00, 'Pix' FROM mensalidades WHERE valor = 150.00;
