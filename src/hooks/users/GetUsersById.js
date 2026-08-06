import { api } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export const useGetUsersById = (id) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async ({queryKey}) => {
      const [,id] = queryKey;
      const res = await api.get(`api/v1/users/${id}`);
      return res?.data;
    }
  })
}