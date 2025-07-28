import { postProductWish } from "@/api/wish/wish";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useWishPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => postProductWish(productId),

    onMutate: async (productId) => {
      await queryClient.cancelQueries({
        queryKey: ["productReview", productId],
      });

      const previousData = queryClient.getQueryData([
        "productReview",
        productId,
      ]);

      queryClient.setQueryData(["productReview", productId], (old: any) => {
        if (!old) return;

        const data = old.data.data;

        return {
          ...old,
          data: {
            ...old.data,
            data: {
              ...data,
              totalCount: (data.totalCount ?? 0) + 1,
            },
          },
        };
      });

      return { previousData };
    },
  });
}
