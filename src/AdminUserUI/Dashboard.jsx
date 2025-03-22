import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Navigation Support
import StaffDashboard from "./Staff/StaffDashboard";
import AdminDashboard from "./AdminDashboard";
import { auth, db } from "../Firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {

  
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userRole = userSnap.data().role;
            setRole(userRole);
            if (userRole !== "admin" && userRole !== "staff") {
              alert("Access Denied! Only Admins Can View This Page.");
              navigate("/home"); // Redirect to Home
            }
          }
        } else {
          navigate("/login"); // Redirect to Login
        }
      });
    };
    checkUserRole();
  }, [navigate]);

  // If role is not fetched yet, show loading
  if (role === null) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {role === "admin" ? <AdminDashboard /> : <StaffDashboard />}
    </div>
  );
};

export default Dashboard;
