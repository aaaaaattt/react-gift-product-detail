import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import theme from "@/styles/theme";
import GiftRanking from "@/components/GiftRankingBox";

const renderGiftRanking = () => {
  const queryClient = new QueryClient();
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GiftRanking target="ALL" rankType="MANY_WISH" />
        </QueryClientProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe("실시간 선물 랭킹 섹션", () => {
  it("실시간 선물 랭킹 화면 표시", async () => {
    renderGiftRanking();

    expect(
      await screen.findByText("부드러운 고구마 라떼 케이크")
    ).toBeInTheDocument();
  });
});
