import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { fetchOrders } from "../api/orders";
import type { Order } from "../types";
import { ordersKeys } from "../lib/queryKeys";

type Options = Omit<UseQueryOptions<Order[], unknown, Order[]>, "queryKey" | "queryFn"> & {
  /** Defaults to 1000ms for live updates; pass null to disable polling. */
  refetchIntervalMs?: number | null;
};
const norm = (s: string) => s.trim().toLowerCase();

export function useOrders(options?: Options, search: string = "") {
  const { refetchIntervalMs = 1000, ...rest } = options ?? {};
  const q = norm(search);
  return useQuery({
    queryKey: [...ordersKeys.all, { q }],
    queryFn: fetchOrders,
    select: (orders) => (q ? orders.filter((o) => o.customerName.toLowerCase().includes(q)) : orders),

    refetchInterval: refetchIntervalMs ?? undefined,
    ...rest,
  });
}
