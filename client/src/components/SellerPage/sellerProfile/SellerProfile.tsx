import { useState } from "react";
import "./SellerProfile.css";
import { useMutation, useQuery } from "react-query";
import {
  posSellertUserImage,
  postSellerUserUpdate,
} from "../../../hooks/userHook";
import camera from "../../../assets/camera.png";
import a_user from "../../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../../actions/authSlice";
import { getUserBalance } from "../../../hooks/withdrawHook";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SellerProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState({ image: "" });
  const user = useSelector((state: any) => state.auth.user);
  const sellerToken = useSelector((state: any) => state.auth.sellerToken);
  const [update, setUpdate] = useState({
    bio: "",
    firstName: "",
    lastName: "",
    phone_number: "",
    email: "",
    city: "",
    country: "",
  });

  const handleImage = (e: any) => {
    setImage({ image: e.target.files[0] });
  };
  const handleChange = (e: any) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const imageMutate = useMutation(posSellertUserImage, {
    onSuccess: (data) => {
      dispatch(
        setLogin({
          user: data,
          sellerToken,
        })
      );
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  const userUpdate = useMutation(postSellerUserUpdate, {
    onSuccess: (data) => {
      dispatch(
        setLogin({
          user: data,
          sellerToken,
        })
      );
    },
    onError: () => {
      console.log("there was an error");
    },
  });
  const balance = useQuery({
    queryKey: ["balance"],
    /*@ts-ignore */
    queryFn: () => getUserBalance({ id: user?._id, token: sellerToken }),
  });

  const handleImageSubmit = (e: any) => {
    e.preventDefault();
    console.log(image.image);
    const imageF = new FormData();
    imageF.append("image", image.image);
    imageF.append("email", user?.email);
    imageMutate.mutate({ data: imageF, token: sellerToken });
  };

  const handleUpdateSubmit = (id: string) => {
    const info = {
      firstName: update.firstName,
      lastName: update.lastName,
      phone_number: update.phone_number,
      email: update.email,
      city: update.city,
      country: update.country,
      bio: update.bio,
    };
    const data = { info, id };
    userUpdate.mutateAsync({ data, token: sellerToken });
  };

  return (
    <>
      <div className="seller-profile-banner"></div>
      <div className="seller-profile">
        <div className="seller-side-menu">
          <div className="seller-side-menu-image">
            {user?.image ? (
              <img
                crossOrigin="anonymous"
                src={`https://merita.onrender.com${user.image.substring(6)}`}
              />
            ) : (
              <img src={a_user} alt="user" />
            )}
          </div>
          <form onSubmit={handleImageSubmit}>
            {edit ? (
              <>
                <input
                  type="file"
                  accept=".png, .jpg, jpeg"
                  name="image"
                  id="image"
                  onChange={handleImage}
                  required
                />
                <label htmlFor="image">
                  <img src={camera} alt="camera" />
                </label>
                <button>{t("upload")}</button>
              </>
            ) : (
              <></>
            )}
          </form>
          <p>{user?.firstName + " " + user?.lastName}</p>
          <div className="seller-side-menu-earning">
            <p>
              {t("earn")}: {balance?.data}birr
            </p>
          </div>
        </div>
        <div className="seller-main-info">
          {edit ? (
            <div className="input">
              <h4>{t("firstName")}</h4>
              <input
                type="text"
                placeholder={t("firstName")}
                name="firstName"
                value={update.firstName}
                onChange={handleChange}
                required
              />
            </div>
          ) : (
            <div className="input">
              <h4>{t("firstName")}</h4>
              <p>{user?.firstName}</p>
            </div>
          )}
          {edit ? (
            <div className="input">
              <h4>{t("lastName")}</h4>
              <input
                type="text"
                placeholder={t("lastName")}
                name="lastName"
                value={update.lastName}
                onChange={handleChange}
                required
              />
            </div>
          ) : (
            <div className="input">
              <h4>{t("lastName")}</h4>
              <p>{user?.lastName}</p>
            </div>
          )}
          {edit ? (
            <div className="input">
              <h4>{t("aboutTxtPhone")}</h4>
              <input
                type="text"
                placeholder={t("aboutTxtPhone")}
                name="phone_number"
                value={update.phone_number}
                onChange={handleChange}
                required
              />
            </div>
          ) : (
            <div className="input">
              <h4>{t("aboutTxtPhone")}</h4>
              <p>{user?.phone_number}</p>
            </div>
          )}

          <div className="input">
            <h4>{t("email")}</h4>
            <p>{user?.email}</p>
          </div>
          {edit ? (
            <div className="input">
              <h4>{t("city")}</h4>
              <input
                type="text"
                placeholder={t("city")}
                name="city"
                value={update.city}
                onChange={handleChange}
                required
              />
            </div>
          ) : (
            <div className="input">
              <h4>{t("city")}</h4>
              <p>{user?.city}</p>
            </div>
          )}
          {edit ? (
            <div className="input">
              <h4>{t("country")}</h4>
              <input
                type="text"
                placeholder={t("country")}
                name="country"
                value={update.country}
                onChange={handleChange}
                required
              />
            </div>
          ) : (
            <div className="input">
              <h4>{t("country")}</h4>
              <p>{user?.country}</p>
            </div>
          )}
          <div className="seller-main-info-btn">
            {edit ? (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdateSubmit(user?._id);
                    setEdit(!edit);
                  }}
                  className="save-btn"
                >
                  {t("save")}
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setEdit(!edit);
                  }}
                >
                  {t("cancel")}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setEdit(!edit)} className="save-btn">
                  {t("edit")}
                </button>
                <button
                  className="disabled-style"
                  onClick={() => navigate("/account/page/password/request")}
                >
                  {t("requestTxtBtn")}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerProfile;
