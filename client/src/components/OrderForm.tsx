import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../api/orders";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 699 },
  { id: 3, name: "Headphones", price: 199 },
  { id: 4, name: "Tablet", price: 499 },
];

export function OrderForm() {
  const [customerName, setCustomerName] = useState("");
  const [productId, setProductId] = useState<number>(PRODUCTS[0].id);
  const [touched, setTouched] = useState(false);

  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      // reset form and refresh list
      setCustomerName("");
      setProductId(PRODUCTS[0].id);
      setTouched(false);
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!customerName.trim()) return;
    mutation.mutate({ customerName, productId });
  };

  const hasNameError = touched && customerName.trim().length === 0;

  return (
    <form className="uk-form-stacked" onSubmit={onSubmit} noValidate>
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="customerName">
          Customer Name
        </label>
        <div className="uk-form-controls">
          <input
            id="customerName"
            className={`uk-input ${hasNameError ? "uk-form-danger" : ""}`}
            type="text"
            placeholder="Jane Doe"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            onBlur={() => setTouched(true)}
            required
          />
          {hasNameError && <div className="uk-text-danger uk-margin-small-top">Customer name is required</div>}
        </div>
      </div>

      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="product">
          Product
        </label>
        <div className="uk-form-controls">
          <select
            id="product"
            className="uk-select"
            value={productId}
            onChange={(e) => setProductId(Number(e.target.value))}
          >
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — ${p.price}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="uk-margin">
        <button className="uk-button uk-button-primary" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Submitting…" : "Submit Order"}
        </button>
        {mutation.isError && (
          <span className="uk-text-danger uk-margin-small-left">Failed to submit. Please try again. </span>
        )}
      </div>
    </form>
  );
}
