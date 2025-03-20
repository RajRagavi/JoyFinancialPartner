import React, { useState } from 'react'
import contact from '../assets/Images/contact.jpg'

const Contact = () => {

  // State variables
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required!";
    if (!formData.email.trim()) newErrors.email = "Email is required!";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required!";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty!";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 to-blue-500 p-6">
      <div className="text-white flex flex-col md:flex-row w-full max-w-4xl p-6">
        
        {/* Left Side - Image */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={contact}
            alt="Customer Service"
            className="rounded-lg"
          />
        </div>

        {/* Right Side - Contact Form */}
        <div className="md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>

          {/* Success Message */}
          {submitted && (
            <div className="bg-green-200 text-green-700 p-3 rounded-md mb-4">
              ✅ Your message has been sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Field */}
            <div>
              <label className="text-white font-medium">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Type Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Type Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="text-white font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Type Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label className="text-white font-medium">Message</label>
              <textarea
                rows="3"
                name="message"
                placeholder="Type Here"
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-400"
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-300 text-white py-2 
              rounded-lg shadow-md hover:bg-blue-700 font-semibold cursor-pointer"
            >
              Submit
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact