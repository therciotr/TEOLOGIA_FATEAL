// Serviços básicos de exemplo para simular requisições à API.
// Em produção, ajuste as URLs conforme o backend real.

export async function getAlunos() {
  // Simulação, troque por chamada real ao backend
  return [
    { id: 1, nome: "João Silva", email: "joao@email.com", turma: "A" },
    { id: 2, nome: "Maria Souza", email: "maria@email.com", turma: "B" }
  ];
}

export async function getMensalidades() {
  // Simulação, troque por chamada real ao backend
  return [
    { id: 1, aluno: "João Silva", valor: 150.0, status: "Pago", vencimento: "2024-07-10" },
    { id: 2, aluno: "Maria Souza", valor: 150.0, status: "Pendente", vencimento: "2024-07-10" }
  ];
}