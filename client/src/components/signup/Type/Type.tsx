import "../Page.css";
import seller from "../../../assets/sell.png";
import buyer from "../../../assets/buy.png";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { setUserType } from "../../../hooks/userHook";
import { setLogin } from "../../../actions/authSlice";
import { signupUser } from "../../../hooks/authHook";
import { useTranslation } from "react-i18next";

function Type() {
  const { id, email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const firstName = useSelector((state: any) => state.signup.firstname);
  const lastName = useSelector((state: any) => state.signup.lastname);
  const emailInput = useSelector((state: any) => state.signup.email);
  const date = useSelector((state: any) => state.signup.date);
  const country = useSelector((state: any) => state.signup.country);
  const city = useSelector((state: any) => state.signup.city);
  const street = useSelector((state: any) => state.signup.street);
  const password = useSelector((state: any) => state.signup.password);

  const { mutate } = useMutation(setUserType, {
    onSuccess: (data) => {
      if (data.is_a_buyer === true) {
        dispatch(
          setLogin({
            user: data.newUser,
            buyerToken: data.token,
          })
        );
        navigate("/buyerpage/shop");
      } else {
        dispatch(
          setLogin({
            user: data.newUser,
            sellerToken: data.token,
          })
        );
        navigate("/sellerpage/profile");
      }
    },
    onError: () => {
      navigate("/");
    },
  });

  const signup = useMutation(signupUser, {
    onSuccess: (data) => {
      console.log(data);
      if (data.is_a_buyer === true) {
        dispatch(
          setLogin({
            user: data.newUser,
            buyerToken: data.token,
          })
        );
        navigate("/buyerpage/shop");
      } else {
        dispatch(
          setLogin({
            user: data.newUser,
            sellerToken: data.token,
          })
        );
        navigate("/sellerpage/profile");
      }
    },
    onError: () => {
      alert("there was an error");
    },
  });

  const handleBuyerStatus = (isBuyer: boolean) => {
    console.log(isBuyer);
    if (id === "id") {
      if (isBuyer === true) {
        signup.mutate({
          firstName,
          lastName,
          country,
          city,
          street,
          email: emailInput,
          date,
          password,
          is_a_buyer: true,
        });
      } else {
        signup.mutate({
          firstName,
          lastName,
          country,
          city,
          street,
          email: emailInput,
          date,
          password,
          is_a_buyer: false,
        });
      }
    } else {
      if (isBuyer === true) {
        mutate({ email, is_a_buyer: true });
      } else {
        mutate({ email, is_a_buyer: false });
      }
    }
  };
  return (
    <motion.div
      className="page-one"
      initial={{ x: "-100dvw" }}
      animate={{ x: 0 }}
      exit={{ x: "200dvw" }}
      transition={{ delay: 0.2, duration: 0.5, type: "tween" }}
    >
      <div className="page-one-title">
        <p>{t("account")}:</p>
        <p>{t("step")} 4-4</p>
      </div>
      <div className="page-one-input">
        <div className="account-type-box-choice">
          <motion.button
            onClick={() => handleBuyerStatus(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={buyer} alt="buyer" />
            {t("buyAGift")}
          </motion.button>
          <motion.button
            onClick={() => handleBuyerStatus(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={seller} alt="seller" />
            {t("sellAGift")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default Type;
