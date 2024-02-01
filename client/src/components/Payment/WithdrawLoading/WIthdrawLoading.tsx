import { useEffect } from "react";
import "../PaymentLoading/PaymentLoading.css";
import { useMutation, useQuery } from "react-query";
import { verifyWithdraw } from "../../../hooks/withdrawHook";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function WIthdrawLoading() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate } = useMutation(verifyWithdraw, {
    onSuccess: (data) => {
      if (data.success) {
        navigate("/sellerpage/withdraw/success");
      } else {
        navigate("/sellerpage/withdraw/failure");
      }
    },
    onError: () => {
      navigate("/sellerpage/withdraw/failure");
    },
  });
  const user = useQuery(["user"]);
  useEffect(() => {
    /*@ts-ignore */
    mutate({ id: user?._id });
  }, []);
  return (
    <div className="payment-loading">
      <div className="payment-verify-loader"></div>
      <p>{t("buyerWithdrawVerification")}</p>
    </div>
  );
}

export default WIthdrawLoading;
