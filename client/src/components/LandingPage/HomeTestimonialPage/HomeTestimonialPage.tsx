import "../HomeGiftPage/HomeGiftPage.css";
import telegram from "../../../assets/telegram.png";
import tiktok from "../../../assets/tiktok.png";
import youtube from "../../../assets/youtube.png";
import instagram from "../../../assets/instagram.png";
import logo from "../../../assets/logo.svg";
import back from "../../../assets/back-icon.png";
import star from "../../../assets/star.png";
import hermi from "../../../assets/hermi.jpg";
import bini from "../../../assets/bina.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HomeTestimonialPage() {
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
          <img
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
          />
        <div className="home-gift-side-social">
          <img src={telegram} alt="telegram" />
          <img src={instagram} alt="instagram"/>
          <img src={tiktok} alt="tiktok" />
          <img src={youtube} alt="youtube" />
        </div>
      </div>
      <div className="home-gift-home">
        <div className="home-gift-home-nav">
          <div className="nav-center">
            <p>{t("homeTxtTestimonials")}</p>
          </div>
          <div className="nav-right">
            <img src={back} alt="search" onClick={() => navigate("/")} />
          </div>
        </div>
        <div className="gift-landing-page">
          <motion.div
            className="testimonial-page-user"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 1.2 }}
          >
            <div className="testimonial-page-user-image">
              <img src={bini} alt="user" />
            </div>
            <div className="testimonial-page-user-testimonial">
              Found my dream gift on merita, would 100% recommend it.
            </div>
            <div className="testimonial-page-user-star">
              {Array.from({ length: 5 }, (_, index: number) => index).map(
                () => (
                  <img src={star} alt="star" />
                )
              )}
            </div>
          </motion.div>
          <motion.div
            className="testimonial-page-user"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 1.2 }}
          >
            <div className="testimonial-page-user-image">
              <img src={hermi} alt="user" />
            </div>
            <div className="testimonial-page-user-testimonial">
              Really beautiful site.
            </div>
            <div className="testimonial-page-user-star">
              {Array.from({ length: 4 }, (_, index: number) => index).map(
                () => (
                  <img src={star} alt="star" />
                )
              )}
            </div>
          </motion.div>
          <motion.div
            className="testimonial-page-user"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 1.2 }}
          >
            <div className="testimonial-page-user-image">
              <img src={bini} alt="user" />
            </div>
            <div className="testimonial-page-user-testimonial">
              Easy interface especially the chat functionality.
            </div>
            <div className="testimonial-page-user-star">
              {Array.from({ length: 5 }, (_, index: number) => index).map(
                () => (
                  <img src={star} alt="star" />
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default HomeTestimonialPage;
