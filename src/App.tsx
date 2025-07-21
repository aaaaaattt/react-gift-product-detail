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

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <UserInfoProvider>
            <NavigationBar />
            <Outlet />
          </UserInfoProvider>
        </Layout>
      </ThemeProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
