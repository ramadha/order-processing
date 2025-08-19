import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PRODUCTS } from "./product";
import type { Order, OrderStatus } from "./types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mockPath = path.join(__dirname, "mock", "orders.json");

let nextId = 1;
const timeouts = new Map<number, NodeJS.Timeout[]>();

function nowISO() {
  return new Date().toISOString();
}

function loadInitial(): Order[] {
  try {
    const raw = fs.readFileSync(mockPath, "utf-8");
    const arr: Order[] = JSON.parse(raw);
    nextId = Math.max(0, ...arr.map((o) => o.id)) + 1;
    return arr;
  } catch {
    return [];
  }
}

export const orders: Order[] = loadInitial();

export function getOrders(): Order[] {
  return orders.sort((a, b) => b.id - a.id);
}

export function getOrderById(id: number): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function createOrder(input: { customerName: string; productId: number }): Order {
  const product = PRODUCTS.find((p) => p.id === input.productId);
  if (!product) throw new Error("Invalid productId");

  const order: Order = {
    id: nextId++,
    customerName: input.customerName,
    productId: product.id,
    productName: product.name,
    price: product.price,
    status: "Pending",
    createdAt: nowISO(),
    updatedAt: nowISO(),
  };

  orders.push(order);
  simulateProgress(order.id);
  return order;
}

function setStatus(order: Order, status: OrderStatus) {
  order.status = status;
  order.updatedAt = nowISO();
}

function simulateProgress(orderId: number) {
  const order = getOrderById(orderId);
  if (!order) return;

  const t1 = setTimeout(() => setStatus(order, "Processing"), 2000);
  const t2 = setTimeout(() => setStatus(order, "Completed"), 10000);

  timeouts.set(orderId, [t1, t2]);
}

export function clearTimers(orderId: number) {
  const arr = timeouts.get(orderId);
  if (!arr) return;
  for (const t of arr) clearTimeout(t);
  timeouts.delete(orderId);
}
