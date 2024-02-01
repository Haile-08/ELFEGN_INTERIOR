import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./SellerPage.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.svg";
import amhlogo from "../../assets/amhlogo.svg";
import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";
import exit from "../../assets/exit.png";
import { logout } from "../../hooks/authHook";
import { useMutation } from "react-query";
import { io, Socket } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setLogout } from "../../actions/authSlice";
import "../BuyerPage/BuyerPage.css";
import { useTranslation } from "react-i18next";
import { MdOutlineLanguage } from "react-icons/md";

function SellerPage() {
  const [modal, setModal] = useState(false);
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setSocket(io("https://merita.onrender.com"));
  }, []);

  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      console.log("logout success");
    },
    onError: () => {
      console.log("logout error");
    },
  });

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

  return (
    <div className="seller">
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
                <div className="seller-sidebar">
                  <div
                    className="seller-sidebar-list-pages"
                    onClick={() => navigate("/sellerpage/profile")}
                  >
                    {t("navProfileTXt")}
                  </div>
                  <div
                    className="seller-sidebar-list-pages"
                    onClick={() => navigate("/sellerpage/order")}
                  >
                    {t("navOrderTxt")}
                  </div>
                  <div
                    className="seller-sidebar-list-pages"
                    onClick={() => navigate("/sellerpage/message")}
                  >
                    {t("navMessageTxt")}
                  </div>
                  <div
                    className="seller-sidebar-list-pages"
                    onClick={() => navigate("/sellerpage/gift")}
                  >
                    {t("navGiftsTxt")}
                  </div>
                  <div
                    className="seller-sidebar-list-pages"
                    onClick={() => navigate("/sellerpage/withdraw")}
                  >
                    {t("navWithdrawTxt")}
                  </div>
                </div>
              </div>
              <div className="buyer-sidebar-nav">
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
                      <img
                        src={plus}
                        alt="plus"
                        onClick={() => {
                          console.log("disconnect");
                          socket?.emit("disconnect", { roomId });
                          navigate("/sellerpage/");
                        }}
                      />
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

                  <button
                    onClick={() => {
                      dispatch(setLogout());
                      mutate();
                      navigate("/account/login");
                    }}
                  >
                    <img src={exit} alt="exit" />
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

      <div className="seller-main">
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
        <Outlet context={{ socket }} />
      </div>
    </div>
  );
}

export default SellerPage;
