import "./AuthLoading.css";
import { useMutation } from "react-query";
import { getuserinfo } from "../../hooks/userHook";
import { useDispatch } from "react-redux";
import { setLogin } from "../../actions/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function AuthLoading() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, token, isbuyer } = useParams();

  console.log("param id", id);
  console.log("param token", token);
  console.log("param isbuyer", isbuyer);
  const setter = useMutation(getuserinfo, {
    onSuccess: (data) => {
      console.log(data);
      if (data.is_a_buyer) {
        dispatch(
          setLogin({
            user: data,
            buyerToken: token,
          })
        );
        navigate("/buyerpage/shop");
      } else {
        dispatch(
          setLogin({
            user: data,
            sellerToken: token,
          })
        );
        navigate("/sellerpage/profile");
      }
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  useEffect(() => {
    if (id) {
      setter.mutate(id);
    }
  }, []);
  return (
    <div className="auth-main-loader">
      {" "}
      <div className="auth-loader"></div>{" "}
    </div>
  );
}

export default AuthLoading;
