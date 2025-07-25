import type { User } from "@/context/UserInfoContext";
import { api } from "@/libs/axios";

const ORDER = "/order";

export const getProductsSummary = (productId: string) =>
  api.get(`/products/${productId}/summary`);

export const postOrder = (
  productId: string,
  GiftMessageRef: React.RefObject<HTMLInputElement>,
  selectedId: number,
  SenderNameRef: React.RefObject<HTMLInputElement>,
  renewedReceivers: {
    name: string;
    address: string;
    [key: string]: string | number | boolean;
  }[],
  user: User | null
) =>
  api.post(
    ORDER,
    {
      productId: Number(productId),
      message: GiftMessageRef.current?.value,
      messageCardId: String(selectedId),
      ordererName: SenderNameRef.current?.value,
      receivers: renewedReceivers,
    },
    {
      headers: {
        Authorization: user?.authToken,
      },
    }
  );
