import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBlog, FaUser } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import "./style.scss";

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = [
    { path: "/", icon: AiFillHome, label: "Home" },
    { path: "/about", icon: FaUser, label: "About" },
    { path: "/skills", icon: BiBook, label: "Skills" },
    { path: "/blog", icon: FaBlog, label: "Blog" },
  ];

  return (
    <nav className="nav-bar">
      {navItems.map(({ path, icon: Icon, label }) => (
        <button
          key={path}
          className={`nav-bar__item ${pathname === path ? "active" : ""}`}
          onClick={() => navigate(path)}
        >
          <Icon className="nav-bar__icon"/>
          <span className="nav-bar__label">{label}</span>
        </button>
      ))}
      
    </nav>
  );
};

export default NavBar;