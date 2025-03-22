import React from "react";
import Logo from "../assets/Images/Logo.png";

const Footer = () => {
  return (
    <div className="bg-gray-100 py-6 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Logo & About */}
        <div className="flex flex-col space-y-4">
        <img 
  src={Logo} 
  alt="Joy Finance Logo" 
  className="h-16 w-auto mx-auto mb-3 ml-0"
/>



          <p className="text-sm text-gray-600 leading-relaxed">
            Joy Finance provides hassle-free vehicle loans, secure gold loans, and flexible business loans to support your financial goals with ease and reliability.
          </p>
        </div>

        {/* Reach Us */}
        <div className="text-left md:text-left">
          <h3 className="text-lg font-semibold">Reach Us</h3>
          <p className="text-sm text-gray-600 mt-2">
            Illupur-Pudukottai Road <br />
            +91 99437 85706
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
