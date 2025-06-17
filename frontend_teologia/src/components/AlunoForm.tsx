import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Aluno } from "@/types/Aluno";

interface AlunoFormProps {
  aluno?: Aluno;
  onSave: (formData: FormData) => void;
  onCancel?: () => void;
}

const AlunoForm: React.FC<AlunoFormProps> = ({ aluno, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: aluno?.nome || "",
    email: aluno?.email || "",
    telefone: aluno?.telefone || "",
    endereco: aluno?.endereco || "",
    rg: aluno?.rg || "",
    turmaId: aluno?.turmaId || "",
    matriculaPaga: aluno?.matriculaPaga || false,
  });

  const [foto, setFoto] = useState<File | null>(null);
  const [documentos, setDocumentos] = useState<FileList | null>(null);
  const [previewFoto, setPreviewFoto] = useState<string | null>(aluno?.fotoUrl || null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

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

  const handleDocumentosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentos(e.target.files);
  };

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
      className="space-y-4 bg-white dark:bg-slate-800 rounded p-4 shadow"
    >
      {/** Campos principais */}
      {[
        { label: "Nome", name: "nome", type: "text", required: true },
        { label: "Email", name: "email", type: "email", required: true },
        { label: "Telefone", name: "telefone", type: "text" },
        { label: "Endereço", name: "endereco", type: "text" },
        { label: "RG", name: "rg", type: "text" },
        { label: "Turma", name: "turmaId", type: "text" },
      ].map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block font-medium mb-1">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            id={field.name}
            value={(formData as any)[field.name]}
            onChange={handleChange}
            required={field.required}
            className="border rounded px-3 py-2 w-full dark:bg-slate-700 dark:text-white"
          />
        </div>
      ))}

      {/** Matrícula paga */}
      <div>
        <label htmlFor="matriculaPaga" className="block font-medium mb-1">
          Matrícula Paga
        </label>
        <input
          type="checkbox"
          name="matriculaPaga"
          id="matriculaPaga"
          checked={formData.matriculaPaga}
          onChange={handleChange}
          className="mr-2"
        />
        <span>{formData.matriculaPaga ? "Sim" : "Não"}</span>
      </div>

      {/** Foto do aluno */}
      <div>
        <label className="block font-medium mb-1">Foto 3x4</label>
        {previewFoto && (
          <img
            src={previewFoto}
            alt="Foto do aluno"
            className="w-24 h-24 rounded mb-2 object-cover border"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFotoChange}
          className="border rounded px-3 py-2 w-full dark:bg-slate-700"
        />
      </div>

      {/** Documentos */}
      <div>
        <label className="block font-medium mb-1">Documentos</label>
        <input
          type="file"
          multiple
          onChange={handleDocumentosChange}
          className="border rounded px-3 py-2 w-full dark:bg-slate-700"
        />
      </div>

      {/** Botões */}
      <div className="flex justify-end gap-2 mt-4">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
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