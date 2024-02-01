import "../PaymentFailure/PaymentFailure.css";
import reject from "../../../assets/reject.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function WithdrawFailure() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleStorNav = (e: any) => {
    e.preventDefault();
    navigate("/sellerpage/withdraw");
  };
  return (
    <div className="payment-failure">
      <div className="payment-failure-check">
        <img src={reject} alt="accept" />
      </div>
      <div className="payment-failure-text">
        <h3>{t("buyerWithdrawFailHeader")}</h3>
        <p>{t("buyerWithdrawFailBody")}</p>
      </div>
      <button onClick={handleStorNav}>{t("tryAgain")}</button>
    </div>
  );
}

export default WithdrawFailure;
