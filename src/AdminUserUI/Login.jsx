import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AOS from "aos";
import "aos/dist/aos.css";

import { auth } from "../Firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [firebaseError, setFirebaseError] = useState("");

  // Form Validation
  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input change
    setFirebaseError(""); // Clear Firebase error when user starts typing
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Login Successful! 🎉 Redirecting...");
      navigate("/dashboard"); // Redirect after successful login
    } catch (error) {
      setFirebaseError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        data-aos="zoom-in"
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-black text-center mb-6">
          Welcome Back!
        </h2>
        {firebaseError && <p className="text-red-500 text-center">{firebaseError}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label className="text-black block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none border-2 border-gray-300"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="text-black block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white border-2 border-gray-300 bg-opacity-20 text-black placeholder-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-400 text-black font-bold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-black text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
