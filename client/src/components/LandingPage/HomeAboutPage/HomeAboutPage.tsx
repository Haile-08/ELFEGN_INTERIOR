import { motion } from "framer-motion";
import "../HomeGiftPage/HomeGiftPage.css";
import telegram from "../../../assets/telegram.png";
import facebook from "../../../assets/facebook.png";
import instagram from "../../../assets/instagram.png";
import logo from "../../../assets/logo.svg";
import amhlogo from "../../../assets/amhlogo.svg";
import back from "../../../assets/back-icon.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HomeAboutPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <motion.div
      className="home-gift-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 0.5, type: "tween" }}
    >
      <div className="home-gift-side">
        <div className="home-gift-side-social">
          <img src={telegram} alt="telegram" />
          <img src={facebook} alt="facebook" />
          <img src={instagram} alt="instagram" className="instagram" />
        </div>
      </div>
      <div className="home-gift-home">
        <div className="home-gift-home-nav">
          <img
            src={t("logo") === "eng" ? logo : amhlogo}
            alt="logo"
            onClick={() => navigate("/")}
          />
          <div className="nav-center">
            <p>{t("homeTxtAbout")}</p>
          </div>
          <div className="nav-right">
            <img src={back} alt="search" onClick={() => navigate("/")} />
          </div>
        </div>
        <div className="gift-landing-page-blogs">
          <motion.div
            className="about-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5, type: "tween" }}
          >
            <div className="about-bar">
              <div className="about-description">
                <h1>{t("aboutHeader")}</h1>
                <hr />
                <p>
                  {t("aboutBody1")}
                  <br />
                  <br />
                  {t("aboutBody2")}
                  <br /> <br /> {t("aboutBody3")} <br />
                  <br />
                  {t("aboutBody4")}
                  <br /> <br /> {t("aboutBody5")}
                </p>
              </div>
              <div className="about-education">
                <h1>{t("aboutTxtContact")}</h1>
                <hr />
                <div className="edu">
                  <p>{t("aboutTxtPhone")}: +2519354544</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default HomeAboutPage;
