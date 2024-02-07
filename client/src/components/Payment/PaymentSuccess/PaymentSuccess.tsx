import "./PaymentSuccess.css";
import accept from "../../../assets/accept.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PaymentSuccess() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleStorNav = (e: any) => {
    e.preventDefault();
    navigate("/buyerpage/shop?user=null");
  };
  return (
    <div className="payment-success">
      <div className="payment-success-check">
        <img src={accept} alt="accept" />
      </div>
      <div className="payment-success-text">
        <h3>{t("buyerPaymentSuccessHeader")}</h3>
        <p>{t("buyerPaymentSuccessBody")}</p>
      </div>
      <button onClick={handleStorNav}>{t("complete")}</button>
    </div>
  );
}

export default PaymentSuccess;
