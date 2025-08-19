import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});
