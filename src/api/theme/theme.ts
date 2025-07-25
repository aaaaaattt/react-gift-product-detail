import { api } from "@/libs/axios";

export const getThemeProducts = (themeId: string, cursor: number) =>
  api.get(`/themes/${themeId}/products?cursor=${cursor}&limit=10`);
