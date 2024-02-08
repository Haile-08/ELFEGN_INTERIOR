import { Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.svg";
import google from "../../assets/google-login.png";
import "./Signup.css";
import { useTranslation } from "react-i18next";

function Signup() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoogleRedirect = () => {
    window.open("http://localhost:5000/v1/auth/google", "_self");
  };
  return (
    <div className="sigup-user">
      <AnimatePresence>
        <div className="signup-input">
          <Outlet />
        </div>
      </AnimatePresence>
      <div className="signup-side-bar">
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
        />
        <h1>{t("signupIntroTxt")}</h1>
        <p className="p-info">{t("signupBodyTxt")}</p>
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
          onClick={() => navigate("/account/login")}
        >
          <p>{t("homeTxtSignin")}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
