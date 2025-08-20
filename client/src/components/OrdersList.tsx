import { useState } from "react";
import { useOrders, useDebounce } from "../hooks";
import type { Order } from "../types";

function StatusBadge({ status }: { status: Order["status"] }) {
  const cls = status === "Completed" ? "uk-label-success" : status === "Processing" ? "uk-label-warning" : "";
  return <span className={`uk-label ${cls}`}>{status}</span>;
}

export function OrdersList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const { data, isLoading, isError, refetch } = useOrders({ refetchIntervalMs: 1000 }, debouncedSearch);

  if (isLoading) {
    return (
      <div className="uk-text-center">
        <div data-uk-spinner="ratio: 1.2" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="uk-alert-danger" data-uk-alert>
        <p>Failed to load orders.</p>
        <button className="uk-button uk-button-default uk-button-small" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  const orders = data ?? [];

  return (
    <>
      <div className="uk-width-1-2">
        <div className="uk-inline uk-width-1-1">
          <input
            className="uk-input"
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              type="button"
              className="uk-form-icon uk-form-icon-flip uk-button-link clear-btn"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="uk-text-meta">No orders found.</p>
      ) : (
        <ul className="uk-list uk-list-divider" data-uk-accordion="multiple: true">
          {orders.map((order) => (
            <li key={order.id}>
              <a className="uk-accordion-title" href="#">
                <div className="uk-grid-small uk-flex-middle" data-uk-grid>
                  <div className="uk-width-auto">
                    <strong>#{order.id}</strong>
                  </div>
                  <div className="uk-width-expand">
                    {order.customerName} — {order.productName} (${order.price})
                  </div>
                  <div className="uk-width-auto">
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              </a>

              <div className="uk-accordion-content">
                <dl className="uk-description-list">
                  <dt>Status</dt>
                  <dd>{order.status}</dd>

                  <dt>Created</dt>
                  <dd>{new Date(order.createdAt).toLocaleString()}</dd>

                  <dt>Updated</dt>
                  <dd>{new Date(order.updatedAt).toLocaleString()}</dd>

                  <dt>Next steps</dt>
                  <dd className="uk-text-meta">Placeholder for shipment tracking, notes, audit trail, etc.</dd>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
