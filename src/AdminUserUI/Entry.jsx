import React, { useState } from "react";

const formFields = [
  { label: "Date", type: "date" },
  { label: "Loan ID", type: "text" },
  { label: "Due Month", type: "month" },
  { label: "Paid Amount", type: "number" },
];

const Entry = () => {
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // 🔹 Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-5 bg-gray-200 min-h-screen flex flex-col lg:ml-64">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-5xl">
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* 🔹 Customer ID Input */}
          <div className="flex flex-col">
            <label className="block font-medium">Customer ID *</label>
            <input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="border p-2 w-full rounded-md"
            />
          </div>

          {/* 🔹 Customer Name (Auto-Fill) */}
          <div className="flex flex-col">
            <label className="block font-medium">Customer Name</label>
            <input
              type="text"
              value={customerName}
              readOnly
              className="border p-2 w-full bg-gray-100 rounded-md"
            />
          </div>

          {/* 🔹 Personal Details */}
          {formFields.map((field) => (
            <div key={field.label} className="flex flex-col">
              <label className="block font-medium">{field.label} *</label>
              <input
                type={field.type}
                name={field.label}
                value={formData[field.label] || ""}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md"
              />
              {errors[field.label] && (
                <p className="text-red-500 text-sm">{errors[field.label]}</p>
              )}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default Entry;
