import { useMutation, useQuery } from "react-query";
import "./BlogList.css";
import { useNavigate } from "react-router-dom";
import { removeABlog, retrieveAdminBlogs } from "../../../hooks/adminHook";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function BlogList() {
  const token = useSelector((state: any) => state.auth.adminToken);
  const [page, setPage] = useState(0);
  
  const { data, isLoading, isPreviousData, refetch } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => retrieveAdminBlogs(token, page),
    keepPreviousData: true,
  });
  const navigate = useNavigate();
  const { mutate } = useMutation(removeABlog, {
    onSuccess: () => {
      console.log("success deleted");
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  console.log(data)

  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = (id: string) => {
    mutate({ id, token });
  };

  interface Blog {
    _id: string;
    image: string;
    title: string;
    author: string;
    date: string;
    summary: string;
  }

  return isLoading ? (
    <div className="admin-main-loader">
      <div className="admin-loader"></div>
    </div>
  ) : (
    <div className="blogs">
      <p>Blogs</p>
      <div className="blog-list">
        {data?.blog?.map((blog: Blog, index: number) => (
          <motion.div
            className="blog-card"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 1.2 }}
            key={index}
          >
            <div
              className="blog-card-img"
              onClick={() => navigate("/admin/blog/list/comments/" + blog._id)}
            >
              <img
                src={"https://elfegn.onrender.com" + blog.image.substring(6)}
                alt="cover"
                crossOrigin="anonymous"
              />
            </div>
            <div
              className="blog-card-text"
              onClick={() => navigate("/admin/blog/list/comments/" + blog._id)}
            >
              <h2>{blog.title}</h2>
              <div className="blog-card-info">
                <p className="blog-card-author">{blog.author}</p>
                <p className="blog-card-date">{blog.date}</p>
              </div>
              <div className="blog-card-summery">{blog.summary}</div>
            </div>
            <div className="blog-card-button">
              <button onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="nav-btn">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 0}
            >
              previous
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
              next
            </button>
          </div>
    </div>
  );
}

export default BlogList;
