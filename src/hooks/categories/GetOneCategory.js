import { api } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export const useGetOneCategory = (id) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: async ({queryKey}) => {
      const [, id] = queryKey;
      const res = await api.get(`/api/v1/categories/${id}`);
      return res?.data;
    }
  })
}