import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../api/orders";
import { ordersKeys } from "../lib/queryKeys";

type CreateOrderInput = {
  customerName: string;
  productId: number;
};

export function useSubmitOrder() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateOrderInput) => createOrder(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ordersKeys.all });
    },
  });
}
