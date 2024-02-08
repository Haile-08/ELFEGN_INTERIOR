import "../signup/Signup.css";
import "../signup/Page.css";
import logo from "../../assets/logo.svg";
import amhlogo from "../../assets/amhlogo.svg";
import google from "../../assets/google-login.png";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, minLength, email } from "valibot";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useMutation } from "react-query";
import { loginUser } from "../../hooks/authHook";
import { setLogin } from "../../actions/authSlice";
import error from "../../assets/error.png";
import { useTranslation } from "react-i18next";

interface IFormInputs {
  from_email: string;
  from_password: string;
}

const schema = object({
  from_email: string("Your email must be a string.", [
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
  from_password: string("Your password must be a string.", [
    minLength(1, "Please enter your password."),
    minLength(8, "Your password must have 8 characters or more."),
  ]),
});

function SignIn() {
  const [isVisible, setVisible] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: valibotResolver(schema),
  });

  const { mutate } = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log("user", data)
      if(data.token){
        dispatch(
          setLogin({
            user: data.user,
            userToken: data.token,
          })
        );
        navigate(`/buyerpage/shop?user=${data.token}&id=${data.user._id}`);
      } else {
        setLoginError(true);
      }
    },
    onError: () => {
      setLoginError(true);
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const { from_email, from_password } = data;
    mutate({ email: from_email, password: from_password });
  };

  const handleToggle = () => {
    setVisible(!isVisible);
  };

  const handleGoogleRedirect = () => {
    window.open("http://localhost:5000/v1/auth/google", "_self");
  };
  return (
    <div className="sigup-user">
      <AnimatePresence>
        <div className="signup-input">
          <motion.div
            className="page-one"
            initial={{ x: "-100dvw" }}
            animate={{ x: 0 }}
            exit={{ x: "200dvw" }}
            transition={{ delay: 0.2, duration: 0.5, type: "tween" }}
          >
            <div className="page-one-title">
              <p>{t("LoginTxt")}</p>
            </div>
            <div className="page-one-input">
              <div className="input-box">
                <input
                  className={
                    "input-" + (errors?.from_email ? "show" : "hidden")
                  }
                  placeholder={t("email")}
                  {...register("from_email")}
                />
                {errors?.from_email &&
                  typeof errors.from_email !== "string" && (
                    <div className="error">
                      <img src={error} alt="error" />
                      <p>{errors.from_email?.message}</p>
                    </div>
                  )}
              </div>
              <div className="input-box">
                <input
                  className={
                    "input-" + (errors?.from_password ? "show" : "hidden")
                  }
                  placeholder={t("password")}
                  {...register("from_password")}
                  type={!isVisible ? "password" : "text"}
                />
                {errors?.from_password &&
                  typeof errors.from_password !== "string" && (
                    <div className="error">
                      <img src={error} alt="error" />
                      <p>{errors.from_password?.message}</p>
                    </div>
                  )}
              </div>
              <div className="login-error-message">
                {loginError && <p>Incorrect password or email.</p>}
              </div>
            </div>
            <div className="show-password">
              <input type="checkbox" name="show" onClick={handleToggle} />
              <p>{t("PasswordShowTxt")}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
              className="login-btn"
              onClick={handleSubmit(onSubmit)}
            >
              {t("LoginTxt")}
            </motion.button>
            <p
              className="forget-password"
              onClick={() => navigate("/account/page/password/request")}
            >
              {t("forgetPasswordTxt")}
            </p>
            <motion.div
              className="mobile-auth"
              onClick={handleGoogleRedirect}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src={google} alt="google-login" />
              <p>Google</p>
            </motion.div>
          </motion.div>
        </div>
      </AnimatePresence>
      <div className="signup-side-bar">
        <img
          src={t("logo") === "eng" ? logo : amhlogo}
          alt="logo"
          onClick={() => navigate("/")}
        />
        <h1>{t("heyTxt")}</h1>
        <p className="p-info">{t("bodyLoginTxt")}</p>
        <motion.div
          className="auth"
          onClick={handleGoogleRedirect}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img src={google} alt="google-login" />
          <p>Google</p>
        </motion.div>
        <p>{t("or")}</p>
        <motion.div
          className="auth-signin"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/account/page/1")}
        >
          <p>{t("homeTxtSignup")}</p>
        </motion.div>
      </div>
    </div>
  );
} 

export default SignIn;
