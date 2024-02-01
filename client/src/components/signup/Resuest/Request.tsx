import "../Page.css";
import "../Signup.css";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, minLength, email } from "valibot";
import error from "../../../assets/error.png";
import { useMutation } from "react-query";
import { requestReset } from "../../../hooks/authHook";
import { useTranslation } from "react-i18next";

interface IFormInputs {
  from_email: string;
}

const schema = object({
  from_email: string("Your email must be a string.", [
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
});

function Request() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: valibotResolver(schema),
  });

  const { mutate } = useMutation(requestReset, {
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      alert("there was an error");
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const { from_email } = data;
    mutate(from_email);
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
        <p>{t("requestTxtPassword")}</p>
      </div>
      <div className="page-one-input">
        <div className="input-box">
          <input
            className={"input-" + (errors?.from_email ? "show" : "hidden")}
            placeholder={t("email")}
            {...register("from_email")}
          />
          {errors?.from_email && typeof errors.from_email !== "string" && (
            <p className="error">
              <img src={error} alt="error" />
              <p>{errors.from_email?.message}</p>
            </p>
          )}
        </div>
      </div>
      <div className="page-one-button-request">
        <button onClick={handleSubmit(onSubmit)}>
          <p>{t("requestTxtBtn")}</p>
        </button>
      </div>
    </motion.div>
  );
}

export default Request;
