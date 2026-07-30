// "use client";

// import {api} from "@/utils/api";
// import {useQuery} from "@tanstack/react-query";
// import axios from "axios";

// export const UseGetHealth = () => {
//   return useQuery({
//     queryKey: ["health"],
//     queryFn: async () => {
//       try {
//         const res = await api.get("/api/v1/health");
//         return res;
//       } catch (error) {
//         if (error?.message) {
//           throw new Error(error?.message);
//         }
//         if (axios.isAxiosError(error) && error.response?.data) {
//           throw new Error(error.response.data.message || "Could not resolve!");
//         }
//         throw new Error(error.message || "Something went wrong!");
//       }
//     },
//     retry: (failureCount, error) => {
//       if (error) {
//         // Extracting the data correctly based on standard Axios Error models
//         const backendError = error.response?.data?.error;
//         const status = error.response?.status;
//         const statusText = error.response?.statusText;

//         console.log(backendError, status, statusText);
//         // This will securely log: "Invalid session credentials" 401 "Unauthorized"
//       }
//       const isAuthFailure =
//         error?._isAuthFailure ||
//         error?.response?._isAuthFailure ||
//         error?.response?.status === 401;

//       if (isAuthFailure) {
//         return false; // Safely breaks the loop after 1 attempt
//       }
//       return failureCount < 3;
//     },
//   });
// };


"use client";

import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const UseGetHealth = () => {
  return useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      try {
        const res = await api.get("/api/v1/health");
        return res.data; // Standard practice: return res.data directly
      } catch (error) {
        // 🔑 CRITICAL FIX: Throw the original error object directly.
        // Wrapping it in 'new Error()' destroys the Axios response structure.
        throw error; 
      }
    },
    retry: (failureCount, error) => {
      // 🔑 Now that the real Axios object is preserved, these will extract cleanly:
      const backendError = error.response?.data?.error;
      const status = error.response?.status;
      const statusText = error.response?.statusText;

      // console.log("Retry Hook Logs:", backendError, status, statusText);

      const isAuthFailure =
        error?._isAuthFailure ||
        error?.response?._isAuthFailure ||
        status === 401 ||
        error?.message === "Session expired"; // Catch our memory flag message

      if (isAuthFailure) {
        return false; // Safely breaks the loop instantly on attempt #1
      }
      return failureCount < 3;
    },
  });
};
