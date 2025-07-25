import { api } from "@/libs/axios";

const THEMES = "/themes";

export const getThemeProducts = (themeId: string, cursor: number) =>
  api.get(`/themes/${themeId}/products?cursor=${cursor}&limit=10`);

export const getThemeInfo = (themeId: string) =>
  api.get(`/themes/${themeId}/info`);

export const getThemeProductById = (themeId: string) =>
  api.get(`/themes/${themeId}/products `);

export const getTheme = () => api.get(THEMES);
