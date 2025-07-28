import "@/App.css";
import "@/components/Main";
import { theme } from "@/styles/theme.ts";
import { ThemeProvider } from "@emotion/react";
import NavigationBar from "@/components/NavigationBar";
import Layout from "@/styles/Layout.tsx";
import { UserInfoProvider } from "@/context/UserInfoProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "@/common/ErrorBoundary";
import { Suspense } from "react";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <UserInfoProvider>
            <NavigationBar />
            <QueryClientProvider client={queryClient}>
              <ErrorBoundary>
                <Suspense fallback={<div>로딩중...</div>}>
                  <Outlet />
                </Suspense>
              </ErrorBoundary>
            </QueryClientProvider>
          </UserInfoProvider>
        </Layout>
      </ThemeProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
