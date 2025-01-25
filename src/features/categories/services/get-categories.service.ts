import axios from "@/lib/axios";
import { Category } from "@/types/Category";
import { useQuery } from "react-query";

const getCategories = async () => {
  const res = await axios.get("/categories");
  return res.data;
};

export const useCategories = () => {
  return useQuery<Category[]>(["category"], getCategories, {
    staleTime: 15 * 60 * 1000,
  });
};
