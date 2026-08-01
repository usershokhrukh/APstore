// hooks/useProducts.js
import {useQuery} from "@tanstack/react-query";
import {api} from "@/utils/api";
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
