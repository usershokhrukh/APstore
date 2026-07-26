"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
const { default: axios } = require("axios")

const request = async (data) => {
  const api = process.env.NEXT_PUBLIC_API_KEY;  
  const res = await axios.post(`${api}/api/v1/auth/login`, data)
  return res;
}

export const PostLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: request,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["login"]})
    }
  })
}