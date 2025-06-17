// src/services/dashboard.ts
import { api } from "./api";

/* ------------------------------------------------------------------
   Tipagem da estrutura devolvida pelo backend
-------------------------------------------------------------------*/
export interface DashboardDTO {
  totais: {
    alunos: number;
    matriculasPendentes: number;
    mensalidadesPendentes: number;
    pagamentosDoMes: number;
  };
  // Dados para gráfico de linha ou barras
  mensalidadesPorMes: Array<{ mes: string; valor: number }>;
  // Qualquer agregado extra…
}

/* ------------------------------------------------------------------
   Chamada “crua”
-------------------------------------------------------------------*/
export const getDashboardData = () =>
  api.get<DashboardDTO>("/dashboard");

/* ------------------------------------------------------------------
   Helpers de parse / formatação
-------------------------------------------------------------------*/
export async function fetchDashboard() {
  const { data } = await getDashboardData();
  return {
    cards: [
      { label: "Alunos", total: data.totais.alunos },
      { label: "Matrículas pendentes", total: data.totais.matriculasPendentes },
      { label: "Mensalidades pendentes", total: data.totais.mensalidadesPendentes },
      { label: "Pagamentos (30 dias)", total: data.totais.pagamentosDoMes },
    ],
    chart: data.mensalidadesPorMes.map(({ mes, valor }) => ({
      name: mes,
      valor,
    })),
  };
}