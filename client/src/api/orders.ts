import { http } from "./client";
import type { Order } from "../types";

/** Fetch all orders. */
export async function fetchOrders(): Promise<Order[]> {
  const { data } = await http.get<Order[]>("/orders");
  return data;
}

/** Create a new order. */
export async function createOrder(input: { customerName: string; productId: number }): Promise<Order> {
  const { data } = await http.post<Order>("/orders", input);
  return data;
}
