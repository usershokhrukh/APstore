import {api} from "@/utils/api";
import {useQuery} from "@tanstack/react-query";

export const UseGetProductsStats = () => {
  return useQuery({
    queryKey: ["products-stats"],
    queryFn: async () => {
      const res = await api.get("/api/v1/products/stats");
      return res?.data;
    },
    retry: (failureCount, error) => {
      if (error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
