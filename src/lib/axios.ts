import env from "@/config/env.config";
import axios from "axios";

const instance = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

export default instance;
