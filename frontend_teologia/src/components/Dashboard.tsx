// src/components/Dashboard.tsx

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * Dados estáticos para o gráfico de mensalidades.
 * No futuro, esses dados podem ser carregados dinamicamente de uma API.
 */
const data = [
  { name: "Jan", valor: 30 },
  { name: "Fev", valor: 45 },
  { name: "Mar", valor: 28 },
  { name: "Abr", valor: 60 },
  { name: "Mai", valor: 75 },
];

/**
 * Componente Dashboard.
 * Mostra um resumo visual com um gráfico e ações rápidas.
 */
export default function Dashboard() {
  /**
   * Atualiza o título da aba do navegador ao montar o componente.
   */
  useEffect(() => {
    document.title = "Painel Teologia FATEAL";
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card com gráfico de mensalidades */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Métricas de Mensalidades
          </h2>

          {/* Gráfico de linhas responsivo */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#1D4ED8" // Cor azul do Tailwind
                strokeWidth={3}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Card de Ações Rápidas */}
      <Card>
        <CardContent className="p-4 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Ações Rápidas
            </h3>

            {/* Botões com largura total e espaçamento */}
            <Button className="w-full mb-2">Cadastrar Aluno</Button>
            <Button className="w-full mb-2">Gerar Boleto</Button>
            <Button className="w-full">Visualizar Relatórios</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}