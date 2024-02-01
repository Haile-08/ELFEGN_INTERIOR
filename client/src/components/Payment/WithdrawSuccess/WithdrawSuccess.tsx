import "../PaymentSuccess/PaymentSuccess.css";
import accept from "../../../assets/accept.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function WithdrawSuccess() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleStorNav = (e: any) => {
    e.preventDefault();
    navigate("/sellerpage/order");
  };
  return (
    <div className="payment-success">
      <div className="payment-success-check">
        <img src={accept} alt="accept" />
      </div>
      <div className="payment-success-text">
        <h3>{t("buyerWithdrawSuccessHeader")}</h3>
        <p>{t("buyerWithdrawSuccessBody")}</p>
      </div>
      <button onClick={handleStorNav}>{t("complete")}</button>
    </div>
  );
}

export default WithdrawSuccess;
