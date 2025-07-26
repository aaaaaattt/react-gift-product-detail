import { api } from "@/libs/axios";
import type { AxiosResponse } from "axios";

const THEMES = "/themes";

type ThemeInfo = {
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

export const getThemeProducts = (themeId: string, cursor: number) =>
  api.get(`/themes/${themeId}/products?cursor=${cursor}&limit=10`);

export const getThemeInfo = (
  themeId: string
): Promise<AxiosResponse<{ data: ThemeInfo }>> =>
  api.get(`/themes/${themeId}/info`);

export const getThemeProductById = (themeId: string) =>
  api.get(`/themes/${themeId}/products `);

export const getTheme = () => api.get(THEMES);
