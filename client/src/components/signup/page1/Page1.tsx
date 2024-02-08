import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { MdNavigateNext } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { motion } from "framer-motion";
import google from "../../../assets/google-login.png";
import error from "../../../assets/error.png";

import "../Page.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage1 } from "../../../actions/signupSlice";
import { useTranslation } from "react-i18next";


const schema = z.object({
  form_first_name: z.string({
  required_error: "First Name is required",
  invalid_type_error: "First Name must be a string"}).min(3, {message: 'First Name must be at least 3 characters'}),

  form_last_name: z.string({
    required_error: "Last Name is required",
    invalid_type_error: "Last Name must be a string"}).min(3, {message: 'Last Name must be at least 3 characters'}),
  form_email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"}).min(1, {message: 'Email is required'}).email('Invalid email address'),
})

//extract the inferred type from schema
type ValidationSchemaType = z.infer<typeof schema>

function Page1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit:  SubmitHandler<ValidationSchemaType> = (data:any) => {
    const { form_first_name, form_last_name, form_email } = data;
    dispatch(
      setPage1({
        firstname: form_first_name,
        lastname: form_last_name,
        email: form_email,
      })
    );
    navigate("/account/page/2");
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
        <p>{t("page1Header")}:</p>
        <p>{t("step")} 1-4</p>
      </div>
      <div className="page-one-input">
        <div className="input-box">
          <CiUser
            className={"icon-" + (errors?.form_first_name ? "show" : "hidden")}
          />
          <input
            className={"input-" + (errors?.form_first_name ? "show" : "hidden")}
            placeholder={t("firstName")}
            {...register("form_first_name")}
          />
          {errors?.form_first_name &&
            typeof errors.form_first_name !== "string" && (
              <p className="error">
                <img src={error} alt="error" />
                <p>{errors.form_first_name?.message}</p>
              </p>
            )}
        </div>
        <div className="input-box">
          <CiUser
            className={"icon-" + (errors?.form_last_name ? "show" : "hidden")}
          />
          <input
            className={"input-" + (errors?.form_last_name ? "show" : "hidden")}
            placeholder={t("lastName")}
            {...register("form_last_name")}
          />
          {errors?.form_last_name &&
            typeof errors.form_last_name !== "string" && (
              <p className="error">
                <img src={error} alt="error" />
                <p>{errors.form_last_name?.message}</p>
              </p>
            )}
        </div>
        <div className="input-box">
          <AiOutlineMail
            className={"icon-" + (errors?.form_email ? "show" : "hidden")}
          />
          <input
            className={"input-" + (errors?.form_email ? "show" : "hidden")}
            placeholder={t("email")}
            {...register("form_email")}
          />
          {errors?.form_email && typeof errors.form_email !== "string" && (
            <p className="error">
              <img src={error} alt="error" />
              <p>{errors.form_email?.message}</p>
            </p>
          )}
        </div>
       
      </div>
      <div className="page-one-button">
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

export default Page1;
