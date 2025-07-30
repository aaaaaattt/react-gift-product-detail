import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserInfoProvider } from "@/context/UserInfoProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme";
import Order from "./Order";
import { getProductsSummary } from "@/api/order/order";

vi.mock("@/api/order/order");

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const setup = () => {
  render(
    <MemoryRouter initialEntries={["/order/123"]}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={createTestQueryClient()}>
          <UserInfoProvider>
            <Suspense fallback={<div>로딩 중...</div>}>
              <Routes>
                <Route path="/order/:productId" element={<Order />} />
              </Routes>
            </Suspense>
          </UserInfoProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe("Order 컴포넌트 테스트", () => {
  // 👇 beforeEach 블록을 추가합니다.
  beforeEach(() => {
    // 이 describe 블록의 모든 테스트가 실행되기 전에
    // 항상 성공적인 API 응답을 모의 처리합니다.
    const mockProductData = {
      name: "테스트 상품",
      brandName: "테스트 브랜드",
      price: 10000,
      imageURL: "test-image.jpg",
    };
    const mockAxiosResponse = {
      data: { data: mockProductData },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    };
    vi.mocked(getProductsSummary).mockResolvedValue(mockAxiosResponse);

    setup();
  });

  it("보내는 사람 입력 필드 렌더링", async () => {
    const senderInput =
      await screen.findByPlaceholderText("이름을 입력하세요.");
    expect(senderInput).toBeInTheDocument();
  });

  it("보내는 사람 입력 필드 style", async () => {
    const senderInput =
      await screen.findByPlaceholderText("이름을 입력하세요.");
    expect(senderInput).toHaveStyle("border-radius: 6px");
  });

  it("받는 사람 추가 버튼 렌더링", async () => {
    const addButton = await screen.findByRole("button", { name: "추가" });
    expect(addButton).toBeInTheDocument();
  });

  it("받는 사람 추가 버튼 style", async () => {
    const addButton = await screen.findByRole("button", { name: "추가" });
    expect(addButton).toHaveStyle("cursor: pointer;");
  });
});
