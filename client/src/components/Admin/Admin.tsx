import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

//Icons
import { TbBrandBlogger } from "react-icons/tb";
import { BsBoxSeam, BsCart3 } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
//@ts-ignore
import Cookies from "js-cookie";
import m from "../../assets/m.svg";
import "./Admin.css";
import { useDispatch } from "react-redux";
import { setLogout } from "../../actions/authSlice";

function Admin() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  function handleLogout() {
    dispatch(setLogout());
  }
  return (
    <div className="admin">
      <Sidebar
        className="admin-sidebar"
        collapsed={collapsed}
        style={{ backgroundColor: "#c44569", color: "#000" }}
      >
        <div className="header" onClick={() => setCollapsed(!collapsed)}>
          <img src={m} alt="logo" className="m-logo" />
          {collapsed ? <></> : <p> MeritaGifts</p>}
        </div>
        {collapsed ? (
          <p className="sidebar-topic"></p>
        ) : (
          <p className="sidebar-topic">Dashboard</p>
        )}
        <Menu>
          <MenuItem
            component={<Link to="/admin/dashdoard" />}
            icon={<MdDashboard />}
          >
            Dashboard
          </MenuItem>
        </Menu>

        {collapsed ? (
          <p className="sidebar-topic"></p>
        ) : (
          <p className="sidebar-topic">General</p>
        )}

        <Menu>
          <SubMenu label="Product" icon={<BsBoxSeam />}>
            <MenuItem component={<Link to="/admin/product/post" />}>Post</MenuItem>
            <MenuItem component={<Link to="/admin/product/list" />}>List</MenuItem>
          </SubMenu>
          <SubMenu label="Order" icon={<BsCart3 />}>
            <MenuItem component={<Link to="/admin/order/pending" />}>Pending</MenuItem>
            <MenuItem component={<Link to="/admin/order/delivered" />}>Deliverd</MenuItem>
          </SubMenu>
          <SubMenu label="Blog" icon={<TbBrandBlogger />}>
            <MenuItem component={<Link to="/admin/blog/post" />}>Post</MenuItem>
            <MenuItem component={<Link to="/admin/blog/list" />}>List</MenuItem>
          </SubMenu>          
        </Menu>
        {collapsed ? (
          <p className="sidebar-topic"></p>
        ) : (
          <p className="sidebar-topic"> Extra</p>
        )}
        <Menu>
          <MenuItem
            onClick={handleLogout}
            component={<Link to="/admin/login" />}
            icon={<CiLogout />}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      <Outlet />
    </div>
  );
}

export default Admin;
