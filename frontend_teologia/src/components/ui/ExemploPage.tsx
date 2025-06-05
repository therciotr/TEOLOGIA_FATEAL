
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';

/**
 * Página de exemplo que mostra o uso dos componentes padronizados
 */
const ExemploPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado do modal
  const [inputValue, setInputValue] = useState(''); // Estado do input

  return (
    <div className="p-8 space-y-4">
      {/* Card para agrupar o conteúdo */}
      <Card>
        <h1 className="text-lg font-semibold mb-2">Exemplo de uso</h1>
        {/* Input controlado */}
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite algo..."
        />
        {/* Botão para abrir o modal */}
        <Button onClick={() => setIsModalOpen(true)}>Abrir Modal</Button>
      </Card>

      {/* Modal que usa o estado para abrir/fechar */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modal de Exemplo"
      >
        <p>Conteúdo do modal! Valor atual do input: {inputValue}</p>
      </Modal>
    </div>
  );
};

export default ExemploPage;
