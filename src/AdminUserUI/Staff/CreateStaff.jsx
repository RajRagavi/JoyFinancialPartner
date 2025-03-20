import React, { useState } from "react";
import { db, auth } from "../../Firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const formFields = [
  { label: "Name", name: "name", type: "text", placeholder: "Enter full name" },
  { label: "Email", name: "email", type: "email", placeholder: "Enter email address" },
  { label: "Password", name: "password", type: "password", placeholder: "Enter password" },
  { label: "Role", name: "role", type: "select", options: ["staff", "manager"] },
];

const CreateStaff = () => {
  const [staffData, setStaffData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setStaffData({ ...staffData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!staffData.name || !staffData.email || !staffData.password) {
      setMessage("All fields are required!");
      return;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        staffData.email,
        staffData.password
      );
      const user = userCredential.user;
      await addDoc(collection(db, "staff"), {
        uid: user.uid,
        name: staffData.name,
        email: staffData.email,
        role: staffData.role,
        createdAt: new Date(),
      });
      setMessage("Staff member added successfully!");
      setStaffData({ name: "", email: "", password: "", role: "staff" });
    } catch (error) {
      setMessage("Error adding staff: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Add Staff</h2>
      {message && <div className="mb-4 text-center text-sm text-red-600">{message}</div>}
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={staffData[field.name]}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={staffData[field.name]}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder={field.placeholder}
                required
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Staff"}
        </button>
      </form>
    </div>
  );
};

export default CreateStaff;