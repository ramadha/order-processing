import { z } from "zod";
import { createOrder, getOrderById, getOrders } from "../data";

const CreateOrderSchema = z.object({
  customerName: z.string().min(1, "customerName is required"),
  productId: z.number().int().positive(),
});

export function listOrders(_req: any, res: any) {
  res.json(getOrders());
}

export function getOrder(req: any, res: any) {
  const id = Number(req.params.id);
  const order = getOrderById(id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
}

export function postOrder(req: any, res: any) {
  const parsed = CreateOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid request", issues: parsed.error.issues });
  }
  const order = createOrder(parsed.data);
  res.status(201).json(order);
}
