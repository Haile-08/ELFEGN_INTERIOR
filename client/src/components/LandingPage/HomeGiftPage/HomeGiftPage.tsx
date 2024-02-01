import "./HomeGiftPage.css";
import logo from "../../../assets/logo.svg";
import amhlogo from "../../../assets/amhlogo.svg";
import back from "../../../assets/back-icon.png";
import star from "../../../assets/star.png";
import telegram from "../../../assets/telegram.png";
import facebook from "../../../assets/facebook.png";
import instagram from "../../../assets/instagram.png";
import { useQuery } from "react-query";
import { getAllGifts } from "../../../hooks/giftHook";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HomeGiftPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const gifts = useQuery(["gift"], getAllGifts);

  const handleSearchNav = (id: string) => {
    navigate(`/giftpage/${id}`);
  };
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
            <p>{t("homeTxtGift")}</p>
          </div>
          <div className="nav-right">
            <img src={back} alt="search" onClick={() => navigate("/")} />
          </div>
        </div>
        <div className="gift-landing-page">
          {gifts?.data?.gifts.slice(0, 6).map((gift: any, index: number) => (
            <motion.div
              className="gift-landing-page-gift"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 1.2 }}
              onClick={() => handleSearchNav(gift._id)}
              key={index}
            >
              <div className="gift-landing-page-image">
                <img
                  src={
                    "https://merita.onrender.com" + gift.gift_image.substring(6)
                  }
                  alt="image"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="gift-landing-page-info">
                <div className="gift-landing-page-info-name">
                  {gift.gift_name}
                </div>
                <div className="gift-landing-page-info-stars">
                  {Array.from(
                    { length: gift.gift_star },
                    (_, index: number) => index
                  ).map(() => (
                    <img src={star} alt="star" />
                  ))}
                </div>
                <div className="gift-landing-page-info-price">
                  {gift.gift_price} birr
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default HomeGiftPage;
