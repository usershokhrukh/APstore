"use client";

import { api } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get('api/v1/categories');
      return res?.data;
    },
    retry: (failureCount, error) => {
      if (error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  })
}