import { useMutation, useQuery } from "react-query";
import "./GiftPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Rating } from "react-simple-star-rating";
import back from "../../assets/back.png";
import star from "../../assets/star.png";
import order from "../../assets/order.png";
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
import { getAProduct, getAllProduct, updateProductRating } from "../../hooks/productHook";

function GiftPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const [loadingModal, setLoadingModal] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.userToken);
  

  const product = useQuery({
    queryKey: ["gift", id],
    //@ts-ignore
    queryFn: () => getAProduct({id, token}),
  });
  const products = useQuery(["all_gift"], getAllProduct);

  const rating = useMutation(updateProductRating, {
    onSuccess: (data) => {
      product.refetch();
      dispatch(
        setLogin({
          user: data.user,
          userToken: token,
        })
      );
      setLoadingModal(false);
    },
    onError: () => {
      console.log("rating error");
    },
  });
  const handleRating = (rate: number) => {
    product.refetch();
    rating.mutate({
      data: {
        product_id: product?.data?._id,
        //@ts-ignore
        buyer_id: user?._id,
        rating_num: rate,
      },
      token,
    });
    setLoadingModal(true);
  };

  
  const checkItemCategory = (item: any) => {
    if (item?.category === product?.data?.category) {
      return true;
    } else {
      return false;
    }
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
          onClick={() => navigate("/buyerpage/shop?user=null")}
        />
        <div className="social-share-links">
          <FacebookShareButton
            url={`http://localhost:5173/giftpage/${id}`}
            /*@ts-ignore */
            quote={`${product?.data?.description}`}
            hashtag={`#${product?.data?.category}`}
          >
            <FacebookIcon size={30} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            url={`http://localhost:5173/giftpage/${id}`}
            /*@ts-ignore */
            quote={`${product?.data?.description}`}
            hashtag={`#${product?.data?.gift_category}`}
          >
            <TwitterIcon size={30} round={true} />
          </TwitterShareButton>
          <TelegramShareButton
            url={`http://localhost:5173/giftpage/${id}`}
            /*@ts-ignore */
            quote={`${product?.data?.description}`}
            hashtag={`#${product?.data?.gift_category}`}
          >
            <TelegramIcon size={30} round={true} />
          </TelegramShareButton>
        </div>
      </div>
      {product.isLoading ? (
        <div className="gift-all-loader">
          <div className="buyer-loader"></div>
        </div>
      ) : (
        <>
          <div className="gift-content">
            <div className="gift-image">
              <img
                src={
                  "https://elfegn.onrender.com/" +
                  product?.data?.image.substring(6)
                }
                alt="content-image"
                crossOrigin="anonymous"
              />
            </div>
            <div className="gift-info">
              <div className="gift-name">{product.data.name}</div>
              <div className="gift-star">
                <p>{parseInt(product.data.star)}</p>
                {Array.from(
                  { length: product.data.star },
                  (_, index: number) => index
                ).map(() => (
                  <img src={star} alt="star" />
                ))}
              </div>
              <div className="gift-price">{product.data.price} Birr</div>
              {token ? (
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
                  </div>
                  {/*@ts-ignore */}
                  {user?.rated_gifts.includes(product?.data?._id) ? (
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
                {product.data.description}
              </div>
            </div>
          </div>
          <div className="gift-suggestion">
            <div className="gift-suggestion-title">
              <p>{t("buyerGoodGiftSuggestion")}</p>
            </div>
            <div className="gift-suggestion-list">
              {products?.data?.filter(checkItemCategory)
                .sort((a: any, b: any) => b.star - a.star)
                .slice(0, 3)
                .map((item: any) => (
                  <div
                    className="gift-suggestion-items"
                    onClick={() => navigate("/giftpage/" + item._id)}
                  >
                    <div className="gift-suggestion-item-image">
                      <img
                        src={
                          "https://elfegn.onrender.com/" +
                          item.image.substring(6)
                        }
                        alt="content-image"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="gift-suggestion-item-price">
                      {item.price} Birr
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default GiftPage;
