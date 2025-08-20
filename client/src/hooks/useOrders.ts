import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { fetchOrders } from "../api/orders";
import type { Order } from "../types";
import { ordersKeys } from "../lib/queryKeys";

type Options = Omit<UseQueryOptions<Order[], unknown, Order[], readonly ["orders"]>, "queryKey" | "queryFn"> & {
  /** Defaults to 1000ms for live updates; pass null to disable polling. */
  refetchIntervalMs?: number | null;
};

export function useOrders(options?: Options) {
  const { refetchIntervalMs = 1000, ...rest } = options ?? {};
  return useQuery({
    queryKey: ordersKeys.all,
    queryFn: fetchOrders,
    refetchInterval: refetchIntervalMs ?? undefined,
    ...rest,
  });
}
