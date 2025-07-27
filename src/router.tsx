import Login from "@/components/login/Login";
import Main from "@/components/Main.tsx";
import Order from "@/components/order/Order";
import MyPage from "@/components/MyPage.tsx";
import NotFound from "@/components/NotFound";
import { createBrowserRouter } from "react-router-dom";
import { ROUTE_PATHS } from "./constants/routePath";
import App from "@/App";
import ProtectedRoute from "@/components/ProtectedRoute";
import ThemePage from "@/components/theme/Theme";
import ProductDetailPage from "./components/product/product";

const { MAIN, LOGIN, MYPAGE, ORDER, NOT_FOUND, THEME, PRODUCT } = ROUTE_PATHS;

const router = createBrowserRouter([
  {
    path: MAIN,
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: MYPAGE, element: <MyPage /> },
          { path: ORDER, element: <Order /> },
        ],
      },
      {
        path: THEME,
        element: <ThemePage />,
      },
      {
        path: LOGIN,
        element: <Login />,
      },
      {
        path: NOT_FOUND,
        element: <NotFound />,
      },
      {
        path: PRODUCT,
        element: <ProductDetailPage />,
      },
    ],
  },
]);

export default router;
