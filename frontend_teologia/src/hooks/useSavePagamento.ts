import { useMutation, useQueryClient } from '@tanstack/react-query';
import { alunoService } from '@/services/alunoService';
import { useToast } from '@/hooks/useToast'; // shadcn/ui

export const useSaveAluno = (id?: string) => {
  const qc = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (fd: FormData) =>
      id ? alunoService.update(id, fd) : alunoService.create(fd),

    onSuccess: () => {
      toast({ title: 'Sucesso', description: 'Aluno salvo com êxito!' });
      qc.invalidateQueries({ queryKey: ['alunos'] }); // atualiza lista
    },

    onError: (err: any) => {
      toast({
        title: 'Erro',
        description: err.response?.data?.message || 'Falha ao salvar aluno.',
        variant: 'destructive',
      });
    },
  });
};