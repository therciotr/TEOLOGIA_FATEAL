
-- Seeds: Inserção de dados fictícios

INSERT INTO usuarios (id, nome, email, senha, perfil, ativo)
VALUES (gen_random_uuid(), 'Admin', 'admin@teologia.com', 'admin123', 'Admin', TRUE);
