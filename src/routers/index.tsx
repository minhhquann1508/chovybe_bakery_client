import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
import AdminRouter from "./AdminRouter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOCAL_APP } from "../utils/constant";
import { addAuth } from "../redux/features/auth/authSlice";
import type { RootState } from "../redux/store";

const Router = () => {
  const dispatch = useDispatch();
  const { token, role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Kiểm tra xem đã có đăng nhập chưa
    getAuthData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAuthData = () => {
    const response = localStorage.getItem(LOCAL_APP.auth);
    if (response) {
      dispatch(addAuth(JSON.parse(response)));
    }
  };

  const checkRouter = () => {
    if (token && role === "admin") {
      return <AdminRouter />;
    } else {
      return <MainRouter />;
    }
  };
  return <BrowserRouter>{checkRouter()}</BrowserRouter>;
};

export default Router;
