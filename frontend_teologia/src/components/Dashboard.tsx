import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2>Dashboard Financeiro</h2>
      {/* Aqui você pode adicionar gráficos com chart.js ou recharts */}
      <p>Bem-vindo ao painel administrativo Teologia FATEAL.</p>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div className="card">Total de alunos: 200</div>
        <div className="card">Mensalidades em aberto: 15</div>
        <div className="card">Valor a receber: R$ 2.500,00</div>
      </div>
    </div>
  );
};

export default Dashboard;