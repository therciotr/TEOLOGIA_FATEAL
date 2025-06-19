// src/hooks/useMensalidades.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Mensalidade } from "@/types/Mensalidade";

export const useMensalidades = () =>
  useQuery({
    queryKey: ["mensalidades"],
    queryFn: async () => {
      const { data } = await api.get<Mensalidade[]>("/mensalidades");
      return data;
    },
  });

export const useCreateMensalidade = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Mensalidade>) =>
      api.post<Mensalidade>("/mensalidades", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mensalidades"] });
    },
  });
};