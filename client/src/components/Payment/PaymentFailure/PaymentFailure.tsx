import "./PaymentFailure.css";
import reject from "../../../assets/reject.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PaymentFailure() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleStorNav = (e: any) => {
    e.preventDefault();
    navigate("/buyerpage/shop?user=null");
  };
  return (
    <div className="payment-failure">
      <div className="payment-failure-check">
        <img src={reject} alt="accept" />
      </div>
      <div className="payment-failure-text">
        <h3>{t("buyerPaymentFailHeader")}</h3>
        <p>{t("buyerPaymentFailBody")}</p>
      </div>
      <button onClick={handleStorNav}>{t("tryAgain")}</button>
    </div>
  );
}

export default PaymentFailure;
