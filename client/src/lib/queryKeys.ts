export const ordersKeys = {
  all: ["orders"] as const,
  detail: (id: number) => ["orders", id] as const,
};
