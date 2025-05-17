import axios, { type AxiosRequestHeaders } from "axios";
import type { CustomAxiosError, CustomResponse } from "../types/axios";
import { LOCAL_APP } from "../utils/constant";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "./user/user";

const instance = axios.create({
  baseURL: "http://localhost:5050/api",
});

const getAccessToken = async () => {
  const res = localStorage.getItem(LOCAL_APP.auth);

  if (!res) return "";

  const data = JSON.parse(res);
  const accessToken = data.accessToken;

  try {
    const decode = jwtDecode<{ exp: number }>(accessToken);
    // Kiểm tra xem token đã hết hạn chưa
    const isExpired = decode.exp * 1000 < Date.now();
    if (!isExpired) {
      return accessToken;
    } else {
      const res = await refreshToken();
      const newToken = res.data.data.accessToken;
      if (newToken) {
        localStorage.setItem(
          LOCAL_APP.auth,
          JSON.stringify({ ...data, accessToken: newToken })
        );
        return newToken;
      } else {
        return "";
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return "";
  }
};

instance.interceptors.request.use(
  async function (config) {
    const accessToken = await getAccessToken();
    config.headers = {} as AxiosRequestHeaders;
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
instance.interceptors.response.use(
  function (response: CustomResponse) {
    return response;
  },
  async function (error: CustomAxiosError) {
    return Promise.reject(error);
  }
);

export default instance;

// const fetchRefresh = async () => {
//     const res = await refreshToken();
//     console.log(res.data.data.accessToken);
//   };
