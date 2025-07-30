import { api } from "@/libs/axios";
import type { AxiosResponse } from "axios";

type wishData = {
  wishCount: number;
  isWished: boolean;
};

export const getProductWish = (
  productId: string
): Promise<AxiosResponse<{ data: wishData }>> =>
  api.get(`/products/${productId}/wish`);
