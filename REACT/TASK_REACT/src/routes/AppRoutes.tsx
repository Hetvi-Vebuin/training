import { Outlet, Route, Routes } from "react-router";
import NoMatch from "../components/pages/NoMatch";
import PrivateRoute from "./PrivateRoute";
import { LoginPage } from "../components/pages/LoginPage";
import GetDetailsPage from "../components/pages/GetDetailsPage";
import { RegisterPage } from "../components/pages/RegisterPage";
import DashboardPage from "../components/pages/DashboardPage";
import ProfilePage from "../components/pages/ProfilePage";
import Navbar from "../components/organisms/NavBar";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route path="/" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="get-details" element={<GetDetailsPage />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
