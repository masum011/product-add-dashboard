import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { SiGoogleanalytics } from "react-icons/si";
import { IoHome } from "react-icons/io5";
import { Link, Navigate, useLocation } from "react-router-dom";
import "./layout.css";
import Logo from "../components/svg/Logo";
const SideBar = () => {
  const location = useLocation();
  return (
    <Sidebar>
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            if (level === 0 || level === 1) {
              return {
                // marginBlock:'0.5em',
                backgroundColor: active ? "#484848" : undefined,
                color: active ? "#DADADA" : undefined,
              };
            }
          },
        }}
      >
        <div id="logo">
          <Logo />
        </div>
        <MenuItem
          icon={<input type="checkbox" className="sidebarcheck"/>}
          active={location.pathname === "/"}
          component={<Link to="/" />}
        >
          Home
        </MenuItem>
        <MenuItem
          icon={<input type="checkbox"/>}
          active={location.pathname === "/Stores"}
          component={<Link to="/Stores" />}
        >
          Stores
        </MenuItem>
        <MenuItem
          icon={<input type="checkbox"/>}
          active={location.pathname === "/add-product"}
          component={<Link to="/add-product" />}
        >
          Products
        </MenuItem>
        <MenuItem
          icon={<input type="checkbox"/>}
          active={location.pathname === "/Catalogue"}
          component={<Link to="/Catalogue" />}  
        >
          Catalogue
        </MenuItem>
        <MenuItem
          icon={<input type="checkbox"/>}
          active={location.pathname === "/Promotions"}
          component={<Link to="/Promotions" />}
        >
          Promotions
        </MenuItem>
        <MenuItem
          icon={<input type="checkbox"/>}
          active={location.pathname === "/Reports"}
          component={<Link to="/Reports" />}
        >
          Reports
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
