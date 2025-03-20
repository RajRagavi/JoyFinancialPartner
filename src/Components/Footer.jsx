import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Logo from "../assets/Images/Logo.png";

const Footer = () => {
  return (
    <div>
      {/* Top Section */}

      {/* Links Section */}
      <div className="bg-gray-100 py-8 px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 justify-between gap-10">
          {/* Get In Touch */}
          <div>
            <img src={Logo} alt="" className="w-40 h-30" />
            <h3 className="text-sm font-semibold mt-2">
              
            </h3>
            <div className="flex space-x-4 mt-3">
              <FaFacebook
                size={28}
                className="text-blue-600 cursor-pointer hover:opacity-75"
              />
              <FaInstagram
                size={28}
                className="text-pink-500 cursor-pointer hover:opacity-75"
              />
              <FaTwitter
                size={28}
                className="text-blue-400 cursor-pointer hover:opacity-75"
              />
            </div>
          </div>

          {/* Company Info */}
          <div>
            <p className="text-md italic max-w-lg mx-auto font-">
              "Joy Finance provides hassle-free vehicle loans, secure gold
              loans, and flexible business loans to support your financial goals
              with ease and reliability."
            </p>
          </div>

          {/* Reach Us */}
          <div>
            <h3 className="text-lg font-semibold">Reach Us</h3>
            <p className="text-sm mt-2">
              123, Main Street, City, Country <br />
              support@example.com <br />
              +123 456 7890
            </p>
          </div>
        </div>
        <div>
          <p className="font-semibold text-sm text-center">
            © {new Date().getFullYear()}{" "}
            <span className="text-blue-500">Joy</span> Finance. Developed by{" "}
            <a href="https://teknospot.in/" className="hover:underline italic">
              Tekno Spot
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
