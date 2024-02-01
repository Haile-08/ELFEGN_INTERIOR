import { useForm, SubmitHandler } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, minLength } from "valibot";
import "../Page.css";
import "../Signup.css";
import { useMutation } from "react-query";
import { reset } from "../../../hooks/authHook";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import error from "../../../assets/error.png";
import { useTranslation } from "react-i18next";

interface IFormInputs {
  from_new_password: string;
}

const schema = object({
  from_new_password: string("Your password must be a string.", [
    minLength(1, "Please enter your password."),
    minLength(8, "Your password must have 8 characters or more."),
  ]),
});

function Reset() {
  const [isVisible, setVisible] = useState(false);
  const { token, id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: valibotResolver(schema),
  });

  const { mutate } = useMutation(reset, {
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      alert("there was an error");
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const { from_new_password } = data;
    mutate({ userId: id, token, password: from_new_password });
  };

  const handleToggle = () => {
    setVisible(!isVisible);
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
        <p>{t("resetPasswordIntro")}</p>
      </div>
      <div className="page-one-input">
        <div className="input-box">
          <input
            className={
              "input-" + (errors?.from_new_password ? "show" : "hidden")
            }
            placeholder={t("resetPasswordIntro")}
            {...register("from_new_password")}
            type={!isVisible ? "password" : "text"}
          />
          {errors?.from_new_password &&
            typeof errors.from_new_password !== "string" && (
              <p className="error">
                <img src={error} alt="error" />
                {errors.from_new_password?.message}
              </p>
            )}
        </div>
      </div>
      <div className="show-password">
        <input type="checkbox" name="show" onClick={handleToggle} />
        <p>{t("PasswordShowTxt")}</p>
      </div>
      <div className="page-one-button-request">
        <button onClick={handleSubmit(onSubmit)}>
          <p>{t("resetPasswordBtn")}</p>
        </button>
      </div>
    </motion.div>
  );
}

export default Reset;
