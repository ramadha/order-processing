export type OrderStatus = "Pending" | "Processing" | "Completed";

export interface Order {
  id: number;
  customerName: string;
  productId: number;
  productName: string;
  price: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}
