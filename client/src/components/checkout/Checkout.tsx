import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import "./Checkout.css";
import logo from "../../assets/logo.svg";
import amhlogo from "../../assets/amhlogo.svg";
import back from "../../assets/back.png";
import error from "../../assets/error.png"
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Order } from "../../hooks/orderHook";
import { useDispatch, useSelector } from "react-redux";
import { setTxRef } from "../../actions/authSlice";
import { useTranslation } from "react-i18next";
import { getAProduct } from "../../hooks/productHook";


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
  form_phone_number: z.string()
    .refine((value) => /^09[0-9]{8}$/.test(value), {
      message: 'Invalid Ethiopian phone number. It should start with 09 and be followed by 8 digits.',
    })
    .refine((value) => value === value.trim(), {
      message: 'Phone number should not have leading or trailing spaces.',
    }),
  form_kefele_ketema: z.string({
      required_error: "K/Ketema is required",
      invalid_type_error: "K/Ketema must be a string"}).min(3, {message: 'Last Name must be at least 3 characters'}),
  form_friendly_place: z.string({
      required_error: "Last Name is required",
      invalid_type_error: "Last Name must be a string"}).min(3, {message: 'Last Name must be at least 3 characters'}),
        
})

//extract the inferred type from schema
type ValidationSchemaType = z.infer<typeof schema>

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.userToken);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const product = useQuery({
    queryKey: ["gift", id],
    //@ts-ignore
    queryFn: () => getAProduct({id, token}),
  });

  const { mutate } = useMutation(Order, {
    onSuccess: (data) => {
      dispatch(
        setTxRef({
          tx_ref: data.tx_ref,
        })
      );
      const newWindow: any = window.open(data.url, "_self");
      if (newWindow.closed) {
        setPaymentLoading(false);
      }
    },
    onError: () => {
      navigate("/buyerpage/payment/failure");
    },
  });

  useEffect(() => {
    product.refetch();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit:  SubmitHandler<ValidationSchemaType> = (data:any) => {
    console.log("dataggg", data);
    mutate({
      FirstName: data.form_first_name,
      LastName: data.form_last_name,
      Email: data.form_email,
      PhoneNumber: data.form_phone_number,
      KefleKetema: data.form_kefele_ketema,
      FriendlyPlace: data.form_friendly_place,
      Amount: product.data.price,
      ProductId: product.data?._id,
      BuyerId: user._id,
      ProductName: product.data.name,
      ProductImage: product.data.image,
      OrderDate: new Date().toLocaleString(),
    });
    setPaymentLoading(true);
  }

  return (
    <div className="checkout">
      {paymentLoading && (
        <div className="payment-loading">
          <div className="payment-loader"></div>
        </div>
      )}
      <div className="checkout-info">
        <div className="back">
          <img
            src={back}
            alt="back"
            onClick={() => navigate(`/giftpage/${id}`)}
          />
        </div>
        <img src={t("logo") === "eng" ? logo : amhlogo} alt="logo" />
        <div className="checkout-info-price">
          <p className="pay">{t("buyerPayAmount")}</p>
          <p className="price">{product.data.price}Birr</p>
        </div>
        <div className="checkout-info-gift">
          <img
            src={
              "http://localhost:5000/" + product.data.image.substring(6)
            }
            alt="content-image"
            crossOrigin="anonymous"
          />
          <div className="info">
            <p>{product?.data?.name}</p>
            <p>{product?.data?.category}</p>
            <p>{product?.data?.date}</p>
          </div>
        </div>
      </div>
      <div className="checkout-input">
        <p>{t("buyerInformation")}</p>
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
          <input
            className={"input-" + (errors?.form_kefele_ketema ? "show" : "hidden")}
            placeholder={"Kefele Ketema"}
            {...register("form_kefele_ketema")}
          />
          {errors?.form_kefele_ketema &&
            typeof errors.form_kefele_ketema !== "string" && (
              <p className="error">
                <img src={error} alt="error" />
                <p>{errors.form_kefele_ketema?.message}</p>
              </p>
            )}
          <input
            className={"input-" + (errors?.form_friendly_place ? "show" : "hidden")}
            placeholder={"Friendly place Name"}
            {...register("form_friendly_place")}
          />
          {errors?.form_friendly_place &&
            typeof errors.form_friendly_place !== "string" && (
              <p className="error">
                <img src={error} alt="error" />
                <p>{errors.form_friendly_place?.message}</p>
              </p>
            )}
        <button onClick={handleSubmit(onSubmit)} >
          {t("buyercheckout")}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
