import { Route, Routes } from "react-router-dom";
import { AuthPage } from "../pages/user";
import { MainHeader } from "../components";

const MainRouter = () => {
  return (
    <>
      <MainHeader />
      <main className="py-10">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
      <footer>Footer</footer>
    </>
  );
};

export default MainRouter;
