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

|- client/<br/>
|-- src/<br/>
|--- api/<br/>
|---- client.ts<br/>
|---- orders.ts<br/>
|---- queryClient.ts<br/>
|--- components/<br/>
|---- OrderForm.tsx<br/>
|---- OrderList.tsx<br/>
|--- data/<br/>
|---- products.ts<br/>
|--- hooks/<br/>
|---- useDebounce.ts<br/>
|---- useOrders.ts<br/>
|---- useSubmitOrder.ts<br/>
|--- lib/<br/>
|---- queryKeys.ts<br/>
|- server/<br/>
|-- src/<br/>
|--- controllers/<br/>
|---- orderController.ts<br/>
|--- mock/<br/>
|---- orders.json<br/>
|--- routers/<br/>
|---- orderRouter.ts<br/>

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

- ### Install dependencies

npm install

- #### runs client (5173) + server (3000) in parallel

npm run dev
