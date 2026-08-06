// hooks/useProducts.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

export function useGetProducts(page = 1) {
  return useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const res = await api.get(`/api/v1/products?page=${page}`);
      return res.data || [];
    },
  });
}
export function useDeleteProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/api/v1/products/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
