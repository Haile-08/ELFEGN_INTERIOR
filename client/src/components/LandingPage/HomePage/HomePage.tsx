import "./HomePage.css";
import logo from "../../../assets/logo.svg";
import chair from "../../../assets/chair.png"
import search from "../../../assets/search.png";
import telegram from "../../../assets/telegram.png";
import instagram from "../../../assets/instagram.png";
import tiktok from "../../../assets/tiktok.png";
import youtube from "../../../assets/youtube.png";
import close from "../../../assets/close.png";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { MdOutlineLanguage } from "react-icons/md";
import { getAllProduct } from "../../../hooks/productHook";

function HomePage() {
  const navigate = useNavigate();
  const [searchModal, setSearchModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState();
  const { t, i18n } = useTranslation();

  const product = useQuery(["product"], getAllProduct);
  console.log(product)

  const startsWith = (str: any) => (word: any) =>
    str ? word.slice(0, str.length).toLowerCase() === str.toLowerCase() : false;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const searchShadowVariant = {
    visible: {
      opacity: 0.3,
      width: "65dvw",
      transition: { delay: 0.5, type: "tween" },
    },
    hidden: {
      opacity: 0,
      width: "100dvw",
      transition: { delay: 0.5, type: "tween" },
    },
    leave: {
      opacity: 0,
      width: "100dvw",
      transition: { delay: 0.5, type: "tween" },
    },
  };

  const searchInputVariant = {
    visible: { x: 0, transition: { delay: 0.4, type: "tween" } },
    hidden: { x: "100dvw", transition: { delay: 0.4, type: "tween" } },
    leave: { x: "100dvw", transition: { delay: 0.5, type: "tween" } },
  };

  const handleSearchNav = (id: string) => {
    navigate(`/giftpage/${id}`);
  };

  const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
    console.log(i18n.language);
  };

  return loading ? (
    <div className="isLoading">
      <div className="loader-home"></div>
    </div>
  ) : (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 0.5, type: "tween" }}
    >
      {" "}
      <AnimatePresence>
        {searchModal && (
          <div className="search-modal">
            <motion.div
              className="search-modal-shadow"
              onClick={() => setSearchModal(!searchModal)}
              initial="hidden"
              animate="visible"
              exit="leave"
              variants={searchShadowVariant}
            >
              .
            </motion.div>
            <motion.div
              className="search-modal-input"
              initial="hidden"
              animate="visible"
              exit="leave"
              variants={searchInputVariant}
            >
              <div className="search-modal-input-close">
                <button onClick={() => setSearchModal(!searchModal)}>
                  <img src={close} alt="close" />
                </button>
              </div>
              <div className="search-modal-input-search">
                <form>
                  <div className="search">
                    <input
                      type="text"
                      className="searchTerm"
                      placeholder={t("search") + "..."}
                      onChange={(e: any) => setSearchString(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="search-res-list">
                {product?.data
                  ?.sort((a: any, b: any) => b.star - a.star)
                  .slice(0, 4)
                  ?.filter((gift: any) =>
                    startsWith(searchString)(gift.name)
                  )
                  .map((gift: any, index: number) => (
                    <div
                      className="search-modal-input-res"
                      key={index}
                      onClick={() => handleSearchNav(gift._id)}
                    >
                      <div className="search-modal-input-res-image">
                        <img
                          src={
                            "http://localhost:5000/" +
                            gift.image.substring(6)
                          }
                          alt="image"
                          crossOrigin="anonymous"
                        />
                      </div>
                      <div className="search-modal-input-info">
                        <div className="search-modal-input-info-gift-name">
                          {gift.name}
                        </div>
                        <div className="search-modal-input-info-gift-price">
                          {gift.price}birr
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="home-page-side">
        <img
            src={ logo }
            alt="logo"
            onClick={() => navigate("/home")}
          />
        <div className="home-page-side-info">
          <p onClick={() => navigate("/gift")}>{t("homeTxtGift")}</p>
          <p onClick={() => navigate("/testimonial")}>
            {t("homeTxtTestimonials")}
          </p>
        </div>
      </div>
      <div className="home-page-home">
        <div className="home-page-home-nav">
          
          <div className="nav-center">
            <p onClick={() => navigate("/account/page/1")}>
              {t("homeTxtSignup")}
            </p>
            <p onClick={() => navigate("/account/login")}>
              {t("homeTxtSignin")}
            </p>
            <p onClick={() => navigate("/blogs")}>{t("homeTxtBlog")}</p>
          </div>
          <div className="nav-right">
            <img
              src={search}
              alt="search"
              onClick={() => setSearchModal(!searchModal)}
            />
            
            <div className="language">
              <select value={i18n.language} onChange={onChangeLang}>
                <option value="eng">English</option>
                <option value="amh">አማርኛ</option>
              </select>
              <MdOutlineLanguage className="lang-icon" />
            </div>
          </div>
        </div>
        <div className="home-page-home-info">
          <div className="info">
          <h1>{t("homeIntro")}</h1>
          <p>{t("homeWelcome")}</p>
          <button onClick={() => navigate("/gift")}>{t("homeTxtShop")}</button>
          </div>
          <div className="glass">
            <div className="morph">
              <img src={chair} alt="item" />
            </div>
          </div>
        </div>
        <div className="home-social">
          <div className="home-page-side-social">
          <img src={telegram} alt="telegram" />
          <img src={instagram} alt="instagram"/>
          <img src={tiktok} alt="tiktok" />
          <img src={youtube} alt="youtube" />
        </div> 
          </div>
      </div>
    </motion.div>
  );
}

export default HomePage;
