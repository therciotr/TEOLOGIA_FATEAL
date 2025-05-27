
# Banco de Dados - Sistema TEOLOGIA AD SÃO BENTO

## 1. Criação das Tabelas

```bash
psql -U seu_usuario -d teologia -f schema.sql
```

## 2. Inserção de Dados Fictícios

```bash
psql -U seu_usuario -d teologia -f seeds.sql
```

**Obs:** Substitua `seu_usuario` e `teologia` conforme sua configuração.
