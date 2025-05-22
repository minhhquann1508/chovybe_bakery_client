import type { AxiosResponse } from "axios";
import axios from "../apiConfig";
import type { SubCategoryType } from "../../types/subCategories";

const url = "/subCategories";

export interface SubCategoryApiType {
  getAll: () => Promise<AxiosResponse>;
  create: (data: SubCategoryType) => Promise<AxiosResponse>;
  update: (id: string, data: SubCategoryType) => Promise<AxiosResponse>;
}

export const SubCategoryApi = {} as SubCategoryApiType;

SubCategoryApi.getAll = async () => {
  const res = await axios({
    method: "GET",
    url,
  });
  return res;
};

SubCategoryApi.create = async (data: SubCategoryType) => {
  const res = await axios({
    method: "POST",
    url,
    data,
  });
  return res;
};

SubCategoryApi.update = async (id: string, data: SubCategoryType) => {
  const res = await axios({
    method: "PUT",
    url: `${url}/${id}`,
    data,
  });
  return res;
};
