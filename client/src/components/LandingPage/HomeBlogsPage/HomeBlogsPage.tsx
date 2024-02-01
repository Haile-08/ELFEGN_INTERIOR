import "../HomeGiftPage/HomeGiftPage";
import { motion } from "framer-motion";
import telegram from "../../../assets/telegram.png";
import facebook from "../../../assets/facebook.png";
import instagram from "../../../assets/instagram.png";
import logo from "../../../assets/logo.svg";
import amhlogo from "../../../assets/amhlogo.svg";
import back from "../../../assets/back-icon.png";
import { useNavigate } from "react-router-dom";
import { retrieveBlogs } from "../../../hooks/blogHook";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Blog {
  _id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  image: string;
  date: string;
}

function HomeBlogsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const { data, isPreviousData, refetch } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => retrieveBlogs(page),
    keepPreviousData: true,
  });

  console.log(data);

  const handleNav = (id: string) => {
    navigate(`/blogdisplay/${id}`);
  };

  useEffect(() => {
    refetch();
  }, []);
  return (
    <motion.div
      className="home-gift-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 0.5, type: "tween" }}
    >
      <div className="home-gift-side">
        <div className="home-gift-side-social">
          <img src={telegram} alt="telegram" />
          <img src={facebook} alt="facebook" />
          <img src={instagram} alt="instagram" className="instagram" />
        </div>
      </div>
      <div className="home-gift-home">
        <div className="home-gift-home-nav">
          <img
            src={t("logo") === "eng" ? logo : amhlogo}
            alt="logo"
            onClick={() => navigate("/")}
          />
          <div className="nav-center">
            <p>{t("homeTxtBlog")}</p>
          </div>
          <div className="nav-right">
            <img src={back} alt="search" onClick={() => navigate("/")} />
          </div>
        </div>
        <div className="gift-landing-page-blogs">
          <div className="blog-list-map">
            {data?.blog?.map((blog: Blog, index: number) => (
              <motion.div
                className="blog-card"
                onClick={() => handleNav(blog._id)}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 1.2 }}
                key={index}
              >
                <div className="blog-card-img">
                  <img
                    src={
                      "http://localhost:5000" + blog?.image.substring(6)
                    }
                    alt="cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="blog-card-text">
                  <h2>{blog?.title}</h2>
                  <div className="blog-card-info">
                    <p className="blog-card-author">{blog?.author}</p>{" "}
                    <p className="blog-card-date">{blog?.date}</p>
                  </div>
                  <div className="blog-card-summery">{blog?.summary}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="nav-btn">
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
      </div>
    </motion.div>
  );
}

export default HomeBlogsPage;
