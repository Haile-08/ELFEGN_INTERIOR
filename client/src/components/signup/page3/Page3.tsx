import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import error from "../../../assets/error.png";
import { IoChevronBack } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { motion } from "framer-motion";
import google from "../../../assets/google-login.png";

import "../Page.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useMutation } from 'react-query';
import { signupUser } from '../../../hooks/authHook';

const schema = z.object({
  form_password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  form_confirm_password: z.string().min(6, { message: 'Password must be at least 6 characters' })
}).refine((data) => data.form_password === data.form_confirm_password, {
  message: 'Passwords do not match'
});


//extract the inferred type from schema
type ValidationSchemaType = z.infer<typeof schema>

function Page3() {
  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();


  const firstName = useSelector((state: any) => state.signup.firstname);
  const lastName = useSelector((state: any) => state.signup.lastname);
  const emailInput = useSelector((state: any) => state.signup.email);
  const phoneNumber = useSelector((state: any) => state.signup.phone_number);

  const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const signup = useMutation(signupUser, {
    onSuccess: (data: any) => {
      console.log(data)
      navigate("/account/login");
    },
    onError: () => {
      alert("there was an error");
    },
  })

  const onSubmit:  SubmitHandler<ValidationSchemaType> = (data:any) => {
    const { form_confirm_password } = data;

    signup.mutate({
      firstName,
      lastName,
      email: emailInput,
      phoneNumber,
      password: form_confirm_password,
    })
  };

  const handleToggle = () => {
    setVisible(!isVisible);
  };

  const handleGoogleRedirect = () => {
    window.open("http://localhost:5000/v1/auth/google", "_self");
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
