import "./Dashboard.css";
import { BsCart3 } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { TbBrandBlogger } from "react-icons/tb";
import { CiGift } from "react-icons/ci";
import { useQuery } from "react-query";
import { getAllCount } from "../../../hooks/adminHook";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  const token = useSelector((state: any) => state.auth.adminToken);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["count"],
    queryFn: () => getAllCount(token),
  });
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  return isLoading ? (
    <div className="admin-main-loader">
      <div className="admin-loader"></div>
    </div>
  ) : (
    <div className="dashboard">
      <div className="dashboard-dash">
        <motion.div
          className="dashboard-order"
          onClick={() => navigate("/admin/orders")}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 1.2 }}
        >
          <div className="dash-info">
            <div className="count">{data?.count?.order}</div>
            <p>Total order</p>
          </div>
          <div className="dash-icon">
            <BsCart3 />
          </div>
        </motion.div>
        <motion.div
          className="dashboard-withdraw"
          onClick={() => navigate("/admin/withdraw")}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 1.2 }}
        >
          <div className="dash-info">
            <div className="count">{data?.count?.withdraw}</div>
            <p>Total withdraw</p>
          </div>
          <div className="dash-icon">
            <BsCashCoin />
          </div>
        </motion.div>
        <motion.div
          className="dashboard-blog"
          onClick={() => navigate("/admin/blog/list")}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 1.2 }}
        >
          <div className="dash-info">
            <div className="count">{data?.count?.blog}</div>
            <p>Total blog post</p>
          </div>
          <div className="dash-icon">
            <TbBrandBlogger />
          </div>
        </motion.div>
        <motion.div
          className="dashboard-gift"
          onClick={() => navigate("/admin/gifts")}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 1.2 }}
        >
          <div className="dash-info">
            <div className="count">{data?.count?.gift}</div>
            <p>Total gift</p>
          </div>
          <div className="dash-icon">
            <CiGift />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
