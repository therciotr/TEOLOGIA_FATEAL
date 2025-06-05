// src/components/AlunoForm.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Aluno } from "@/types/Aluno"; // ✅ Importa a tipagem de Aluno

/**
 * Props esperadas pelo formulário de aluno:
 * - aluno: objeto existente para edição (opcional)
 * - onSave: função que será chamada ao submeter o formulário (com FormData)
 * - onCancel: função chamada ao clicar em "Cancelar" (opcional)
 */
interface AlunoFormProps {
  aluno?: Aluno; // Antes era "any", agora usa a tipagem correta
  onSave: (formData: FormData) => void;
  onCancel?: () => void;
}

/**
 * Formulário de cadastro/edição de aluno.
 * Inclui campos principais (nome, email, telefone, etc), foto 3x4, documentos e status de matrícula.
 */
const AlunoForm: React.FC<AlunoFormProps> = ({ aluno, onSave, onCancel }) => {
  // Estado para armazenar os dados dos campos de texto e matrícula paga
  const [formData, setFormData] = useState({
    nome: aluno?.nome || "",
    email: aluno?.email || "",
    telefone: aluno?.telefone || "",
    endereco: aluno?.endereco || "",
    rg: aluno?.rg || "",
    turmaId: aluno?.turmaId || "",
    matriculaPaga: aluno?.matriculaPaga || false, // Status da matrícula
  });

  // Estado para armazenar a foto (upload)
  const [foto, setFoto] = useState<File | null>(null);

  // Estado para armazenar a lista de documentos enviados
  const [documentos, setDocumentos] = useState<FileList | null>(null);

  // Estado para armazenar a pré-visualização da foto (exibe antes do envio)
  const [previewFoto, setPreviewFoto] = useState<string | null>(aluno?.fotoUrl || null);

  /**
   * Atualiza os campos de texto e o checkbox de matrícula paga.
   * É chamado em todos os inputs de texto ou select.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /**
   * Atualiza o estado da foto ao selecionar novo arquivo.
   * Também gera o preview para exibir a imagem antes do envio.
   */
  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewFoto(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewFoto(null);
    }
  };

  /**
   * Atualiza a lista de documentos ao selecionar novos arquivos.
   */
  const handleDocumentosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentos(e.target.files);
  };

  /**
   * Manipula o envio do formulário.
   * Cria um FormData com todos os campos e arquivos, e chama a função onSave.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value.toString())
    );

    if (foto) data.append("foto", foto);

    if (documentos) {
      Array.from(documentos).forEach((file) =>
        data.append("documentos", file)
      );
    }

    onSave(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white rounded p-4 shadow"
    >
      {/* Campo: Nome */}
      <div>
        <label className="block font-medium mb-1">Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      {/* Campo: Email */}
      <div>
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      {/* Campo: Telefone */}
      <div>
        <label className="block font-medium mb-1">Telefone</label>
        <input
          type="text"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Campo: Endereço */}
      <div>
        <label className="block font-medium mb-1">Endereço</label>
        <input
          type="text"
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Campo: RG */}
      <div>
        <label className="block font-medium mb-1">RG</label>
        <input
          type="text"
          name="rg"
          value={formData.rg}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Campo: Turma */}
      <div>
        <label className="block font-medium mb-1">Turma</label>
        <input
          type="text"
          name="turmaId"
          value={formData.turmaId}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Campo: Matrícula Paga */}
      <div>
        <label className="block font-medium mb-1">Matrícula Paga</label>
        <input
          type="checkbox"
          name="matriculaPaga"
          checked={formData.matriculaPaga}
          onChange={handleChange}
          className="mr-2"
        />
        <span>{formData.matriculaPaga ? "Sim" : "Não"}</span>
      </div>

      {/* Campo: Foto 3x4 */}
      <div>
        <label className="block font-medium mb-1">Foto 3x4</label>
        {previewFoto && (
          <img
            src={previewFoto}
            alt="Foto do aluno"
            className="w-24 h-24 rounded mb-2 object-cover"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFotoChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Campo: Documentos */}
      <div>
        <label className="block font-medium mb-1">Documentos</label>
        <input
          type="file"
          multiple
          onChange={handleDocumentosChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Botões de ação */}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500"
          >
            Cancelar
          </Button>
        )}
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default AlunoForm;