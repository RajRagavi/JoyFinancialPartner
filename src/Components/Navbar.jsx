import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Images/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="container mx-auto h-20 flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img src={Logo} alt="Joy Financial Logo" 
              className="h-12 sm:h-10 md:h-12 lg:h-14 w-auto" />
          </div>

          {/* Attractive Login Button */}
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:scale-105 transition transform duration-300"
          >
            Login
          </button>
        </div>
      </div>

      {/* Push Content Down to Avoid Overlapping */}
      <div className="h-[80px]"></div>
    </>
  );
};

export default Navbar;
