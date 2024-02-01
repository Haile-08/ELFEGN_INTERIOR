import "./SellerWithdraw.css";
import { useMutation, useQuery } from "react-query";
import {
  acceptWithdraw,
  getUserBalance,
  getWithdrawRequests,
  requestWithdraw,
  retrieveBankList,
} from "../../../hooks/withdrawHook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import wegagen from "../../../assets/wegagenbank.png";
import abay from "../../../assets/abaybank.png";
import amhara from "../../../assets/AmharaBank.png";
import awash from "../../../assets/AwashBank.png";
import abyssinia from "../../../assets/abyssiniabank.png";
import cbe from "../../../assets/cbebank.png";
import coop from "../../../assets/coopbank.png";
import dashen from "../../../assets/DashenBank.png";
import hibret from "../../../assets/HibretBank.png";
import telebirr from "../../../assets/telebirr.png";
import zemen from "../../../assets/zemenbank.png";
import { BsCalendar2Date } from "react-icons/bs";
import { FaIdCardAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function SellerWithdraw() {
  const { t } = useTranslation();
  const user = useSelector((state: any) => state.auth.user);
  const sellerToken = useSelector((state: any) => state.auth.sellerToken);
  const [post, setPost] = useState({
    account_name: "",
    account_number: "",
    amount: "",
    bank_name: "",
    seller_id: "",
  });
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const bank = useQuery(["banks"], retrieveBankList);
  console.log("bank list", bank);
  const request = useQuery({
    queryKey: ["request"],
    /*@ts-ignore */
    queryFn: () => getWithdrawRequests({ id: user?._id, token: sellerToken }),
  });
  const balance = useQuery({
    queryKey: ["balance"],
    /*@ts-ignore */
    queryFn: () => getUserBalance({ id: user?._id, token: sellerToken }),
  });
  const { mutate } = useMutation(requestWithdraw, {
    onSuccess: (data: object) => {
      console.log(data);
      console.log(" withdraw success");
    },
    onError: () => {
      alert("there was an error with withdraw");
    },
  });
  const status = useMutation(acceptWithdraw, {
    onSuccess: (data: object) => {
      console.log(data);
      console.log("withdraw accept success");
      /*@ts-ignore */
      if (data?.success) {
        navigate("/sellerpage/withdraw/verify");
      } else {
        navigate("/sellerpage/withdraw/failure");
      }
    },
    onError: () => {
      alert("there was an error with withdraw");
    },
  });
  const handleChange = (e: any) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    bank.refetch();
    request.refetch();
    balance.refetch();
  }, [post]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const currentDate = new Date().toDateString();
    const bank_code = bank?.data?.data.find(
      (obj: any) => obj.name === post.bank_name
    );
    mutate({
      data: {
        account_name: post.account_name,
        account_number: post.account_number,
        amount: balance?.data,
        bank_code: bank_code?.id,
        bank_name: post.bank_name,
        seller_id: user?._id,
        date: currentDate,
      },
      token: sellerToken,
    });
  };

  const handlewithdraw = (id: string) => {
    status.mutate({
      data: {
        id: id,
      },
      token: sellerToken,
    });
    setModal(true);
  };

  function bankImage(name: string) {
    if (name === "Abay Bank") {
      return abay;
    } else if (name === "Amhara Bank") {
      return amhara;
    } else if (name === "Awash Bank") {
      return awash;
    } else if (name === "Bank of Abyssinia") {
      return abyssinia;
    } else if (name === "Commercial Bank of Ethiopia (CBE)") {
      return cbe;
    } else if (name === "Cooperative Bank of Oromia (COOP)") {
      return coop;
    } else if (name === "Dashen Bank") {
      return dashen;
    } else if (name === "Hibret Bank") {
      return hibret;
    } else if (name === "telebirr") {
      return telebirr;
    } else if (name === "Wegagen Bank") {
      return wegagen;
    } else if (name === "Zemen Bank") {
      return zemen;
    }
  }

  console.log(bank.data);
  return (
    <div className="seller-withdraw">
      {modal && (
        <div className="withdraw_modal">
          <div className="payment-loader"></div>
        </div>
      )}
      <div className="seller-withdraw-input">
        <p>{t("withdrawGetPaid")}</p>
        <div className="seller-withdraw-input-balance">
          <p>{t("withdrawAvailableBalance")}</p>
          {/*@ts-ignore */}
          <p>{balance.data} birr</p>
        </div>
        <label htmlFor="account_name">{t("withdrawaccountName")}</label>
        <input
          type="text"
          name="account_name"
          placeholder={t("withdrawaccountName")}
          value={post.account_name}
          onChange={handleChange}
          required
        />
        <label htmlFor="account_number">{t("withdrawaccountNumber")}</label>
        <input
          type="text"
          name="account_number"
          placeholder={t("withdrawaccountNumber")}
          value={post.account_number}
          onChange={handleChange}
          required
        />
        <div className="seller-withdraw-bank">
          <p>{t("withdrawBank")}</p>
          <select
            name="bank_name"
            value={post.bank_name}
            onChange={handleChange}
            required
          >
            {bank?.data?.data.map((bank: any, index: number) => (
              <option value={bank.name} key={index}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSubmit}>{t("withdrawwithDrawRequest")}</button>
      </div>
      <div className="seller-withdraw-status-list">
        <p>{t("withdrawTransaction")}</p>
        <div className="request-scroll-list">
          {request?.data?.map((req: any, index: number) => (
            <div className="seller-withdraw-status-transaction" key={index}>
              <img src={bankImage(req.bank_name)} alt="wegagen" />
              <div className="seller-withdraw-status-transaction-center">
                <div className="seller-withdraw-status-transition-order">
                  <p>
                    <FaIdCardAlt /> {req._id}
                  </p>
                  <p>
                    <BsCalendar2Date /> {req.date}
                  </p>
                </div>
                <div className="seller-withdraw-status-transition-order-info">
                  <div className="seller-withdraw-status-transition-order-basic-info">
                    <p>{req.account_name}</p>
                    <p>{req.account_number}</p>
                    <p>{req.amount} Birr</p>
                  </div>
                  <div className="seller-withdraw-status-transition-order-bank-info">
                    <p>{req.bank_name}</p>
                  </div>
                  <div className="seller-withdraw-status-transition-order-info-status">
                    <h4>Approval</h4>
                    {req.success ? (
                      <p className="paid">Paid</p>
                    ) : req.Approved ? (
                      <button
                        onClick={(e: any) => {
                          e.preventDefault();
                          handlewithdraw(req._id);
                        }}
                      >
                        Withdraw
                      </button>
                    ) : req.Decline ? (
                      <p className="withdraw-declined">Declined</p>
                    ) : (
                      <p> pending</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerWithdraw;
