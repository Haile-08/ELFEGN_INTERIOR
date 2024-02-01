import { Outlet } from "react-router-dom";
import "./Payment.css";

function Payment() {
  return (
    <div className="payment-status">
      <Outlet />
    </div>
  );
}

export default Payment;
