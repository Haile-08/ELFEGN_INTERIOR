import { useForm, SubmitHandler } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, minLength } from "valibot";
import error from "../../../assets/error.png";
import { IoChevronBack } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { motion } from "framer-motion";
import google from "../../../assets/google-login.png";

import "../Page.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearPage3, setPage3 } from "../../../actions/signupSlice";
import { useTranslation } from "react-i18next";

interface IFormInputs {
  form_password: string;
  form_confirm_password: string;
}

const schema = object({
  form_password: string("Your password must be a string.", [
    minLength(1, "Please enter your password."),
    minLength(8, "Your password must have 8 characters or more."),
  ]),
  form_confirm_password: string("Your password must be a string.", [
    minLength(1, "Please enter your password."),
    minLength(8, "Your password must have 8 characters or more."),
  ]),
});

function Page3() {
  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: valibotResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const { form_confirm_password } = data;
    dispatch(
      setPage3({
        password: form_confirm_password,
      })
    );
    navigate("/account/page/type/id/signup");
  };

  const handleToggle = () => {
    setVisible(!isVisible);
  };

  const handleGoogleRedirect = () => {
    window.open("https://merita.onrender.com/v1/auth/google", "_self");
  };

  return (
    <motion.div
      className="page-one"
      initial={{ x: "-100dvw" }}
      animate={{ x: 0 }}
      exit={{ x: "200dvw" }}
      transition={{ delay: 0.2, duration: 0.5, type: "tween" }}
    >
      <div className="page-one-title">
        <p>{t("password")}:</p>
        <p>{t("step")} 3-4</p>
      </div>
      <div className="page-one-input">
        <div className="input-box">
          <RiLockPasswordLine
            className={"icon-" + (errors?.form_password ? "show" : "hidden")}
          />
          <input
            className={"input-" + (errors?.form_password ? "show" : "hidden")}
            placeholder={t("password")}
            {...register("form_password")}
            type={!isVisible ? "password" : "text"}
          />
          {errors?.form_password &&
            typeof errors.form_password !== "string" && (
              <p className="error">
                <img src={error} alt="error" />
                <p>{errors.form_password?.message}</p>
              </p>
            )}
        </div>
        <div className="input-box">
          <RiLockPasswordFill
            className={
              "icon-" + (errors?.form_confirm_password ? "show" : "hidden")
            }
          />
          <input
            className={
              "input-" + (errors?.form_confirm_password ? "show" : "hidden")
            }
            placeholder={t("confirmPassword")}
            {...register("form_confirm_password")}
            type={!isVisible ? "password" : "text"}
          />
          {errors?.form_confirm_password &&
            typeof errors.form_confirm_password !== "string" && (
              <p className="error">
                <img src={error} alt="error" />
                <p>{errors.form_confirm_password?.message}</p>
              </p>
            )}
        </div>
        <div className="show-password">
          <input type="checkbox" name="show" onClick={handleToggle} />
          <p>{t("PasswordShowTxt")}</p>
        </div>
      </div>

      <div className="page-one-button">
        <button
          onClick={() => {
            dispatch(clearPage3());
            navigate("/account/page/2");
          }}
        >
          <IoChevronBack />
          <p>{t("back")}</p>
        </button>

        <button onClick={handleSubmit(onSubmit)}>
          <p>signup</p>
        </button>
      </div>
      <motion.div
        className="mobile-auth"
        onClick={handleGoogleRedirect}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src={google} alt="google-login" />
        <p>Google</p>
      </motion.div>
    </motion.div>
  );
}

export default Page3;
