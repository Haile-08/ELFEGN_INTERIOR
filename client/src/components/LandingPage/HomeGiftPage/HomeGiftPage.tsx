import "./HomeGiftPage.css";
import logo from "../../../assets/logo.svg";
import back from "../../../assets/back-icon.png";
import star from "../../../assets/star.png";
import telegram from "../../../assets/telegram.png";
import tiktok from "../../../assets/tiktok.png";
import youtube from "../../../assets/youtube.png";
import instagram from "../../../assets/instagram.png";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAllProduct } from "../../../hooks/productHook";

function HomeGiftPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const product = useQuery(["product"], getAllProduct);

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
            <p>{t("homeTxtGift")}</p>
          </div>
          <div className="nav-right">
            <img src={back} alt="search" onClick={() => navigate("/")} />
          </div>
        </div>
        <div className="gift-landing-page">
          {product?.data?.slice(0, 6).map((gift: any, index: number) => (
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
                    "http://localhost:5000/" + gift.image.substring(6)
                  }
                  alt="image"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="gift-landing-page-info">
                <div className="gift-landing-page-info-name">
                  {gift.name}
                </div>
                <div className="gift-landing-page-info-stars">
                  {Array.from(
                    { length: gift.star },
                    (_, index: number) => index
                  ).map(() => (
                    <img src={star} alt="star" />
                  ))}
                </div>
                <div className="gift-landing-page-info-price">
                  {gift.price} birr
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
