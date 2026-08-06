import {api} from "@/utils/api";
import {useQuery} from "@tanstack/react-query";

const fetchUserData = async (payload) => {
  console.log(payload);
  
  const res = await api.get(`api/v1/users${payload}`)
  return res?.data;
}

export const useGetUsers = (payload) => {  
  return useQuery({
    queryKey: ["users", payload],
    queryFn: () => fetchUserData(payload),
    retry: (failureCount, error) => {
      if (error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    enabled:  typeof payload === 'string' && payload.length > 0,
  });
};
