import { useState, useCallback } from "react";
import { useMutation } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
//@ts-ignore
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./BlogPost.css";
import { postBlog } from "../../../hooks/adminHook";
import { useDropzone } from "react-dropzone";
import upload from "../../../assets/upload1.png";
import finish from "../../../assets/accept.png";
import error from "../../../assets/error.png";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { object, string, minLength, maxLength } from "valibot";

interface IFormInputs {
  form_title: string;
  form_summary: string;
}

const schema = object({
  form_title: string("Your title name must be a string.", [
    minLength(1, "Please enter your title."),
    maxLength(100, "Don't enter more than 100 character"),
  ]),
  form_summary: string("Your summary must be a string.", [
    minLength(1, "Please enter your summary."),
    maxLength(450, "Don't enter more than 450 character"),
  ]),
});

function BlogPost() {
  const token = useSelector((state: any) => state.auth.adminToken);
  const [post, setPost] = useState({
    author: "",
    image: "",
  });
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const handleChange = (e: any) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };
  const { mutate, isLoading } = useMutation(postBlog, {
    onSuccess: (data) => {
      if (data.success) {
        setSuccess(true);
      }
    },
    onError: () => {
      alert("there was an error");
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setPost({ ...post, image: acceptedFiles[0] });
    },
    [post]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: valibotResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (datainput) => {
    const { form_title, form_summary } = datainput;
    const data = new FormData();
    data.append("title", form_title);
    data.append("summary", form_summary);
    data.append("author", post.author);
    data.append("image", post.image);
    data.append("content", content);
    data.append("date", new Date().toLocaleString());

    mutate({ data, token });
  };

  return isLoading ? (
    <div className="admin-main-loader">
      <div className="admin-loader"></div>
    </div>
  ) : (
    <div className="blog-post">
      <div className="blog-post-form">
        <p>Post A Blog</p>
        {success && (
          <div className="blog-post-success-message">
            <img src={finish} alt="success" />
            <p>Blog successfully created.</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div {...getRootProps()} className="seller-drag-and-drop">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className="seller-drop-zone">
                <p>Drag and Drop</p>
                <img src={upload} alt="upload" />
                <p>.JPG .PNG</p>
                <p>or Click here</p>
              </div>
            )}
          </div>
          {/* @ts-ignore */}
          <p>{post?.image?.path}</p>
          <div className="input-box">
            <input
              className={"title-" + (errors?.form_title ? "show" : "hidden")}
              placeholder="title"
              {...register("form_title")}
            />
            {errors?.form_title && typeof errors.form_title !== "string" && (
              <p className="error">
                <img src={error} alt="error" />
                <p>{errors.form_title?.message}</p>
              </p>
            )}
          </div>
          <div className="input-box">
            <input
              className={
                "summary-" + (errors?.form_summary ? "show" : "hidden")
              }
              placeholder="summary"
              {...register("form_summary")}
            />
            {errors?.form_summary &&
              typeof errors.form_summary !== "string" && (
                <p className="error">
                  <img src={error} alt="error" />
                  <p>{errors.form_summary?.message}</p>
                </p>
              )}
          </div>
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={post.author}
            onChange={handleChange}
            className="author"
            required
          />
          <div className="react-quill">
            <ReactQuill
              value={content}
              theme="snow"
              onChange={setContent}
              modules={modules}
            />
          </div>
          <motion.button
            className="create-btn"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 1.2 }}
          >
            Create Post
          </motion.button>
        </form>
      </div>
    </div>
  );
}

export default BlogPost;
