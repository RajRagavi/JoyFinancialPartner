import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebaseConfig"; // Firebase setup
import { signOut } from "firebase/auth";
import { FaTachometerAlt, FaSync, FaFileAlt, FaList, FaChartBar, FaPrint, FaSignOutAlt, FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";


const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openLoanProcess, setOpenLoanProcess] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout Failed:", error.message);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu Button - Mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-60 bg-[#082b64] p-2 rounded-md text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 left-0 w-64 h-screen bg-[#082b64] text-white flex flex-col shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="text-center text-lg font-bold text-gray-200 py-4">
          <span className="text-blue-400">JOY</span> FINANCE
        </div>

        {/* Search Bar */}
        <div className="px-4 py-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 text-gray-900 bg-white rounded-md focus:outline-none"
            />
            <FaSearch className="absolute top-3 right-3 text-gray-500" />
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-2 space-y-2">
          <Link to="/dashboard" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 transition">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>

          {/* Loan process and submenu */}
          <div>
            <button
              onClick={() => setOpenLoanProcess(!openLoanProcess)}
              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-blue-500 transition"
            >
              <div className="flex items-center space-x-3">
                <FaSync />
                <span>Loan Process</span>
              </div>
              <FaChevronDown className={`transform ${openLoanProcess ? "rotate-180" : "rotate-0"}`} />
            </button>
            {openLoanProcess && (
              <div className="ml-6 mt-2 space-y-2">
              <Link to="/kyc-vehicle" className="flex items-center space-x-3 p-2 rounded-lg
               hover:bg-blue-500 transition">
            <span>KYC</span>
               </Link>
              <Link to="/kyc-vehicle" className="flex items-center space-x-3 p-2 rounded-lg
                hover:bg-blue-500 transition">
               <span>View</span>
              </Link>
                
              </div>
            )}
          </div>

          <Link to="/entry" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 transition">
            <FaFileAlt />
            <span>Entry</span>
          </Link>
          <Link to="/pending-lists" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 transition">
            <FaList />
            <span>Pending Lists</span>
          </Link>
          <Link to="/accounts" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 transition">
            <FaChartBar />
            <span>Accounts</span>
          </Link>
          <Link to="/notice-prints" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 transition">
            <FaPrint />
            <span>Notice & Prints</span>
          </Link>
        </nav>

        {/* Logout */}
        <div className="px-4 py-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-red-500 transition text-white"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
