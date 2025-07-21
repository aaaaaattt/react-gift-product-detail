import { STORAGE_KEYS } from "@/constants/storageKyes";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routePath";

const ProtectedRoute = () => {
  const userInfo = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);
  const { LOGIN } = ROUTE_PATHS;

  if (!userInfo) {
    return <Navigate to={LOGIN} replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
