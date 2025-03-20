import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAg0_y4hnWlCR_WhkPHbe4_jhf43TNkfkQ",
  authDomain: "joyfinance-ebd24.firebaseapp.com",
  projectId: "joyfinance-ebd24",
  storageBucket: "joyfinance-ebd24.firebasestorage.app",
  messagingSenderId: "7860652375",
  appId: "1:7860652375:web:bf1e091b51e105e4d81612",
  measurementId: "G-R7EYWHJN3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics (Optional: Ensure it's only used in the browser)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Export Firebase instances
export { app, analytics };
export { db ,createUserWithEmailAndPassword };
export const auth = getAuth(app);
export { storage };