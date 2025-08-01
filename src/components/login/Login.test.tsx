import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "@/components/login/Login";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserInfoProvider } from "@/context/UserInfoProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme";

vi.mock("@/api/login/auth", () => ({
  login: vi.fn(),
}));

import * as authApi from "@/api/login/auth";

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

  it("유효하지 않은 입력 시 버튼 비활성화", () => {
    const loginButton = screen.getByRole("button", { name: "로그인" });
    expect(loginButton).toBeDisabled();
  });

  it("유효한 입력 시 버튼 활성화", () => {
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("패스워드");
    const loginButton = screen.getByRole("button", { name: "로그인" });

    fireEvent.change(emailInput, { target: { value: "chlgur@example.com" } });
    fireEvent.blur(emailInput);

    fireEvent.change(passwordInput, { target: { value: "00000000" } });
    fireEvent.blur(passwordInput);

    expect(loginButton).toBeEnabled();
  });

  it("로그인 버튼 클릭 시 login API가 호출", async () => {
    const emailInput = screen.getAllByPlaceholderText("이메일")[0];
    const passwordInput = screen.getByPlaceholderText("패스워드");
    const loginButton = screen.getByRole("button", { name: "로그인" });

    fireEvent.change(emailInput, { target: { value: "chlgur@email.com" } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: "12345678" } });
    fireEvent.blur(passwordInput);

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(authApi.login).toHaveBeenCalledWith({
        email: "chlgur@email.com",
        password: "12345678",
      });
    });
  });
});
