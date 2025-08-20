import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api/orders";
import type { Order } from "../types";

function StatusBadge({ status }: { status: Order["status"] }) {
  const cls = status === "Completed" ? "uk-label-success" : status === "Processing" ? "uk-label-warning" : "";
  return <span className={`uk-label ${cls}`}>{status}</span>;
}

export function OrdersList() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    refetchInterval: 1000,
  });

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

  if (orders.length === 0) {
    return <p className="uk-text-meta">No orders yet. Submit one using the form.</p>;
  }

  return (
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
  );
}
