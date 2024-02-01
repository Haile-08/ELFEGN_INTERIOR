import "./Checkout.css";
import logo from "../../assets/logo.svg";
import amhlogo from "../../assets/amhlogo.svg";
import back from "../../assets/back.png";
import { useNavigate, useParams } from "react-router-dom";
import { getAGift } from "../../hooks/giftHook";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Order } from "../../hooks/orderHook";
import { useDispatch, useSelector } from "react-redux";
import { setTxRef } from "../../actions/authSlice";
import { useTranslation } from "react-i18next";

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state: any) => state.auth.user);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [post, setPost] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  console.log(user);
  const gift = useQuery({
    queryKey: ["gift", id],
    //@ts-ignore
    queryFn: () => getAGift(id),
  });

  const { mutate } = useMutation(Order, {
    onSuccess: (data) => {
      dispatch(
        setTxRef({
          tx_ref: data.tx_ref,
        })
      );
      const newWindow: any = window.open(data.url, "_self");
      if (newWindow.closed) {
        setPaymentLoading(false);
      }
    },
    onError: () => {
      navigate("/buyerpage/payment/failure");
    },
  });

  useEffect(() => {
    gift.refetch();
  }, []);

  const handleChange = (e: any) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <div className="checkout">
      {paymentLoading && (
        <div className="payment-loading">
          <div className="payment-loader"></div>
        </div>
      )}
      <div className="checkout-info">
        <div className="back">
          <img
            src={back}
            alt="back"
            onClick={() => navigate(`/giftpage/${id}`)}
          />
        </div>
        <img src={t("logo") === "eng" ? logo : amhlogo} alt="logo" />
        <div className="checkout-info-price">
          <p className="pay">{t("buyerPayAmount")}</p>
          <p className="price">{gift.data.gift_price}Birr</p>
        </div>
        <div className="checkout-info-gift">
          <img
            src={
              "https://merita.onrender.com" + gift.data.gift_image.substring(6)
            }
            alt="content-image"
            crossOrigin="anonymous"
          />
          <div className="info">
            <p>{gift?.data?.gift_name}</p>
            <p>{gift?.data?.gift_category}</p>
            <p>{gift?.data?.gift_date}</p>
          </div>
        </div>
      </div>
      <div className="checkout-input">
        <p>{t("buyerInformation")}</p>
        <input
          type="email"
          name="email"
          placeholder={t("email")}
          value={post.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="first_name"
          value={post.first_name}
          onChange={handleChange}
          placeholder={t("firstName")}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder={t("lastName")}
          value={post.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="phone_number"
          placeholder={t("aboutTxtPhone") + "(0934542345)"}
          value={post.phone_number}
          onChange={handleChange}
          required
        />
        <button
          onClick={() => {
            mutate({
              first_name: post.first_name,
              last_name: post.last_name,
              email: post.email,
              phone_number: post.phone_number,
              GiftId: gift.data?._id,
              amount: gift.data.gift_price,
              GiftName: gift.data.gift_name,
              SellerId: gift.data?.seller_id,
              BuyerId: user._id,
              GiftImage: gift.data.gift_image,
              OrderDate: new Date().toLocaleString(),
            });
            setPaymentLoading(true);
          }}
        >
          {t("buyercheckout")}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
