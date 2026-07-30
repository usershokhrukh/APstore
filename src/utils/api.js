// import axios from "axios";

// export const api = axios.create({
//   baseURL: "https://api.magnateshop.uz",
// });

// let isRefreshFailed = false;
// let activeRequestsCount = 0;

// api.interceptors.request.use(
//   async (config) => {
//     if (config?._isPublic) {
//       return config;
//     }

//     activeRequestsCount++;
//     if (isRefreshFailed) {
//       decrementRequestCount();

//       const customError = new Error("Session expired");
//       customError._isAuthFailure = true;
//       return Promise.reject(customError);
//     }
//     try {
//       const check = await axios.post("/api/auth/refresh");
//       const accessToken = check?.data?.accessToken;

//       if (accessToken) {
//         config.headers["Authorization"] = `Bearer ${accessToken}`;
//       }

//       return config;
//     } catch (err) {
//       isRefreshFailed = true;

//       err._isAuthFailure = true;
//       if (err.response) {
//         err.response._isAuthFailure = true;
//       }

//       return Promise.reject(err);
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// function decrementRequestCount() {
//   activeRequestsCount--;
//   if (activeRequestsCount <= 0) {
//     activeRequestsCount = 0;
//     isRefreshFailed = false;
//   }
// }


import axios from "axios";

export const api = axios.create({
  baseURL: "https://magnateshop.uz",
});

// 🔑 TIMESTAMP TRACKER: Keeps track of exactly when a refresh failed
let lastRefreshFailureTime = 0;
const COOLDOWN_MS = 2000; // 2 seconds window

api.interceptors.request.use(
  async (config) => {
    if (config?._isPublic) {
      return config;
    }

    const currentTime = Date.now();
    
    // 🔑 SMART COOLDOWN: If a refresh failed less than 2 seconds ago, 
    // catch parallel hooks or immediate TanStack retries and short-circuit them.
    if (currentTime - lastRefreshFailureTime < COOLDOWN_MS) {
      const customError = new Error("Session expired");
      customError._isAuthFailure = true;
      return Promise.reject(customError);
    }

    try {
      const check = await axios.post("/api/auth/refresh");
      const accessToken = check?.data?.accessToken;

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return config;
    } catch (err) {
      // console.log("Refresh token failed:", err?.message);
      
      // 🔑 LOCK IT IN: Save the exact failure time stamp
      lastRefreshFailureTime = Date.now(); 

      err._isAuthFailure = true;
      if (err.response) {
        err.response._isAuthFailure = true;
      }
      
      return Promise.reject(err); 
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);
