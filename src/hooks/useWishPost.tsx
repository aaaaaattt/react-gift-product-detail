import { getProductWish } from "@/api/wish/wish";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useWishPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => getProductWish(productId),

    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["productWish", productId] });

      const previousData = queryClient.getQueryData(["productWish", productId]);

      queryClient.setQueryData(["productWish", productId], (old: any) => {
        if (!old) return;

        const data = old.data.data;

        return {
          ...old,
          data: {
            ...old.data,
            data: {
              ...data,
              wishCount: (data.wishCount ?? 0) + 1,
              isWished: !data.isWished,
            },
          },
        };
      });

      return { previousData };
    },
    onError: (error, productId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["productWish", productId],
          context.previousData
        );
      }
    },
  });
}
