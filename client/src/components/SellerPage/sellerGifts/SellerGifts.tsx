import { CiCirclePlus } from "react-icons/ci";
import "./SellerGifts.css";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { deleteGift, getAllGifts } from "../../../hooks/giftHook";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function SellerGifts() {
  const { t } = useTranslation();
  const user = useSelector((state: any) => state.auth.user);
  const sellerToken = useSelector((state: any) => state.auth.sellerToken);
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["gifts"],
    queryFn: () => getAllGifts(),
    keepPreviousData: true,
  });
  const navigate = useNavigate();
  const sellergifts = (item: any) => {
    if (user._id === item.seller_id) {
      return true;
    } else {
      return false;
    }
  };
  const deletegift = useMutation(deleteGift, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  const handleGiftDelete = (id: String) => {
    deletegift.mutate({ id, token: sellerToken });
    refetch();
  };
  return (
    <div className="sellergift">
      {isLoading ? (
        <div className="seller-loader"></div>
      ) : (
        <>
          <div className="post-gifts">
            <div
              className="post-btn"
              onClick={() => {
                navigate("/sellerpage/gift/post");
                refetch();
              }}
            >
              <CiCirclePlus />
              <p>{t("sellerPostAGift")}</p>
            </div>
          </div>
          <div className="gift-list">
            <div className="gift-list-scroll">
              {data?.gifts?.filter(sellergifts).map((gift: any) => (
                <motion.div
                  className="gift-item"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 1.2 }}
                >
                  <img
                    src={
                      "https://merita.onrender.com" +
                      gift.gift_image.substring(6)
                    }
                    alt="image"
                    crossOrigin="anonymous"
                  />
                  <div className="gift-item-info">
                    <p>Name: {gift.gift_name}</p>
                    <p>Price: {gift.gift_price}birr</p>
                    <p>Type: {gift.gift_category}</p>
                  </div>
                  <div className="gift-item-data">
                    <p>Date: {gift.gift_date}</p>
                    <p>Id: {gift._id}</p>
                  </div>
                  <div className="gift-item-delete-btn">
                    <button
                      onClick={(e: any) => {
                        e.preventDefault();
                        handleGiftDelete(gift._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SellerGifts;
