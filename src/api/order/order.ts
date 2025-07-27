import type { User } from "@/context/UserInfoContext";
import { api } from "@/libs/axios";

const ORDER = "/order";

type renewedReceiver = {
  name: string;
  phoneNumber: string;
  quantity: number;
};

export const getProductsSummary = (productId: string) =>
  api.get(`/products/${productId}/summary`);

export const postOrder = (
  productId: string | undefined,
  GiftMessageRef: React.RefObject<HTMLTextAreaElement | null>,
  selectedId: number,
  senderName: string | undefined,
  renewedReceivers: renewedReceiver[],
  user: User | null
) =>
  api.post(
    ORDER,
    {
      productId: Number(productId),
      message: GiftMessageRef.current?.value,
      messageCardId: String(selectedId),
      ordererName: senderName,
      receivers: renewedReceivers,
    },
    {
      headers: {
        Authorization: user?.authToken,
      },
    }
  );
