import { useForm, SubmitHandler } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, minLength, maxLength } from "valibot";
import error from "../../../assets/error.png";
import { MdNavigateNext } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { motion } from "framer-motion";
import google from "../../../assets/google-login.png";

import "../Page.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearPage2, setPage2 } from "../../../actions/signupSlice";
import { useTranslation } from "react-i18next";

interface IFormInputs {
  form_phone_number: string;
}

const schema = object({
  form_phone_number: string([
    minLength(1, "Please enter a phone number."),
    maxLength(10, "Please enter a phone number."),
  ]),
});

function Page2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: valibotResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const { form_phone_number } = data;
    console.log(data);
    dispatch(
      setPage2({
        phone_number: form_phone_number,
      })
    );
    throw Error("error");
    navigate("/account/page/3");
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
        <p>Phone Number</p>
        <p>{t("step")} 2-4</p>
      </div>
      <div className="page-one-input">
        <div className="input-box">
          <HiOutlineDevicePhoneMobile
            className={"icon-" + (errors?.form_phone_number ? "show" : "hidden")}
          />
          <input
            className={"input-" + (errors?.form_phone_number ? "show" : "hidden")}
            placeholder={"Phone Number(0911234567)"}
            {...register("form_phone_number")}
          />
          {errors?.form_phone_number && typeof errors.form_phone_number !== "string" && (
            <p className="error">
              <img src={error} alt="error" />
              <p>{errors.form_phone_number?.message}</p>
            </p>
          )}
        </div>
        
      </div>
      <div className="page-one-button">
        <button
          onClick={() => {
            dispatch(clearPage2());
            navigate("/account/page/1");
          }}
        >
          <IoChevronBack />
          <p>{t("back")}</p>
        </button>

        <button onClick={handleSubmit(onSubmit)}>
          <p>{t("next")}</p> <MdNavigateNext />
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

export default Page2;
