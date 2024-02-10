import "./BuyerShop.css";
import { useMutation, useQuery } from "react-query";
import { motion } from "framer-motion";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../actions/authSlice";
import { getUser } from "../../../hooks/userHook";
import { getAllProduct } from "../../../hooks/productHook";


interface GiftItem {
  _id: string;
  image: string;
  name: string;
  price: string;
} 

function BuyerShop() {
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useQuery('myData', getAllProduct);
  const outletContext = useOutletContext();
  const { checkDate, checkStar, checkCategory }: any = outletContext || {}; // Ensure outletContext is not null
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {mutate} = useMutation(getUser, {
    onSuccess: (data) => {
      console.log("user",data);
      const token = searchParams.get('user');
      if (token != "null"){
      dispatch(
        setLogin({
          user: data,
          userToken: token,
        })
      );
    }
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  useEffect(() => {
    const id = searchParams.get('id');
    const token = searchParams.get('user');
    
    if (token !== "null" && token !== undefined) {
      mutate(id);
    }
    refetch();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="buyer-loader"></div>
      ) : (
        <div className="buyer-gift-list-items">
          <div className="buyer-gift-list-items-all">
            {data?.filter(checkDate)
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
                        "https://elfegn.onrender.com/" +
                        item.image.substring(6)
                      }
                      alt="image"
                      crossOrigin="anonymous"
                    />
                    <div className="buyer-gift-name">{item.name}</div>
                    <div className="buyer-gift-price">
                      {item.price}Birr
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default BuyerShop;
