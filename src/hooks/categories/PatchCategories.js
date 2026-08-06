import {api} from "@/utils/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const request = async (payload) => {
  try {
    const res = await api.patch(`/api/v1/categories/${payload[0]}`, payload[1]);
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(error.response.data.message || "Could not resolve!");
    }
    throw new Error(error.message || "Something went wrong!");
  }
};

export const usePatchCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: request,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["categories"]});
    },
  });
};
