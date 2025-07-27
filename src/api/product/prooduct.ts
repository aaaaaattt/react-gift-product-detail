import { api } from "@/libs/axios";
import type { AxiosResponse } from "axios";

type ProductDetail = {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: string;
    name: string;
    imageURL: string;
  };
};

export const getProductDetail = (
  productId: string
): Promise<AxiosResponse<{ data: ProductDetail }>> =>
  api.get(`/products/${productId}`);
