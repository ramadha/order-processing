import { OrderForm } from "./components/OrderForm";
import { OrdersList } from "./components/OrdersList";

export default function App() {
  return (
    <div className="uk-section uk-section-muted">
      <div className="uk-container">
        <h1 className="uk-heading-small">Order Processing</h1>
        <p>Submit an order and watch its status update in real-time.</p>

        <div className="uk-grid-small uk-child-width-1-2@s" data-uk-grid>
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">New Order</h3>
              <OrderForm />
            </div>
          </div>
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Orders</h3>
              <OrdersList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
