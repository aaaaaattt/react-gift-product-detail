import { api } from "@/libs/axios";
import type { AxiosResponse } from "axios";

type ProductInfo = {
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
type Announcement = {
  name: string;
  value: string;
  displayOrder: number;
};

type ProductExtraInfo = {
  description: string;
  announcements: Announcement[];
};

export type Review = {
  id: string;
  authorName: string;
  content: string;
};

export type ReviewResponse = {
  totalCount: number;
  reviews: Review[];
};

export const getProductDetail = (
  productId: string
): Promise<AxiosResponse<{ data: ProductInfo }>> =>
  api.get(`/products/${productId}`);

export const getProductExtraInfo = (
  productId: string
): Promise<AxiosResponse<{ data: ProductExtraInfo }>> =>
  api.get(`/products/${productId}/detail`);

export const getProductReview = (
  productId: string
): Promise<AxiosResponse<{ data: ReviewResponse }>> =>
  api.get(`/products/${productId}/highlight-review`);
