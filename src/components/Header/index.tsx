import React, { useState, useRef, useEffect } from "react";
import { FaFileDownload, FaBars, FaTimes } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { useSpring, animated } from "react-spring";
import cv from "../../assets/cv.pdf";
import "./Header.scss";
import { contact } from "../../Types";
import NavBar from "../Nav";
import Socials from "../Socials";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(null);

  const navAnimation = useSpring({
    transform: isNavOpen ? "translateX(0%)" : "translateX(100%)",
    opacity: isNavOpen ? 1 : 0,
  });

  const openGithub = () => {
    window.open(contact.links.github, "_blank");
  };

  const handleCVDownload = () => {
    const anchor = document.createElement("a");
    anchor.href = cv;
    anchor.download = "JHMEEL_CV.pdf";
    anchor.click();
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !event.target.closest(".hamburger")
      ) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="left-icons">
        <FaFileDownload
          className="icon"
          size={27}
          onClick={handleCVDownload}
          title="Download CV"
        />
        <IoLogoGithub className="icon" size={24} onClick={openGithub} />
      </div>
      <div className="hamburger" onClick={toggleNav}>
        {isNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      <animated.div ref={navRef} className="nav-drawer" style={navAnimation}>
        
        <NavBar />
        <Socials/>
      </animated.div>
    </header>
  );
}

export default Header;
