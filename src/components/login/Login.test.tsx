import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "@/components/login/Login";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { UserInfoProvider } from "@/context/UserInfoProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 테스트 중에는 재시도 끔
      },
    },
  });

describe("Login 컴포넌트 테스트", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={createTestQueryClient()}>
            <UserInfoProvider>
              <Login />
            </UserInfoProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </MemoryRouter>
    );
  });

  it("이메일 필드 렌더링", () => {
    const emailInput = screen.getByPlaceholderText("이메일");
    expect(emailInput).toBeInTheDocument();
  });
  it("이메일 필드 style", () => {
    const emailInput = screen.getByPlaceholderText("이메일");
    expect(emailInput).toHaveStyle("border : none");
  });
  it("패스워드 필드 렌더링", () => {
    const passwordInput = screen.getByPlaceholderText("패스워드");
    expect(passwordInput).toBeInTheDocument();
  });
  it("패스워드 필드 style", () => {
    const emailInput = screen.getByPlaceholderText("패스워드");
    expect(emailInput).toHaveStyle("outline: none");
  });
  it("로그인 버튼 텍스트 렌더링", () => {
    const loginText = screen.getByRole("button", { name: "로그인" });
    expect(loginText).toBeInTheDocument();
  });
  it("로그인 버튼 텍스트 렌더링", () => {
    const loginText = screen.getByRole("button", { name: "로그인" });
    expect(loginText).toHaveStyle("align-items: center");
  });
});
