import "./ProductPost.css"
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, minLength, maxLength } from "valibot";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useMutation } from "react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import error from "../../../assets/error.png";
import upload from "../../../assets/upload1.png"
import { postAProduct } from "../../../hooks/adminHook";


interface IFormInputs {
    form_description: string;
}

const schema = object({
    form_description: string("Your description must be a string.", [
      minLength(1, "Please enter your description."),
      maxLength(200, "Don't enter more than 200 character"),
    ]),
});


function ProductPost() {
  const [post, setPost] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
  });
  const [postSuccess, setPostSuccess] = useState(false);
  const adminToken = useSelector((state: any) => state.auth.adminToken);
  const navigate = useNavigate();
  /*@ts-ignore */
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setPost({ ...post, image: acceptedFiles[0] });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    /*@ts-ignore */
    accept: "image/*",
  });

  const { mutate } = useMutation(postAProduct, {
    onSuccess: (data: object) => {
      console.log(data);
      console.log("success");
      setPostSuccess(true);
    },
    onError: () => {
      alert("there was an error");
    },
  });
  /*@ts-ignore */
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: valibotResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (datainput) => {
    const data = new FormData();

    if (
      post.name === "" ||
      post.image === "" ||
      post.price === "" 
    ) {
      // Handle the case where any of the required values are missing
      console.log("Please provide all the required values.");
      return;
    }
    /*@ts-ignore */
    data.append("name", post.name);
    data.append("image", post.image);
    data.append("price", post.price);
    data.append("description", datainput.form_description);
    data.append("category", post.category);

    mutate({ data, token: adminToken });
  };
  return (
    <div className="product-post">
      <div className="seller-post-gift">
      
      <div className="seller-post-gift-title">
        <p>Post a Product</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {postSuccess ? (
          <div className="success-message">
            <p>Product successfully posted</p>
          </div>
        ) : (
          <>
            <p className="tip">
            Tip use background remover for improved result.
              <a
                onClick={() =>
                  (window.location.href = "https://www.remove.bg/")
                }
              >
                click Here
              </a>
            </p>
            <p className="mobile-tip">
              Background remover.
              <a
                onClick={() =>
                  (window.location.href = "https://www.remove.bg/")
                }
              >
                click Here
              </a>
            </p>
          </>
        )}
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
        {/*@ts-ignore */}
        <p>{post.image.path}</p>
        <input
          type="text"
          placeholder={"product Name"}
          name="name"
          value={post.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder={"Product Price"}
          name="price"
          value={post.price}
          onChange={handleChange}
          required
        />
        <div className="input-box">
          <input
            className={
              "description-" + (errors?.form_description ? "show" : "hidden")
            }
            placeholder={"Product Description"}
            {...register("form_description")}
          />
          {errors?.form_description &&
            typeof errors.form_description !== "string" && (
              <p className="error">
                <img src={error} alt="error" />
                <p>{errors.form_description?.message}</p>
              </p>
            )}
        </div>
        <select
          name="category"
          value={post.category}
          onChange={handleChange}
          required
        >
          <option value={"Sofabed"}>Sofabed</option>
          <option value={"CoffeeTable"}>Coffee Table</option>
          <option value={"KitchenCabinate"}>Kitchen Cabinate</option>
          <option value={"DiningTable"}>Dining Table</option>
          <option value={"WellBed"}>Well Bed</option>
          <option value={"NormalBeds"}>Normal Beds</option>
          <option value={"DressingTable"}>Dressing Table</option>
          <option value={"others"}>others</option>
        </select>
        <button>post</button>
      </form>
    </div>
    </div>
  )
}

export default ProductPost
