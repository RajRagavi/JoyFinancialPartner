import React from "react";

const formFields = [
  { name: "dueDate", label: "Due Date", type: "date", required: true },
  { name: "payMode", label: "Pay Mode", type: "text" , required: true},
  { name: "downPayment", label: "Down Payment", type: "number" , required: true},
  { name: "netPayable", label: "Net Payable", type: "number" , required: true},
  { name: "loanAmount", label: "Loan Amount", type: "number" , required: true},
  { name: "penalty", label: "Penalty / Day", type: "number", required: false },
  { name: "interest", label: "Interest %", type: "number", required: true },
  { name: "remarks", label: "Remarks", type: "text", required: false },
];

const VehiclePage2 = ({ formData = {}, setFormData }) => {
  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-5xl mt-4">
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {formFields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""} // ✅ Prevents undefined error
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default VehiclePage2;
