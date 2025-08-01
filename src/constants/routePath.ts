export const ROUTE_PATHS = {
  MAIN: "/",
  LOGIN: "/login",
  MYPAGE: "/my",
  ORDER: "/order/:productId",
  THEME: "/theme/:themeId",
  NOT_FOUND: "*",
  PRODUCT: "/product/:productId",
} as const;
