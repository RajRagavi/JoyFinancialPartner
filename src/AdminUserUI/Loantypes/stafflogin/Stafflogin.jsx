import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Printer, Rss } from "lucide-react";
import Staffloginpage2 from "./Staffloginpage2";
import Staffloginpage3 from "./Staffloginpage3";

const Stafflogin = () => {
  
  const [showTable, setShowTable] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { id: 1, label: "Common Search" },
    { id: 2, label: "Customer Search" },
    { id: 3, label: "Pay Bill Now" },
  ];

  const handleSearch = () => {
    setShowTable(true);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(`Clicked: ${data.card}`);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishProcess = () => {
    alert("Process Completed Successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col ml-64">
      <div className="">

        {/* ✅ Stepper Progress UI */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-semibold px-4">{steps[currentStep - 1].label}</h1>

        {/* ✅ Step 1: Common Search */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Loan ID</label>
              <input
                type="text"
                name="Loan ID"
                placeholder="Loan ID"
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Phone Number</label>
              <input
                type="text"
                name="Phone Number"
                placeholder="Phone Number"
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Name</label>
              <input
                type="text"
                name="Name"
                placeholder="Name"
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col mt-6">
              <button
                type="Search"
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {/* ✅ Table - Show After Search */}
        {currentStep === 1 && showTable && (
          <div className="mt-8 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Search Results</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Loan ID</th>
                  <th className="border border-gray-300 p-2">Customer Name</th>
                  <th className="border border-gray-300 p-2">Loan Paid</th>
                  <th className="border border-gray-300 p-2">Pending</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="border border-gray-300 p-2">12345</td>
                  <td className="border border-gray-300 p-2">John Doe</td>
                  <td className="border border-gray-300 p-2">9876543210</td>
                  <td className="border border-gray-300 p-2">Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* EMI Calculator */}
        <div>
        EMI Calculator
        </div>

        {/* ✅ Step 2: Customer Search */}
        {currentStep === 2 && <Staffloginpage2/>}

        {/* ✅ Step 3: Pay Bill Now */}
        {currentStep === 3 && <Staffloginpage3/>}

        {/* ✅ Navigation Buttons */}
        <div className="flex justify-end mt-6 space-x-3">
        <button
            onClick={prevStep}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${
              currentStep === 1 ? "opacity-50 cursor-allowed" : ""
            }`}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${
              currentStep === steps.length ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentStep === steps.length}
          >
            Next
          </button>

          {/* Finish Button */}
          {currentStep === steps.length - 0 && (
            <button
              onClick={finishProcess}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
            >
              Save & Print
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stafflogin;
