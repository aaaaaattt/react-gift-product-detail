import { api } from "@/libs/axios";

export const postProductWish = (productId: string) =>
  api.post(`/products/${productId}/wish`);
