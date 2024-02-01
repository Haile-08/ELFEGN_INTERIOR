// @ts-ignore
import Cookies from "js-cookie";
import { useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery } from "react-query";
import {
  postComment,
  retrieveABlog,
  retrieveAComment,
} from "../../hooks/blogHook";
import { useState } from "react";
import logo from "../../assets/logo.svg";
import amhlogo from "../../assets/amhlogo.svg";
import back from "../../assets/back.png";
import chat from "../../assets/chat.png";
import close from "../../assets/close.png";
import imgicon from "../../assets/user.png";
import "./BlogDispaly.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function BlogDispaly() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const { t } = useTranslation();
  const user = useSelector((state: any) => state.auth.user);
  const sellerToken = useSelector((state: any) => state.auth.sellerToken);
  const buyerToken = useSelector((state: any) => state.auth.buyerToken);
  const [post, setPost] = useState({
    content: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => retrieveABlog(id ?? ""),
  });
  const comment = useQuery({
    queryKey: ["comments", data?._id],
    queryFn: () => retrieveAComment(data?._id),
    refetchOnWindowFocus: true,
  });
  const { mutate } = useMutation(postComment, {
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      alert("there was an error");
    },
  });

  const handleChange = (e: any) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    console.log(user?.firstname);
    e.preventDefault();
    const currentDate: string = new Date().toLocaleDateString();
    mutate({
      BlogId: data?._id,
      content: post.content,
      date: currentDate,
      user: user?.firstName + " " + user?.lastName,
      image: user?.image,
    });

    comment.refetch();
  };

  interface commentInterface {
    image: string;
    user: string;
    date: string;
    content: string;
  }

  const blogShadowVariant = {
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

  const blogInputVariant = {
    visible: { x: 0, transition: { delay: 0.4, type: "tween" } },
    hidden: { x: "100dvw", transition: { delay: 0.4, type: "tween" } },
    leave: { x: "100dvw", transition: { delay: 0.5, type: "tween" } },
  };
  const handleHomeNav = () => {
    navigate("/");
  };

  const handleBlogNav = () => {
    navigate("/blogs");
  };

  return (
    <div className={modal ? "blog-display-modal" : "blog-display"}>
      {isLoading ? (
        <div className="loadPageFull">
          <div className="loader-blog"></div>
        </div>
      ) : (
        <>
          <AnimatePresence>
            {modal && (
              <div className="blog-modal">
                <motion.div
                  className="blog-modal-shadow"
                  onClick={() => setModal(false)}
                  initial="hidden"
                  animate="visible"
                  exit="leave"
                  variants={blogShadowVariant}
                >
                  .
                </motion.div>
                <motion.div
                  className="blog-modal-input"
                  initial="hidden"
                  animate="visible"
                  exit="leave"
                  variants={blogInputVariant}
                >
                  <div className="blog-modal-input-close">
                    <button onClick={() => setModal(false)}>
                      <img src={close} alt="close" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    {sellerToken || buyerToken ? (
                      <>
                        <textarea
                          placeholder={t("comment") + "..."}
                          name="content"
                          value={post.content}
                          onChange={handleChange}
                          required
                        />
                        <button>{t("comment")}</button>
                      </>
                    ) : (
                      <p onClick={() => navigate("/account/login")}>
                        {t("loginToComment")}
                      </p>
                    )}
                  </form>
                  <div className="comment-lists">
                    {comment?.data?.map((comment: commentInterface) => (
                      <div className="comment">
                        <div className="comment-profile">
                          <img
                            src={
                              comment.image
                                ? "https://merita.onrender.com" +
                                  comment?.image?.substring(6)
                                : imgicon
                            }
                            alt="cover"
                            crossOrigin="anonymous"
                          />
                          <div className="comment-info">
                            <div className="comment-user">{comment?.user}</div>
                            <div className="comment-data">{comment?.date}</div>
                          </div>
                        </div>
                        <div className="comment-text">{comment?.content}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
          <div className="blog-back">
            <img src={back} alt="back" onClick={handleBlogNav} />
          </div>
          <div className="blog-logo" onClick={handleHomeNav}>
            <img src={t("logo") === "eng" ? logo : amhlogo} alt="logo" />
          </div>
          <h1 className="blog-display-title">{data?.title}</h1>
          <p className="blog-display-date">{data?.date}</p>
          <p className="blog-display-author">by {data?.author}</p>
          <div className="blog-display-content">
            <div className="blog-display-content-image">
              <img
                src={"https://merita.onrender.com/" + data?.image.substring(6)}
                alt="content-image"
                crossOrigin="anonymous"
              />
            </div>
            <div className="blog-display-content-text">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: data?.content }}
              />
            </div>
          </div>

          <div className="blog-line"></div>

          <div className="blog-comment-icon">
            <img src={chat} alt="chat" onClick={() => setModal(true)} />
            <div className="comment-count" onClick={() => setModal(true)}>
              {comment?.data?.length}
            </div>
            <p onClick={() => setModal(true)}>{t("comment")}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default BlogDispaly;
