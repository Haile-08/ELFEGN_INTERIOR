import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import "./sellermessage.css";
import { useQuery } from "react-query";
import { retrieveRooms } from "../../../hooks/chatHook";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function SellerMessage() {
  const { t } = useTranslation();
  const room = useQuery(["rooms"], retrieveRooms);
  const [receiver, setReceiver] = useState("");
  const [searchString, setSearchString] = useState();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const user = useSelector((state: any) => state.auth.user);
  const { socket }: any = useOutletContext();

  const handleChat = (roomId: any, buyer: any, seller: any, productId: any) => {
    room.refetch();
    socket?.emit("room", {
      roomId,
      buyer,
      seller,
      productId,
    });
  };
  const checksroomid = (item: any) => {
    /*@ts-ignore */
    if (item.sellerId === user?._id) {
      return true;
    } else {
      return false;
    }
  };

  console.log(room.data);

  const startsWith = (str: any) => (word: any) =>
    str ? word.slice(0, str.length).toLowerCase() === str.toLowerCase() : true;

  return (
    <div className="seller-message">
      <div className="seller-message-rooms">
        <p>{t("messages")}</p>
        <div className="seller-message-rooms-list">
          <div className="seller-message-rooms-search">
            <input
              type="text"
              placeholder="Search.."
              onChange={(e: any) => setSearchString(e.target.value)}
            />
          </div>
          <div className="seller-message-rooms-messages-list">
            {room.isLoading ? (
              <div className="seller-loader"></div>
            ) : (
              room.data
                ?.filter(checksroomid)
                .filter((user: any) => startsWith(searchString)(user.buyer))
                .map((r: any, i: any) => (
                  <div
                    className={
                      r.roomId === roomId
                        ? "seller-message-room-info-active"
                        : "seller-message-room-info-not-active"
                    }
                    key={i}
                    onClick={(e) => {
                      e.preventDefault;
                      setReceiver(r.buyerId);
                      navigate(`/sellerpage/message/${r.roomId}`);
                      handleChat(r.roomId, r.buyer, r.seller, r.productId);
                    }}
                  >
                    <div className="image-logo">{r.buyer[0]}</div>
                    <div className="buyer-name" key={i}>
                      {r.buyer}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <div className="seller-message-chat">
        <Outlet context={{ socket, receiver }} />
      </div>
    </div>
  );
}

export default SellerMessage;