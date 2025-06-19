// src/pages/ExemploPage.tsx

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';

const ExemploPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Exemplo de Componentes</h1>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite algo..."
          />
        </CardContent>

        <CardFooter>
          <Button onClick={() => setIsModalOpen(true)}>Abrir Modal</Button>
        </CardFooter>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modal de Exemplo"
      >
        <p className="text-slate-700 dark:text-slate-200">
          Conteúdo do modal! Valor atual do input: <strong>{inputValue}</strong>
        </p>
      </Modal>
    </div>
  );
};

export default ExemploPage;