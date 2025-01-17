import env from "@/config/env.config";
import axios from "axios";

const instance = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      try {
        await axios.get(`${env.VITE_API_URL}/auth/refresh`, { withCredentials: true });
        return instance.request(error.config);
      } catch {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
