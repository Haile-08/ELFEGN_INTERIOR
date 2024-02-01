import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { loginAdmin } from "../../hooks/adminHook";
import { motion } from "framer-motion";
// @ts-ignore
import Cookies from "js-cookie";
import "./AdminLogin.css";
import { useDispatch } from "react-redux";
import { setLogin } from "../../actions/authSlice";

function AdminLogin() {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { mutate } = useMutation(loginAdmin, {
    onSuccess: (data) => {
      dispatch(
        setLogin({
          user: data.user,
          adminToken: data.token,
        })
      );
      navigate("/admin/dashdoard");
    },
    onError: () => {
      setLoginError(true);
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  const handleToggle = () => {
    setVisible(!isVisible);
  };

  const handleChange = (e: any) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate({ email: post.email, password: post.password });
  };
  return loading ? (
    <div className="admin-main-loader">
      <div className="admin-loader"></div>
    </div>
  ) : (
    <div className="admin_login">
      <div className="admin_login_form">
        <p>Admin Login</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={post.email}
            onChange={handleChange}
          />
          <input
            type={!isVisible ? "password" : "text"}
            placeholder="Password"
            name="password"
            value={post.password}
            onChange={handleChange}
          />
          <div className="show-admin-password">
            <input type="checkbox" name="show" onClick={handleToggle} />
            <p>show password</p>
          </div>
          <div className="admin-login-error-message">
            {loginError && <p>Incorrect password or email.</p>}
          </div>
          <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 1.2 }}>
            Login
          </motion.button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
