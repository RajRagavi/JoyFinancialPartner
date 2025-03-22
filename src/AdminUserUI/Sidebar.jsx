import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Logo from "../assets/Images/Logo.png";
import { 
  FaTachometerAlt, FaSync, FaFileAlt, FaList, FaSignOutAlt, 
  FaSearch, FaBars, FaTimes, FaChevronDown, FaUsers 
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openLoanProcess, setOpenLoanProcess] = useState(false);
  const [openStaff, setOpenStaff] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserRole(userSnap.data().role);
        }
      } else {
        setUserRole(null); // If no user, reset role
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserRole(user);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Failed:", error.message);
    }
  };

  return (
    <>
      {/* Hamburger Menu Button */}
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
        <div className="flex justify-center py-4 bg-gradient-to-r from-blue-700 to-gray-800 shadow-md">
          <div className="bg-white p-2 rounded-lg">
            <img src={Logo} alt="Joy Financial Logo" className="h-16 w-auto" />
          </div>
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

          {/* Loan Process Dropdown */}
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
                <Link to="/kyc-vehicle" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 transition">
                  <span>KYC</span>
                </Link>
                {!loading && userRole === "admin" && (
                  <Link to="/view_loan" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 transition">
                    <span>View Loan</span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* ✅ Only Show Staff Management if userRole is "admin" */}
          {!loading && userRole === "admin" && (
            <div>
              <button
                onClick={() => setOpenStaff(!openStaff)}
                className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-blue-500 transition"
              >
                <div className="flex items-center space-x-3">
                  <FaUsers />
                  <span>Staff Management</span>
                </div>
                <FaChevronDown className={`transform ${openStaff ? "rotate-180" : "rotate-0"}`} />
              </button>
              {openStaff && (
                <div className="ml-6 mt-2 space-y-2">
                  <Link to="/staff/add" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 transition">
                    <span>Add Staff</span>
                  </Link>
                </div>
              )}
            </div>
          )}

          <Link to="/entry" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 transition">
            <FaFileAlt />
            <span>Entry</span>
          </Link>
          <Link to="/pending-lists" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 transition">
            <FaList />
            <span>Pending Lists</span>
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
