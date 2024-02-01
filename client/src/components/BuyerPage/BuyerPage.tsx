import { useState } from "react";
import "./BuyerPage.css";
import { useMutation } from "react-query";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import amhlogo from "../../assets/amhlogo.svg";
import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";
import exit from "../../assets/exit.png";
import order from "../../assets/package.png";
import store from "../../assets/store.png";
import profile from "../../assets/user.png";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "../../hooks/authHook";
import { useDispatch } from "react-redux";
import { setLogout } from "../../actions/authSlice";
import { useTranslation } from "react-i18next";
import { MdOutlineLanguage } from "react-icons/md";

function BuyerPage() {
  const [modal, setModal] = useState(false);
  const [priceTag, setPriceTag] = useState("all");
  const [dateTag, setDateTag] = useState("all");
  const [starTag, setStarTag] = useState("all");
  const [categoryTag, setCategoryTag] = useState("all");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      console.log("logout success");
    },
    onError: () => {
      console.log("logout error");
    },
  });

  interface Item {
    gift_price: number;
    gift_date: string;
    gift_star: number;
    gift_category: string;
    // Other properties of the item object
  }

  const checkPrice = (item: Item) => {
    if (priceTag === "all") {
      return true;
    } else if (priceTag === "greater-than-1000") {
      return item.gift_price > 1000;
    } else if (priceTag === "less-than-1000") {
      return item.gift_price <= 1000 && item.gift_price >= 500;
    } else if (priceTag === "less-than-500") {
      return item.gift_price < 500 && item.gift_price >= 100;
    } else if (priceTag === "less-than-100") {
      return item.gift_price < 100 && item.gift_price >= 1;
    } else {
      return true;
    }
  };

  const checkDate = (item: Item) => {
    const dateToday = new Date();
    const giftDate = new Date(item.gift_date);
    if (dateTag === "all") {
      return true;
    } else if (dateTag === "less-than-24") {
      return dateToday === giftDate;
    } else if (dateTag === "less-than-week") {
      const oneWeekAgo = new Date(
        dateToday.getTime() - 7 * 24 * 60 * 60 * 1000
      );
      return giftDate > oneWeekAgo;
    } else if (dateTag === "less-than-month") {
      const oneMonthAgo = new Date(
        dateToday.getFullYear(),
        dateToday.getMonth() - 1,
        dateToday.getDate()
      );
      return giftDate > oneMonthAgo;
    } else if (dateTag === "less-than-year") {
      const oneYearAgo = new Date(
        dateToday.getFullYear() - 1,
        dateToday.getMonth(),
        dateToday.getDate()
      );
      return giftDate > oneYearAgo;
    } else if (dateTag === "greater-than-year") {
      const oneYearAgo = new Date(
        dateToday.getFullYear() - 1,
        dateToday.getMonth(),
        dateToday.getDate()
      );
      return giftDate < oneYearAgo;
    } else {
      return true;
    }
  };

  const checkStar = (item: Item) => {
    if (starTag === "all") {
      return true;
    } else if (starTag === "star-5") {
      return item.gift_star == 5;
    } else if (starTag === "star-4") {
      return item.gift_star == 4;
    } else if (starTag === "star-3") {
      return item.gift_star == 3;
    } else if (starTag === "star-2") {
      return item.gift_star == 2;
    } else if (starTag === "star-1") {
      return item.gift_star == 1;
    } else {
      return true;
    }
  };

  const checkCategory = (item: Item) => {
    if (categoryTag === "all") {
      return true;
    } else if (categoryTag === "Personalized") {
      return item.gift_category === "Personalized";
    } else if (categoryTag === "Home Décor") {
      return item.gift_category === "Home Décor";
    } else if (categoryTag === "Tech Gadgets") {
      return item.gift_category === "Tech Gadgets";
    } else if (categoryTag === "Fashion") {
      return item.gift_category === "Fashion";
    } else if (categoryTag === "others") {
      return item.gift_category === "others";
    } else {
      return true;
    }
  };

  const searchShadowVariant = {
    visible: {
      opacity: 0.3,
      width: "100dvw",
      transition: { delay: 0.5, type: "tween" },
    },
    hidden: {
      opacity: 0,
      width: "200dvw",
      transition: { delay: 0.5, type: "tween" },
    },
    leave: {
      opacity: 0,
      width: "200dvw",
      transition: { delay: 0.5, type: "tween" },
    },
  };

  const navInputVariant = {
    visible: { x: 0, transition: { delay: 0.4, type: "tween" } },
    hidden: { x: "-100dvw", transition: { delay: 0.4, type: "tween" } },
    leave: { x: "-100dvw", transition: { delay: 0.5, type: "tween" } },
  };

  const navTwoInputVariant = {
    visible: { x: 0, transition: { delay: 0.3, type: "tween" } },
    hidden: { x: "-100dvw", transition: { delay: 0.3, type: "tween" } },
    leave: { x: "-100dvw", transition: { delay: 0.3, type: "tween" } },
  };

  const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
  };

  console.log(t("logo"))

  return (
    <div className="buyer">
      <>
        <AnimatePresence>
          {modal && (
            <>
              <motion.div
                className="buyer-sidebar"
                initial="hidden"
                animate="visible"
                exit="leave"
                variants={navInputVariant}
              >
                <div className="buyer-sidebar-filter">
                  <div className="buyer-tag">
                    <p className="buyer-tag-title">{t("buyerPriceGift")}</p>
                    <div className="price-tag">
                      <input
                        type="radio"
                        name="price"
                        onChange={(e) => {
                          e.preventDefault;
                          setPriceTag("greater-than-1000");
                        }}
                      />
                      <p>{t("buyerGreaterThan1000")}</p>
                    </div>
                    <div className="price-tag">
                      <input
                        type="radio"
                        name="price"
                        onChange={(e) => {
                          e.preventDefault;
                          setPriceTag("less-than-1000");
                        }}
                      />
                      <p>{t("buyerLessThan1000")}</p>
                    </div>
                    <div className="price-tag">
                      <input
                        type="radio"
                        name="price"
                        onChange={(e) => {
                          e.preventDefault;
                          setPriceTag("less-than-500");
                        }}
                      />
                      <p>{t("buyerLessThan500")}</p>
                    </div>
                    <div className="price-tag">
                      <input
                        type="radio"
                        name="price"
                        onChange={(e) => {
                          e.preventDefault;
                          setPriceTag("less-than-100");
                        }}
                      />
                      <p>{t("buyer1to100")}</p>
                    </div>
                    <div className="price-tag">
                      <input
                        type="radio"
                        name="price"
                        onChange={(e) => {
                          e.preventDefault;
                          setPriceTag("all");
                        }}
                      />
                      <p>{t("buyerAllPrice")}</p>
                    </div>
                  </div>
                  <div className="buyer-tag">
                    <p className="buyer-tag-title">{t("buyerDateOfGift")}</p>
                    <div className="date-tag">
                      <input
                        type="radio"
                        name="date"
                        onChange={(e) => {
                          e.preventDefault;
                          setDateTag("less-than-24");
                        }}
                      />
                      <p>{t("buyerLessThan24")}</p>
                    </div>
                    <div className="date-tag">
                      <input
                        type="radio"
                        name="date"
                        onChange={(e) => {
                          e.preventDefault;
                          setDateTag("less-than-week");
                        }}
                      />
                      <p>{t("buyerLessThanAWeek")}</p>
                    </div>
                    <div className="date-tag">
                      <input
                        type="radio"
                        name="date"
                        onChange={(e) => {
                          e.preventDefault;
                          setDateTag("less-than-month");
                        }}
                      />
                      <p>{t("buyerLessThanAMonth")}</p>
                    </div>
                    <div className="date-tag">
                      <input
                        type="radio"
                        name="date"
                        onChange={(e) => {
                          e.preventDefault;
                          setDateTag("less-than-year");
                        }}
                      />
                      <p>{t("buyerLessThanAYear")}</p>
                    </div>
                    <div className="date-tag">
                      <input
                        type="radio"
                        name="date"
                        onChange={(e) => {
                          e.preventDefault;
                          setDateTag("greater-than-year");
                        }}
                      />
                      <p>{t("buyerGreaterThanAYear")}</p>
                    </div>
                    <div className="date-tag">
                      <input
                        type="radio"
                        name="date"
                        onChange={(e) => {
                          e.preventDefault;
                          setDateTag("all");
                        }}
                      />
                      <p>{t("buyerAllDate")}</p>
                    </div>
                  </div>
                  <div className="buyer-tag">
                    <p className="buyer-tag-title">{t("buyerStarGift")}</p>
                    <div className="star-tag">
                      <input
                        type="radio"
                        name="star"
                        onChange={(e) => {
                          e.preventDefault;
                          setStarTag("star-5");
                        }}
                      />
                      <p>{t("buyer5Star")}</p>
                    </div>
                    <div className="star-tag">
                      <input
                        type="radio"
                        name="star"
                        onChange={(e) => {
                          e.preventDefault;
                          setStarTag("star-4");
                        }}
                      />
                      <p>{t("buyer4Star")}</p>
                    </div>
                    <div className="star-tag">
                      <input
                        type="radio"
                        name="star"
                        onChange={(e) => {
                          e.preventDefault;
                          setStarTag("star-3");
                        }}
                      />
                      <p>{t("buyer3Star")}</p>
                    </div>
                    <div className="star-tag">
                      <input
                        type="radio"
                        name="star"
                        onChange={(e) => {
                          e.preventDefault;
                          setStarTag("star-2");
                        }}
                      />
                      <p>{t("buyer2Star")}</p>
                    </div>
                    <div className="star-tag">
                      <input
                        type="radio"
                        name="star"
                        onChange={(e) => {
                          e.preventDefault;
                          setStarTag("star-1");
                        }}
                      />
                      <p>{t("buyer1Star")}</p>
                    </div>
                    <div className="star-tag">
                      <input
                        type="radio"
                        name="star"
                        onChange={(e) => {
                          e.preventDefault;
                          setStarTag("all");
                        }}
                      />
                      <p>{t("buyerallStar")}</p>
                    </div>
                  </div>
                  <div className="buyer-tag">
                    <p className="buyer-tag-title">{t("buyerGiftCategory")}</p>
                    <div className="category-tag">
                      <input
                        type="radio"
                        name="category"
                        onChange={(e) => {
                          e.preventDefault;
                          setCategoryTag("Personalized");
                        }}
                      />
                      <p>{t("giftCategory1")}</p>
                    </div>
                    <div className="category-tag">
                      <input
                        type="radio"
                        name="category"
                        onChange={(e) => {
                          e.preventDefault;
                          setCategoryTag("Home Décor");
                        }}
                      />
                      <p>{t("giftCategory2")}</p>
                    </div>
                    <div className="category-tag">
                      <input
                        type="radio"
                        name="category"
                        onChange={(e) => {
                          e.preventDefault;
                          setCategoryTag("Tech Gadgets");
                        }}
                      />
                      <p>{t("giftCategory3")}</p>
                    </div>

                    <div className="category-tag">
                      <input
                        type="radio"
                        name="category"
                        onChange={(e) => {
                          e.preventDefault;
                          setCategoryTag("Fashion");
                        }}
                      />
                      <p>{t("giftCategory5")}</p>
                    </div>
                    <div className="category-tag">
                      <input
                        type="radio"
                        name="category"
                        onChange={(e) => {
                          e.preventDefault;
                          setCategoryTag("others");
                        }}
                      />
                      <p>{t("giftCategory6")}</p>
                    </div>
                    <div className="category-tag">
                      <input
                        type="radio"
                        name="category"
                        onChange={(e) => {
                          e.preventDefault;
                          setCategoryTag("all");
                        }}
                      />
                      <p>{t("buyerallStar")}</p>
                    </div>
                  </div>
                </div>
                <div className="buyer-sidebar-nav">
                  <div className="buyer-sidebar-nav-logo">
                    <img src={t("logo") === "eng" ? logo : amhlogo} alt="logo" onClick={() => navigate("/")} />
                  </div>
                  <div className="buyer-sidebar-nav-plus">
                    <div
                      className="buyer-sidebar-nav-plus-box"
                      onClick={() => setModal(!modal)}
                    >
                      {modal ? (
                        <img src={minus} alt="minus" />
                      ) : (
                        <img src={plus} alt="plus" />
                      )}
                    </div>
                  </div>
                  <div className="buyer-sidebar-nav-btns">
                    <div className="lang">
                      <select value={i18n.language} onChange={onChangeLang}>
                        <option value="eng">English</option>
                        <option value="amh">አማርኛ</option>
                      </select>
                      <MdOutlineLanguage className="lang-icon" />
                    </div>
                    <button onClick={() => navigate("/buyerpage/profile")}>
                      <img src={profile} alt="profile" />
                      <p>{t("navProfileTXt")}</p>
                    </button>
                    <button onClick={() => navigate("/buyerpage/shop")}>
                      <img src={store} alt="store" />
                      <p>{t("buyerStore")}</p>
                    </button>
                    <button onClick={() => navigate("/buyerpage/order")}>
                      <img src={order} alt="cart" />
                      <p>{t("navOrderTxt")}</p>
                    </button>
                    <button
                      onClick={() => {
                        dispatch(setLogout());
                        mutate();
                        navigate("/account/login");
                      }}
                    >
                      <img src={exit} alt="exit" />
                      <p>{t("buyerLogout")}</p>
                    </button>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="buyer-sidebar-nav-shadow"
                onClick={() => setModal(!modal)}
                initial="hidden"
                animate="visible"
                exit="leave"
                variants={searchShadowVariant}
              >
                .
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <div className="buyer-gift-lists">
          <AnimatePresence>
            {!modal && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="leave"
                variants={navTwoInputVariant}
                className="buyer-sidebar-nav-two"
              >
                <div className="buyer-sidebar-nav-logo">
                  <img
                    src={t("logo") === "eng" ? logo : amhlogo}
                    alt="logo"
                    onClick={() => navigate("/")}
                  />
                </div>
                <div className="buyer-sidebar-nav-plus">
                  <div
                    className="buyer-sidebar-nav-plus-box"
                    onClick={() => setModal(!modal)}
                  >
                    {modal ? (
                      <img src={minus} alt="minus" />
                    ) : (
                      <img src={plus} alt="plus" />
                    )}
                  </div>
                </div>
                <div className="buyer-sidebar-nav-btns"></div>
              </motion.div>
            )}
          </AnimatePresence>
          <Outlet
            context={{ checkPrice, checkDate, checkStar, checkCategory }}
          />
        </div>
      </>
    </div>
  );
}

export default BuyerPage;
