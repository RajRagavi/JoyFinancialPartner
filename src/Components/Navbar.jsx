import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/Images/Logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-gray-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-5">
          {/* Logo */}
          <div className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="" className="w-[70px] h-[50px] object-cover"/>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-10 text-black cursor-pointer">
            <p onClick={() => navigate("/")} className="hover:text-blue-500 transition duration-300">
              Home
            </p>
            <p onClick={() => navigate("/about")} className="hover:text-blue-500 transition duration-300">
              About
            </p>
            <p onClick={() => navigate("/loans")} className="hover:text-blue-500 transition duration-300">
              Loans
            </p>
            <p onClick={() => navigate("/contact")} className="hover:text-blue-500 transition duration-300">
              Contact
            </p>
          </nav>

          {/* Buttons */}
          {/* <div className="hidden md:flex space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 font-bold hover:underline transition duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign Up →
            </button>
          </div> */}

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu with Animation */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`md:hidden overflow-hidden bg-gray-100 flex flex-col items-center py-4 space-y-4 ${
            isOpen ? "visible" : "invisible"
          }`}
        >
          <p onClick={() => { navigate("/"); setIsOpen(false); }} className="block hover:text-blue-500 transition duration-300">
            Home
          </p>
          <p onClick={() => { navigate("/about"); setIsOpen(false); }} className="block hover:text-blue-500 transition duration-300">
            About
          </p>
          <p onClick={() => { navigate("/loans"); setIsOpen(false); }} className="block hover:text-blue-500 transition duration-300">
            Loans
          </p>
          <p onClick={() => { navigate("/contact"); setIsOpen(false); }} className="block hover:text-blue-500 transition duration-300">
            Contact
          </p>
          {/* <button
            onClick={() => { navigate("/login"); setIsOpen(false); }}
            className="block text-blue-500 hover:underline font-bold cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => { navigate("/signup"); setIsOpen(false); }}
            className="block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button> */}
        </motion.div>
      </div>

      {/* Push Content Down to Avoid Overlapping */}
      <div className="h-[80px] md:h-[90px]"></div>
    </>
  );
};

export default Navbar;
