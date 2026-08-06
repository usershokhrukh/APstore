import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";
export function useGetProducts(page = 1) {
  return useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const res = await api.get(`/api/v1/products${page}`);
      return res.data || [];
    },
  });
}
export function useGetSingleProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await api.get(`/api/v1/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}
export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newProductData) => {
      const res = await api.post("/api/v1/products", newProductData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }) => { 
      const res = await api.put(`/api/v1/products/${id}`, data);
      return res.data;
    },
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
    },
  });
}
export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/api/v1/categories"); 
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
