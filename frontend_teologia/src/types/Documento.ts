/**
 * Representa um documento anexado a um aluno.
 */
export interface Documento {
  id: string;              // Identificador único do documento
  nome: string;            // Nome legível do documento (ex: RG, CPF, Comprovante de Residência)
  url: string;             // Caminho/URL público do arquivo (ex: uploads/documentos/xxx.pdf)
  tipo?: string;           // Tipo opcional para categorização (ex: "RG", "Comprovante", etc.)
  criadoEm?: string;       // Timestamp de criação (ISO 8601)
  atualizadoEm?: string;   // Timestamp da última atualização (ISO 8601)
}