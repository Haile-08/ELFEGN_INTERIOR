import { useEffect, useState } from "react";
import "./chatbox.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import send from "../../assets/send.png";
import { getMessages } from "../../hooks/chatHook";
import { getChatReceiverImage, getChatSenderImage } from "../../hooks/userHook";
import { useSelector } from "react-redux";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingTimeout, settypingTimeout] = useState(null);
  const { roomId } = useParams();
  const [chat, setChat] = useState([]);
  const messages = useMutation(getMessages, {
    onSuccess: (data) => {
      console.log(data);
      setChat(data);
    },
    onError: () => {
      console.log("rating error");
    },
  });
  const { socket, receiver }: any = useOutletContext();
  const user = useSelector((state: any) => state.auth.user);
  // @ts-ignore
  const rooms = useQuery(["rooms"]);
  // @ts-ignore
  const aroom = rooms?.data?.filter((item: any) => item.roomId === roomId);
  console.log("user id", user?._id);
  const senderImage = useQuery({
    //@ts-ignore
    queryKey: ["sender_image", user?._id],
    queryFn: () => getChatSenderImage(user?._id),
    onSuccess: (data) => {
      console.log(data);
      console.log(user?._id);
      console.log("image get success");
    },
    onError: () => {
      console.log("image get error");
    },
  });

  const receiveImage = useQuery({
    queryKey: ["receive_image", receiver],
    queryFn: () => getChatReceiverImage(receiver),
    onSuccess: (data) => {
      console.log(data);
      console.log("image get success");
    },
    onError: () => {
      console.log("image get error");
    },
  });

  useEffect(() => {
    console.log("room id", roomId);
    setChat([]);
    messages.mutate(roomId);
    if (!socket) return;
    socket.on("message-from-server", (data: any) => {
      //@ts-ignore
      setChat((prev: any) => [
        ...prev,
        {
          message: data.message,
          seller: data.seller,
          sender: data.sender,
          senderId: data.senderId,
        },
      ]);
    });
    socket.emit("online", { newUserId: user?._id });
    socket.on("get-online", (users: any) => {
      setOnlineUsers(users);
    });
    socket.on("typing-started-from-server", () => setTyping(true));
    socket.on("typing-stoped-from-server", () => setTyping(false));
  }, [socket, roomId]);

  console.log(chat);

  const handleSend = (e: any) => {
    e.preventDefault();
    socket.emit("send-message", {
      message,
      roomId,
      //@ts-ignore
      sender: user?.firstName + " " + user?.lastName,
      senderId: user?._id,
    });
    //@ts-ignore
    setChat((prev: any) => [
      ...prev,
      {
        message,
        roomId,
        //@ts-ignore
        sender: user?.firstName + " " + user?.lastName,
        senderId: user?._id,
      },
    ]);
    setMessage("");
  };

  const handleInput = (e: any) => {
    setMessage(e.target.value);
    socket.emit("online", { newUserId: user?._id });
    socket.emit("typing-started", { roomId });
    if (typingTimeout) clearTimeout(typingTimeout);

    settypingTimeout(
      //@ts-ignore
      setTimeout(() => {
        socket.emit("typing-stoped", { roomId });
      }, 1000)
    );
  };

  return (
    <div className="chat-box">
      <div className="chat-user-info-box">
        <div className="chat-user-info-box-user">
          <div className="chat-user-info-box-user-image">
            <div className="chat-circle">
              {aroom[0]?.buyerId === user?._id ? (
                onlineUsers.some(
                  (item: any) => item.userId === aroom[0]?.sellerId
                ) ? (
                  <div className="chat-online"></div>
                ) : (
                  <div className="chat-offline"></div>
                )
              ) : onlineUsers.some(
                  (item: any) => item.userId === aroom[0]?.buyerId
                ) ? (
                <div className="chat-online"></div>
              ) : (
                <div className="chat-offline"></div>
              )}
            </div>
            {receiveImage?.data?.photos ? (
              <img
                src={
                  "https://merita.onrender.com" +
                  receiveImage?.data?.photos?.substring(6)
                }
                alt="content-image"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="image-text-logo-receiver">
                {receiveImage?.data?.name ? receiveImage?.data?.name[0] : "A"}
              </div>
            )}
          </div>
          <div className="chat-user-info-box-user-name">
            {receiveImage?.data?.name ? receiveImage?.data?.name : "Anonymous"}
          </div>
        </div>
      </div>
      {messages.isLoading ? (
        <div className="chat-main-loader">
          <div className="chat-loader"></div>
        </div>
      ) : (
        <div className="chat-message">
          {chat?.map((msg, index) =>
            //@ts-ignore
            msg?.senderId === user._id ? (
              <div key={index} className={"right-text"}>
                <div className="message-image">
                  <div className="chat-circle">
                    {onlineUsers.some(
                      //@ts-ignore
                      (item) => item.userId === user?._id
                    ) ? (
                      <div className="chat-online"></div>
                    ) : (
                      <div className="chat-offline"></div>
                    )}
                  </div>
                  {senderImage?.data?.photos ? (
                    <img
                      src={
                        "https://merita.onrender.com" +
                        senderImage?.data?.photos?.substring(6)
                      }
                      alt="content-image"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    //@ts-ignore
                    <div className="image-text-logo">{msg?.sender[0]}</div>
                  )}
                </div>
                <div className="message-text">
                  {/*@ts-ignore*/}
                  <p>{msg?.message}</p>
                </div>
              </div>
            ) : (
              <div key={index} className={"left-text"}>
                <div className="message-image">
                  <div className="chat-circle">
                    {aroom[0]?.buyerId === user?._id ? (
                      onlineUsers.some(
                        (item: any) => item.userId === aroom[0]?.sellerId
                      ) ? (
                        <div className="chat-online"></div>
                      ) : (
                        <div className="chat-offline"></div>
                      )
                    ) : onlineUsers.some(
                        (item: any) => item.userId === aroom[0]?.buyerId
                      ) ? (
                      <div className="chat-online"></div>
                    ) : (
                      <div className="chat-offline"></div>
                    )}
                  </div>
                  {receiveImage?.data?.photos ? (
                    <img
                      src={
                        "https://merita.onrender.com" +
                        receiveImage?.data?.photos?.substring(6)
                      }
                      alt="content-image"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div className="image-text-logo-receiver">
                      {receiveImage?.data?.name
                        ? receiveImage?.data?.name[0]
                        : "A"}
                    </div>
                  )}
                </div>
                <div className="message-text">
                  {/*@ts-ignore */}
                  <p>{msg?.message}</p>
                </div>
              </div>
            )
          )}
        </div>
      )}
      <div className="chat-typing-load">
        {typing && (
          <div className="chat-typing-loader">
            <div className="typing-loader"></div>
          </div>
        )}
      </div>
      <div className="chat-send">
        <input
          type="text"
          name="message"
          placeholder="message"
          onChange={handleInput}
        />
        <button onClick={handleSend}>
          <img src={send} alt="send" />
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
