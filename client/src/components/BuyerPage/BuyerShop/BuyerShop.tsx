import "./BuyerShop.css";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { getGifts } from "../../../hooks/giftHook";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../actions/authSlice";

function BuyerShop() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const { isLoading, data, isPreviousData, refetch } = useQuery({
    queryKey: ["gifts", page],
    queryFn: () => getGifts(page),
    keepPreviousData: true,
  });
  const { checkPrice, checkDate, checkStar, checkCategory }: any =
    useOutletContext();
    const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  interface GiftItem {
    _id: string;
    gift_image: string;
    gift_name: string;
    gift_price: string;
  }

  useEffect(() => {
    const token = searchParams.get('tokenid');
    if(token != "null"){
      dispatch(setLogin({
        userToken: token,
      }))
    }
    console.log("token admin",token)
    refetch();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="buyer-loader"></div>
      ) : (
        <div className="buyer-gift-list-items">
          <div className="buyer-gift-list-items-all">
            {data?.gifts
              ?.filter(checkPrice)
              ?.filter(checkDate)
              ?.filter(checkStar)
              ?.filter(checkCategory)
              ?.map((item: GiftItem, index: number) => (
                <motion.div
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 1.2 }}
                  key={index}
                >
                  <div
                    className="buyer-gift-card"
                    key={index}
                    onClick={() => navigate("/giftpage/" + item._id)}
                  >
                    <img
                      src={
                        "https://merita.onrender.com" +
                        item.gift_image.substring(6)
                      }
                      alt="image"
                      crossOrigin="anonymous"
                    />
                    <div className="buyer-gift-name">{item.gift_name}</div>
                    <div className="buyer-gift-price">
                      {item.gift_price}Birr
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
          <div className="buyer-list-pagination">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 0}
            >
              {t("previous")}
            </button>
            <p>{page}</p>
            <button
              onClick={() => {
                if (!isPreviousData && data?.hasMore) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={isPreviousData || !data?.hasMore}
            >
              {t("next")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BuyerShop;
