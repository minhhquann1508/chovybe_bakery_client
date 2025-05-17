import type { AxiosResponse } from "axios";
import type { CategoryType } from "../../types/categories";
import axios from "../apiConfig";

export interface CategoryApiType {
  getAllCategories: () => Promise<AxiosResponse>;
  addNewCategory: (data: CategoryType) => Promise<AxiosResponse>;
  deleteCategory: (id: string) => Promise<AxiosResponse>;
}

export const CategoryApi = {} as CategoryApiType;

CategoryApi.getAllCategories = async () => {
  const res = await axios({
    method: "GET",
    url: "/categories",
  });
  return res;
};

CategoryApi.addNewCategory = async (data: CategoryType) => {
  const res = await axios({
    method: "POST",
    url: "/categories",
    data: data,
  });
  return res;
};

CategoryApi.deleteCategory = async (id: string) => {
  const res = await axios({
    method: "PUT",
    url: `/categories/change-status/${id}`,
  });
  return res;
};
