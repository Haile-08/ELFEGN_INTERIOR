import "./BuyerProfile.css";
import { useState } from "react";
import { useMutation } from "react-query";
import { postUserImage, postUserUpdate } from "../../../hooks/userHook";
import camera from "../../../assets/camera.png";
import a_user from "../../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../../actions/authSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BuyerProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState({ image: "" });
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.userToken);
  const [update, setUpdate] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const handleImage = (e: any) => {
    setImage({ image: e.target.files[0] });
  };
  const handleChange = (e: any) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const imageMutate = useMutation(postUserImage, {
    onSuccess: (data) => {
      console.log(data);
      dispatch(
        setLogin({
          user: data,
          userToken: token,
        })
      );
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  const userUpdate = useMutation(postUserUpdate, {
    onSuccess: (data) => {
      dispatch(
        setLogin({
          user: data,
          userToken: token,
        })
      );
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  const handleImageSubmit = (e: any) => {
    e.preventDefault();
    const imageF = new FormData();
    imageF.append("image", image.image);
    imageF.append("email", user.email);
    console.log("image", image.image);
    console.log("email", user.email);
    console.log("token", token)
    imageMutate.mutate({ data: imageF, token });
  };

  const handleUpdateSubmit = (id: string) => {
    
    const info = {
      firstName: update.firstName,
      lastName: update.lastName,
      phoneNumber: update.phoneNumber,
    };
    const data = { info, id };
    console.log("user update", data)
    console.log("edit token", token)
    console.log("phone number", update.phoneNumber)
    userUpdate.mutate({ data, token });
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
                src={`https://elfegn.onrender.com/${user.image.substring(6)}`}
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
            <p></p>
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
                name="phoneNumber"
                value={update.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          ) : (
            <div className="input">
              <h4>{t("aboutTxtPhone")}</h4>
              <p>{user?.phoneNumber}</p>
            </div>
          )}

          <div className="input">
            <h4>{t("email")}</h4>
            <p>{user?.email}</p>
          </div>  
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

export default BuyerProfile;
