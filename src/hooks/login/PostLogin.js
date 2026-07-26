"use client";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const request = async (data) => {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const res = await axios.post(`${api_key}/api/v1/auth/login`, data);
  const {access_token, refresh_token} = res.data;

  const cookieRes = await axios.post("/api/auth/login", {
    accessToken: access_token,
    refreshToken: refresh_token,
  });

  return res;
};

export const PostLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: request,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["login"]});
    },
  });
};
