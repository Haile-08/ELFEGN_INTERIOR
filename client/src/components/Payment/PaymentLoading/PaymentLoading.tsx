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
        navigate("buyerpage/payment/failure");
      }
    },
    onError: () => {
      navigate("buyerpage/payment/failure");
    },
  });
  useEffect(() => {
    console.log(data);
    mutate({ tx_ref });
    data?.map((item: any) => {
      if (item.OrderActive === false) {
        console.log(item.tx_ref);
        mutate({ tx_ref: item.tx_ref });
      }
    });
  }, [mutate, data]);
  return (
    <div className="payment-loading">
      <div className="payment-verify-loader"></div>
      <p>{t("buyerPaymentLoading")}</p>
    </div>
  );
}

export default PaymentLoading;
