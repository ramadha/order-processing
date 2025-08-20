# Order Processing Application

A React + TypeScript application for order processing with Node backend. It uses Axios + React Query for data fetching & caching, and UIkit for UI components.

---

## Features

- Submit Orders.
- Order state updates.
- Expandable view for orders
- Debounced search.

---

## Project Structure

|- client/
|-- src/
|--- api/
|---- client.ts
|---- orders.ts
|---- queryClient.ts
|--- components/
|---- OrderForm.tsx
|---- OrderList.tsx
|--- data/
|---- products.ts
|--- hooks/
|---- useDebounce.ts
|---- useOrders.ts
|---- useSubmitOrder.ts
|--- lib/
|---- queryKeys.ts
|- server/
|-- src/
|--- controllers/
|---- orderController.ts
|--- mock/
|---- orders.json
|--- routers/
|---- orderRouter.ts

---

## Tech Stack

- **Frontend**
  - React (Vite + TypeScript)
  - [UIkit](https://getuikit.com/) for UI
  - Axios + React Query for data fetching & caching
- **Backend**
  - Node.js + Express
  - TypeScript
  - Zod for request validation
- **Data**
  - Mocked products and orders (`src/data/products.ts`, `server/src/mock/orders.json`)
  - In-memory order store with timers to simulate progress

---

## Running the Project

### Install dependencies

npm install

### Start Development server

# runs client (5173) + server (3000) in parallel

npm run dev
