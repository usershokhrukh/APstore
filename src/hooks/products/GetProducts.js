// hooks/useProducts.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";
import axios from "axios";

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const api_key = process.env.NEXT_PUBLIC_API_KEY;
      const res = await axios.get(`${api_key}/api/v1/products`);
      return res.data?.items || [];
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
