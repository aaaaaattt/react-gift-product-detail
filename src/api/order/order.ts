import { api } from "@/libs/axios";

export const getProductsSummary = (productId: string) =>
  api.get(`/products/${productId}/summary`);
