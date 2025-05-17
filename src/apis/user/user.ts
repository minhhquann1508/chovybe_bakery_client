import axios from "../apiConfig";
import axiosCore from "axios";

const register = async (email: string, password: string) => {
  const res = await axios({
    method: "POST",
    url: "/auth/register",
    data: { email, password },
  });
  return res;
};

const login = async (email: string, password: string) => {
  const res = await axios({
    method: "POST",
    url: "/auth/login",
    data: { email, password },
    withCredentials: true,
  });
  return res;
};

const logout = async () => {
  const res = await axios({
    method: "DELETE",
    url: "/auth/logout",
    withCredentials: true,
  });
  return res;
};

const refreshToken = async () => {
  const res = await axiosCore({
    method: "POST",
    url: "http://localhost:5050/api/auth/refresh-token",
    withCredentials: true,
  });
  return res;
};

export { register, login, logout, refreshToken };
