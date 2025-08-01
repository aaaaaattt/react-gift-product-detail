import { rankingData } from "./mockRankingData";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("products/ranking", ({ request }) => {
    const url = new URL(request.url);
    const targetType = url.searchParams.get("targetType");
    const rankType = url.searchParams.get("rankType");

    if (targetType === "ALL" && rankType === "MANY_WISH") {
      return HttpResponse.json({
        data: rankingData,
      });
    }
  }),
];
