import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = () => {
  const isAuthenticated = useAuth();
  const isToken = isAuthenticated.token;
  return isToken ? <Outlet />: <Navigate to="/" replace />;
};

export default PrivateRoute;
