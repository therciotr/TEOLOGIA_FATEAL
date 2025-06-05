/**
 * Representa um documento anexado a um aluno.
 */
export interface Documento {
  id: string;     // Identificador único
  nome: string;   // Nome do documento
  url: string;    // URL do arquivo (ex: uploads/documentos/xxx.pdf)
}