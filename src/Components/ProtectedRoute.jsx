import React from "react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserRole } from "../services/authService";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRole = await getUserRole(currentUser.uid);
        setRole(userRole);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  // 🚨 If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚨 If allowedRoles are specified and user's role is not in the list, deny access
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />; 
  }

  return children;
};

export default ProtectedRoute;
