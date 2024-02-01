import { useParams } from "react-router-dom";
import "./BlogComments.css";
import { useMutation, useQuery } from "react-query";
import {
  deleteComment,
  retrieveAnAdminComment,
} from "../../../hooks/adminHook";
import user from "../../../assets/user.png";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function BlogComments() {
  const token = useSelector((state: any) => state.auth.adminToken);
  const { id } = useParams();

  interface commentInterface {
    image: string;
    user: string;
    date: string;
    content: string;
    _id: string;
  }
  const comment = useQuery({
    queryKey: ["comments", id],
    queryFn: () => retrieveAnAdminComment({ id, token }),
    refetchOnWindowFocus: true,
  });

  const deletecomment = useMutation(deleteComment, {
    onSuccess: () => {
      console.log("deleted");
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  useEffect(() => {
    comment.refetch();
  }, []);

  return comment.isLoading ? (
    <div className="admin-main-loader">
      <div className="admin-loader"></div>
    </div>
  ) : (
    <div className="blog-admin-comment">
      <p>Blog Comments</p>
      <div className="comment-lists">
        {comment?.data?.map((comment: commentInterface) => (
          <div className="comment">
            <div className="comment-profile">
              {comment.image !== " " ? (
                <img
                  src={
                    "https://merita.onrender.com" + comment?.image?.substring(6)
                  }
                  alt="cover"
                  crossOrigin="anonymous"
                />
              ) : (
                <img src={user} alt="default" />
              )}

              <div className="comment-info">
                <div className="comment-user">{comment?.user}</div>
                <div className="comment-data">{comment?.date}</div>
              </div>
            </div>
            <div className="comment-text">{comment?.content}</div>
            <button
              onClick={() => deletecomment.mutate({ id: comment?._id, token })}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogComments;
