import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {db, auth } from "../Firebase/firebaseConfig";

const useAdminCheck = () => {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) return;

    const checkAdmin = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists() && userDoc.data().role === "admin") {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, [user]);

  return isAdmin;
};

export default useAdminCheck;
