import React, { useState } from "react";

const formFields = [
  { label: "Due Date", type: "date", required: true },
  { label: "Pay Mode", type: "text", required: true },
  { label: "Down Payment", type: "number", required: true },
  { label: "Net Payable", type: "number", required: true },
  { label: "Loan Amount", type: "number", required: true },
  { label: "Penalty / Day", type: "number", required: false },
  { label: "Interest %", type: "number", required: true },
  { label: "Remarks", type: "text", required: false },
];

const VehiclePage2 = ({ goToNext }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error when user types
  };

  // Validate Form Before Moving to Next Page
  const validateForm = () => {
    let newErrors = {};
    formFields.forEach((field) => {
      if (field.required && !formData[field.label]) {
        newErrors[field.label] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next Button Click
  const handleNext = () => {
    if (validateForm()) {
      goToNext(); // Move to the next page if validation passes
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-5xl mt-4">
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {formFields.map((field) => (
            <div key={field.label} className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.label}
                value={formData[field.label] || ""}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors[field.label] && (
                <span className="text-red-500 text-xs">{errors[field.label]}</span>
              )}
            </div>
          ))}
        </form>

       
      </div>
    </div>
  );
};

export default VehiclePage2;
