import "./Dashboard.css";
import {  BsBoxes} from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { TbBrandBlogger } from "react-icons/tb";
import { CiDeliveryTruck, CiGift } from "react-icons/ci";
import { useQuery } from "react-query";
import { getAllCount } from "../../../hooks/adminHook";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MdPendingActions } from "react-icons/md";

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
          onClick={() => navigate("/admin/product/list")}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 1.2 }}
        >
          <div className="dash-info">
            <div className="count">{data?.product}</div>
            <p>Total Product</p>
          </div>
          <div className="dash-icon">
            <BsBoxes />
          </div>
        </motion.div>
        <motion.div
          className="dashboard-withdraw"
          onClick={() => navigate("/admin/order/pending")}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 1.2 }}
        >
          <div className="dash-info">
            <div className="count">{data?.pending}</div>
            <p>Pending Order</p>
          </div>
          <div className="dash-icon">
            <MdPendingActions />
          </div>
        </motion.div>
        <motion.div
          className="dashboard-blog"
          onClick={() => navigate("/admin/order/delivered")}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 1.2 }}
        >
          <div className="dash-info">
            <div className="count">{data?.delivered}</div>
            <p>Delivered Order</p>
          </div>
          <div className="dash-icon">
            <CiDeliveryTruck />
          </div>
        </motion.div>
        <motion.div
          className="dashboard-gift"
          onClick={() => navigate("/admin/blog/list")}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 1.2 }}
        >
          <div className="dash-info">
            <div className="count">{data?.blog}</div>
            <p>Total Blog</p>
          </div>
          <div className="dash-icon">
            <TbBrandBlogger />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
