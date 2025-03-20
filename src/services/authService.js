import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword  
} from "firebase/auth";



import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc 
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { app } from "../Firebase/firebaseConfig"; 

const auth = getAuth(app);
const db = getFirestore(app);



const checkFirestore = async () => {
  const userRef = doc(db, "users", "testUserId"); // Replace with an actual user ID
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    console.log("Firestore Data:", userSnap.data());
  } else {
    console.log("No document found!");
  }
};
checkFirestore();

/**
 * Retrieves a user's role from Firestore.
 * @param {string} uid - The user's unique ID.
 * @returns {Promise<string>} The user's role or a default value.
 */
export const getUserRole = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        console.log("✅ User Found:", userSnap.data());
        return userSnap.data().role;
      } else {
        console.error("❌ User document does not exist in Firestore for UID:", uid);
        return null;
      }
    } catch (error) {
      console.error("Firebase Error:", error);
      return null;
    }
  };



/**
 * Creates a new user with a specified role.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {string} role - The role assigned to the user.
 * @returns {Promise<object>} The created user object.
 */
export const createUserWithRole = async (email, password, role) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log("User Created:", user.uid); // ✅ Debugging Log
        
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role: role || "user",
        });

        console.log("Firestore Document Created:", user.uid); // ✅ Debugging Log
        return user;
    } catch (error) {
        console.error("Error creating user with role:", error);
        throw error;
    }
};




/**
 * React hook to track authentication and user role state.
 * @returns {{ user: object | null, role: string | null, loading: boolean }}
 */
export function useAuth() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("👤 Current User:", currentUser);
    
            if (currentUser) {
                await currentUser.getIdToken(true); // 🔹 Token Refresh
                console.log("🔄 Token refreshed successfully!");
    
                const userRole = await getUserRole(currentUser.uid);
                console.log("🔹 User Role:", userRole);
                setRole(userRole);
            } else {
                console.log("❌ No User Logged In");
                setRole(null);
            }
    
            setUser(currentUser);
            setLoading(false);
        });
    
        return () => unsubscribe();
    }, []);
    
    

    return { user, role, loading };
}


/**
 * Retrieves the currently authenticated user.
 * @returns {object | null} The current user object.
 */
export const getCurrentUser = () => auth.currentUser;
