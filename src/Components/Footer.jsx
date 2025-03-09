import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      {/* Top Section */}
      <section
        id="footer"
        className="bg-blue-950 text-white p-10 py-15 grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
      >
        {/* Contact Info */}
        <div>
          <h2 className="font-bold text-3xl">Get In Touch</h2>
          <p className="mt-3 text-gray-300">
            The gradual accumulation of information about atomic and small-scale behavior
            during the first quarter of the 20th century.
          </p>
        </div>

        {/* Subscription Box */}
        <div className="flex flex-col md:flex-row items-center md:space-x-3 space-y-3 md:space-y-0">
          <input
            type="email"
            placeholder="Your Email"
            className="bg-white text-black px-4 py-2 font-semibold rounded-md w-full md:w-auto"
          />
          <button className="bg-blue-500 text-white px-5 py-2 font-semibold rounded-md hover:bg-blue-600 transition">
            Subscribe
          </button>
        </div>
      </section>

      {/* Links Section */}
      <div className="bg-gray-100 py-8 px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Get In Touch */}
          <div>
            <h3 className="text-lg font-semibold">Get In Touch</h3>
            <p className="text-sm text-gray-600 mt-2">
              The quick fox jumps over the lazy dog.
            </p>
            <div className="flex space-x-4 mt-3">
              <FaFacebook size={28} className="text-blue-600 cursor-pointer hover:opacity-75" />
              <FaInstagram size={28} className="text-pink-500 cursor-pointer hover:opacity-75" />
              <FaTwitter size={28} className="text-blue-400 cursor-pointer hover:opacity-75" />
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold">Company Info</h3>
            <ul className="text-gray-600 mt-2 space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500">About Us</a></li>
              <li><a href="#" className="hover:text-blue-500">Career</a></li>
              <li><a href="#" className="hover:text-blue-500">We are hiring</a></li>
              <li><a href="#" className="hover:text-blue-500">Blog</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="text-gray-600 mt-2 space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500">Business Loans</a></li>
              <li><a href="#" className="hover:text-blue-500">Vehicle Loan</a></li>
              <li><a href="#" className="hover:text-blue-500">Daily Fin</a></li>
            </ul>
          </div>

          {/* Reach Us */}
          <div>
            <h3 className="text-lg font-semibold">Reach Us</h3>
            <p className="text-sm text-gray-600 mt-2">
              123, Main Street, City, Country <br />
              support@example.com <br />
              +123 456 7890
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
