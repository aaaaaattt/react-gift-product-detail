import { api } from "@/libs/axios";

type BaseResponse<T> = {
  data: T;
};

type ProductRanking = {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

export const getProductsFiltered = (url: string) =>
  api.get<BaseResponse<ProductRanking[]>>(url);
