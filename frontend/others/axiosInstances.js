import axios from "axios"
export const axiosInstance=axios.create({
    baseURL:"http://localhost:5000/api",
    withCredentials:true
})
axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
        console.log("this is called")
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        error.response.data?.message?.toLowerCase().includes("unauthorized")
      ) {
        originalRequest._retry = true;
  
        try {
          await axiosInstance.get("/auth//refresh-accessToken");
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );