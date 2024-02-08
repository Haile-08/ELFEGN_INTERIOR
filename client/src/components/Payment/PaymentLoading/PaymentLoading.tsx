import { useEffect } from "react";
import "./PaymentLoading.css";
import { useMutation, useQuery } from "react-query";
import { getOrder, verifyPayment } from "../../../hooks/orderHook";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function PaymentLoading() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tx_ref = useSelector((state: any) => state.auth.tx_ref);
  const { data } = useQuery(["order"], getOrder);
  const { mutate } = useMutation(verifyPayment, {
    onSuccess: (data) => {
      if (data.paid) {
        navigate("/buyerpage/payment/success");
      } else {
        console.log("else error")
        navigate("/buyerpage/payment/failure");
      }
    },
    onError: () => {
      console.log("usemutaion error")
      navigate("/buyerpage/payment/failure");
    },
  });
  useEffect(() => {
    console.log("text refereance is there", tx_ref);
    mutate({ tx_ref });
  }, [mutate]);
  return (
    <div className="payment-loading">
      <div className="payment-verify-loader"></div>
      <p>{t("buyerPaymentLoading")}</p>
    </div>
  );
}

export default PaymentLoading;
