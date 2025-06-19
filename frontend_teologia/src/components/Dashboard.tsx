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
import { motion } from "framer-motion";
import { UserPlus, FileText, BarChart2 } from "lucide-react";

const data = [
  { name: "Jan", valor: 30 },
  { name: "Fev", valor: 45 },
  { name: "Mar", valor: 28 },
  { name: "Abr", valor: 60 },
  { name: "Mai", valor: 75 },
];

export default function Dashboard() {
  useEffect(() => {
    document.title = "Painel Teologia FATEAL";
  }, []);

  return (
    <motion.div
      className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card com gráfico de mensalidades */}
      <Card className="col-span-1 md:col-span-2 dark:bg-slate-800">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            Métricas de Mensalidades
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#4f46e5" // Indigo-600
                strokeWidth={3}
              />
              <CartesianGrid stroke="#cbd5e1" strokeDasharray="5 5" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Card com Ações Rápidas */}
      <Card className="dark:bg-slate-800">
        <CardContent className="p-4 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Ações Rápidas
            </h3>
            <Button className="w-full mb-3 flex gap-2 items-center">
              <UserPlus size={16} /> Cadastrar Aluno
            </Button>
            <Button className="w-full mb-3 flex gap-2 items-center" variant="secondary">
              <FileText size={16} /> Gerar Boleto
            </Button>
            <Button className="w-full flex gap-2 items-center" variant="outline">
              <BarChart2 size={16} /> Visualizar Relatórios
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}