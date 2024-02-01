import { useMutation, useQuery } from "react-query";
import "./GiftPage.css";
import { getAGift, getAllGifts, updateGiftRating } from "../../hooks/giftHook";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { io, Socket } from "socket.io-client";
import { retrieveRooms } from "../../hooks/chatHook";
import { motion, AnimatePresence } from "framer-motion";
import { Rating } from "react-simple-star-rating";
import back from "../../assets/back.png";
import star from "../../assets/star.png";
import order from "../../assets/order.png";
import chat from "../../assets/chat.png";
import close from "../../assets/close.png";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../actions/authSlice";
import { useTranslation } from "react-i18next";

function GiftPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);
  const [modal, setModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  const gift = useQuery({
    queryKey: ["gift", id],
    //@ts-ignore
    queryFn: () => getAGift(id),
  });
  const user = useSelector((state: any) => state.auth.user);
  const buyerToken = useSelector((state: any) => state.auth.buyerToken);
  const room = useQuery(["rooms"], retrieveRooms);
  const gifts = useQuery(["all_gift"], getAllGifts);

  const rating = useMutation(updateGiftRating, {
    onSuccess: (data) => {
      gift.refetch();
      dispatch(
        setLogin({
          user: data.user,
          buyerToken,
        })
      );
      setLoadingModal(false);
    },
    onError: () => {
      console.log("rating error");
    },
  });
  const handleRating = (rate: number) => {
    gift.refetch();
    rating.mutate({
      data: {
        gift_id: gift?.data?._id,
        //@ts-ignore
        buyer_id: user?._id,
        rating_num: rate,
      },
      token: buyerToken,
    });
    setLoadingModal(true);
  };

  useEffect(() => {
    setSocket(io("https://merita.onrender.com/"));
  }, []);

  const handleChat = async (id: any) => {
    //@ts-ignore
    const buyer = user?.firstName + " " + user?.lastName;
    const seller = gift.data?.gift_client;
    //@ts-ignore
    const buyerId = user?._id;
    const sellerId = gift.data?.seller_id;
    const checkId = room?.data?.some(
      (item: any) => item.sellerId === sellerId && item.buyerId === buyerId
    );
    console.log(checkId);
    if (checkId) {
      const value = room?.data?.filter((obj: any) => obj.seller == seller);
      const roomId = value[0].roomId;
      socket?.emit("room", {
        roomId,
        buyer,
        seller,
        buyerId,
        sellerId,
        productId: id,
      });
      navigate(`/giftpage/${id}/room/${roomId}`);
    } else {
      const roomId = uuidv4();
      socket?.emit("room", {
        roomId,
        buyer,
        seller,
        buyerId,
        sellerId,
        productId: id,
      });
      navigate(`/giftpage/${id}/room/${roomId}`);
    }
    setModal(!modal);
  };
  const checkItemCategory = (item: any) => {
    if (item?.gift_category === gift?.data?.gift_category) {
      return true;
    } else {
      return false;
    }
  };
  const chatShadowVariant = {
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

  const chatInputVariant = {
    visible: { x: 0, transition: { delay: 0.4, type: "tween" } },
    hidden: { x: "100dvw", transition: { delay: 0.4, type: "tween" } },
    leave: { x: "100dvw", transition: { delay: 0.5, type: "tween" } },
  };

  return (
    <div className="gift-page">
      {loadingModal && (
        <div className="loading-modal">
          <div className="buyer-loader"></div>
        </div>
      )}
      <div className="gift-page-back-arrow">
        <img
          src={back}
          alt="back-arrow"
          onClick={() => navigate("/buyerpage/shop")}
        />
        <div className="social-share-links">
          <FacebookShareButton
            url={`http://localhost:5173/giftpage/${id}`}
            /*@ts-ignore */
            quote={`${gift?.data?.gift_description}`}
            hashtag={`#${gift?.data?.gift_category}`}
          >
            <FacebookIcon size={30} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            url={`http://localhost:5173/giftpage/${id}`}
            /*@ts-ignore */
            quote={`${gift?.data?.gift_description}`}
            hashtag={`#${gift?.data?.gift_category}`}
          >
            <TwitterIcon size={30} round={true} />
          </TwitterShareButton>
          <TelegramShareButton
            url={`http://localhost:5173/giftpage/${id}`}
            /*@ts-ignore */
            quote={`${gift?.data?.gift_description}`}
            hashtag={`#${gift?.data?.gift_category}`}
          >
            <TelegramIcon size={30} round={true} />
          </TelegramShareButton>
        </div>
      </div>
      {gift.isLoading ? (
        <div className="gift-all-loader">
          <div className="buyer-loader"></div>
        </div>
      ) : (
        <>
          <div className="gift-content">
            <div className="gift-image">
              <img
                src={
                  "https://merita.onrender.com" +
                  gift?.data?.gift_image.substring(6)
                }
                alt="content-image"
                crossOrigin="anonymous"
              />
            </div>
            <div className="gift-info">
              <div className="gift-name">{gift.data.gift_name}</div>
              <div className="gift-star">
                <p>{parseInt(gift.data.gift_star)}</p>
                {Array.from(
                  { length: gift.data.gift_star },
                  (_, index: number) => index
                ).map(() => (
                  <img src={star} alt="star" />
                ))}
              </div>
              <div className="gift-price">{gift.data.gift_price} Birr</div>
              {buyerToken ? (
                <>
                  <div className="gift-btn">
                    <button
                      onClick={() => {
                        navigate(`/giftpage/${id}/checkout`);
                      }}
                    >
                      <img src={order} alt="order" />
                      {t("buyerGiftPageorder")}
                    </button>
                    <button
                      onClick={(e: any) => {
                        e.preventDefault();
                        handleChat(id);
                      }}
                    >
                      <img src={chat} alt="chat" />
                      {t("buyerGiftPageChat")}
                    </button>
                  </div>
                  {/*@ts-ignore */}
                  {user?.rated_gifts.includes(gift?.data?._id) ? (
                    <p className="already_reviewed">
                      {t("buyerAlreadyReview")}
                    </p>
                  ) : (
                    <>
                      <p>{t("buyerRateProduct")}</p>
                      <Rating onClick={handleRating} />
                    </>
                  )}
                </>
              ) : (
                <p
                  className="order-to-login"
                  onClick={() => navigate("/account/login")}
                >
                  {t("buyerLoginSignup")}
                </p>
              )}

              <div className="gift-decription">
                {gift.data.gift_description}
              </div>
            </div>
          </div>
          <div className="gift-suggestion">
            <div className="gift-suggestion-title">
              <p>{t("buyerGoodGiftSuggestion")}</p>
            </div>
            <div className="gift-suggestion-list">
              {gifts?.data?.gifts
                ?.filter(checkItemCategory)
                .sort((a: any, b: any) => b.gift_star - a.gift_star)
                .slice(0, 3)
                .map((item: any) => (
                  <div
                    className="gift-suggestion-items"
                    onClick={() => navigate("/giftpage/" + item._id)}
                  >
                    <div className="gift-suggestion-item-image">
                      <img
                        src={
                          "https://merita.onrender.com" +
                          item.gift_image.substring(6)
                        }
                        alt="content-image"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="gift-suggestion-item-price">
                      {item.gift_price} Birr
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
      <AnimatePresence>
        {modal && (
          <div className="chat-modal">
            <motion.div
              className="chat-modal-shadow"
              onClick={() => {
                navigate(`/giftpage/${id}`);
                room.refetch();
                setModal(!modal);
              }}
              initial="hidden"
              animate="visible"
              exit="leave"
              variants={chatShadowVariant}
            >
              .
            </motion.div>
            <motion.div
              className="chat-modal-input"
              initial="hidden"
              animate="visible"
              exit="leave"
              variants={chatInputVariant}
            >
              <div className="chat-modal-input-close">
                <button
                  onClick={() => {
                    navigate(`/giftpage/${id}`);
                    room.refetch();
                    setModal(!modal);
                  }}
                >
                  <img src={close} alt="close" />
                </button>
              </div>
              <div className="chat">
                <Outlet context={{ socket, receiver: gift.data?.seller_id }} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GiftPage;
