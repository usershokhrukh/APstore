"use client";

import {api} from "@/utils/api";
import {useQuery} from "@tanstack/react-query";
export const UseGetHealth = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await api.get("/api/v1/auth/sessions");
      return res.data;
    },
    retry: (failureCount, error) => {
      if (error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
