import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Close, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

const HomeNavbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const navigate = useNavigate();
  const RegisterNavigationLink = () => {
    navigate("/register");
  };
  const LoginNavigationLink = () => {
    navigate("/login");
  };

  const NavItem = ({ to, children }) => (
    <Link to={to} spy={true} smooth={true} duration={50} offset={-70}>
      <li className="p-4 cursor-pointer hover:text-[#00df9a]">{children}</li>
    </Link>
  );

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">RecyTrack</h1>
      <ul className="hidden md:flex items-center">
        <NavItem to="homeCard">Features</NavItem>
        <NavItem to="homeContact">Contact</NavItem>
        <NavItem to="homeAbout">About</NavItem>
        <li className="p-4 cursor-pointer">
          <CustomButton
            backgroundColor="#00df9a"
            textColor="#000"
            nonMobileText="Login"
            mobileText="Login"
            borderRadius="7px"
            fontWeight="700"
            padding="0.5rem 1.25rem"
            onClick={LoginNavigationLink}
          />
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <Close size={20} /> : <Menu size={20} />}
      </div>
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
          RecyTrack
        </h1>
        <NavItem onClick={handleNav} to="homeCard">
          Features
        </NavItem>
        <NavItem onClick={handleNav} to="homeContact">
          Contact
        </NavItem>
        <NavItem onClick={handleNav} to="homeAbout">
          About
        </NavItem>
        <li
          className="p-4 border-b border-gray-600 cursor-pointer hover:text-[#00df9a]"
          onClick={RegisterNavigationLink}
        >
          Register
        </li>
        <li className="p-4 border-b border-gray-600 cursor-pointer">
          <CustomButton
            backgroundColor="#00df9a"
            textColor="#000"
            nonMobileText="Login"
            mobileText="Login"
            borderRadius="7px"
            fontWeight="700"
            padding="0.5rem 2.25rem"
            onClick={LoginNavigationLink}
          />
        </li>
      </ul>
    </div>
  );
};

export default HomeNavbar;
