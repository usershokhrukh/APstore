import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.magnateshop.uz",
});

api.interceptors.request.use(
  async (config) => {
    if(config?._isPublic) {
      return config
    }
    try {
      const check = await axios.post("/api/auth/refresh");   
      const accessToken = check?.data?.accessToken;

      if(accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`
      }
      
      return config; 
    } catch (err) {
      const cancelSource = axios.CancelToken.source();
      config.cancelToken = cancelSource.token;
      cancelSource.cancel("Unauthorized: Missing or invalid tokens.");
      return config;
    }
  }, 
  (error) => {
    return Promise.reject(error);
  }
);
