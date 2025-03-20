import { useState } from "react";
import React from "react";
import VehiclePage2 from "./VehiclePage2";
import VehiclePage3 from "./VehiclePage3";
import { FaCloudUploadAlt } from "react-icons/fa";

const steps = [
  { id: 1, label: "Borrower and Vehicle Details" },
  { id: 2, label: "Loan Details" },
  { id: 3, label: "Camera" },
  
];

const Vehiclepage1 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    adhaarFile: null,
    licenceFile: null,
    bikePhoto: null,
    engineNumber: "",
    nocType: "",
    hardProofs: [],
    amount: "",
    months: "",
    interest: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Uploaded Files:", formData);
  };

  const [images, setImages] = useState([]);

  const handleFileImage = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const labels = [
    "RC Image",
    "Borrower Image",
    "Vehicle Front",
    "Vehicle Back",
  ];

  const inputLabels = [
    "Insurance Company Name",
    "Insurance Expiry Date",
    "Tax Expiry Date",
    "FC Expiry Date",
    "Permit Expiry Date",
  ];

  const finishProcess = () => {
    alert("Process Completed Successfully!");
  };

  return (
    <div className="p-5 bg-gray-200 min-h-screen flex flex-col ml-64">
      <div className="w-full  mx-auto mt-10">
        {/* Stepper Progress */}
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative flex-1 flex flex-col items-center font-semibold"
            >
              {index !== 0 && (
                <div
                  className={`absolute top-5 -left-1/2 w-full h-1 transition-all duration-300 ${
                    currentStep >= step.id ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
              <div
                className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                  currentStep >= step.id ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                {step.id}
              </div>
              <span className="text-sm mt-2 text-center">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Show Forms Based on Steps */}
        <div className="">
          {currentStep === 1 && (
            <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-5xl mt-4">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              >
                {/* Loan No */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    Loan No 
                  </label>
                  <input
                    type="text"
                    name="Loan No"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {/* GEO CODE */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    GEO CODE *
                  </label>
                  <input
                    type="text"
                    name="GEO CODE"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Vehicle Number */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    name="Vehicle Number"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/*Borrower Name **/}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    Borrower Name *
                  </label>
                  <input
                    type="text"
                    name="Borrower Name *"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* House Own/Rente */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    House Own/Rent*
                  </label>
                  <input
                    type="text"
                    name="House Own/Rent"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Vehicle Make */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    Vehicle Make
                  </label>
                  <input
                    type="text"
                    name="Vehicle Make"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    name="Date of Birth"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* CoBorrower Name * */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    CoBorrower Name *
                  </label>
                  <input
                    type="text"
                    name="CoBorrower Name *"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Vehicle Model Name */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    Vehicle Model Name
                  </label>
                  <input
                    type="text"
                    name="Vehicle Model Name"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Father Name * */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    Father Name *
                  </label>
                  <input
                    type="text"
                    name="Father Name *"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* CoBorrower Phone * */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    CoBorrower Phone *
                  </label>
                  <input
                    type="text"
                    name="CoBorrower Phone *"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Vehicle Year */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    Vehicle Year
                  </label>
                  <input
                    type="text"
                    name="Vehicle Year"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Phone Number * */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    name="Phone Number *"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Monthly Income * */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    Monthly Income *
                  </label>
                  <input
                    type="text"
                    name="Monthly Income *"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Vehicle Value */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    Vehicle Value
                  </label>
                  <input
                    type="text"
                    name="Vehicle Value"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Address Field with 3 Lines */}
                <div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <label className="text-gray-700 text-sm font-medium">
                      Address *
                    </label>
                    <div className="flex flex-col gap-2">
                      {["Line 1", "Line 2", "Line 3"].map(
                        (placeholder, index) => (
                          <input
                            key={index}
                            type="text"
                            placeholder={placeholder}
                            className="border rounded p-0.5 mt-1  focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side Fields */}

                <div className="flex flex-col gap-2">
                  <div>
                    <label className="text-gray-700 text-sm font-medium">
                      Vehicle Type
                    </label>
                    <input
                      type="text"
                      className="border rounded p-2 w-full mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm font-medium">
                      Engine number
                    </label>
                    <input
                      type="text"
                      className="border rounded p-2 w-full mt-1"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <label className="text-gray-700 text-sm font-medium">
                      Loan Required
                    </label>
                    <input
                      type="text"
                      className="border rounded p-2 w-full mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm font-medium">
                      Tenure
                    </label>
                    <input
                      type="text"
                      className="border rounded p-2 w-full mt-1"
                    />
                  </div>
                </div>

                {/* Bike Live Photo Upload */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    Bike Live Photos *
                  </label>
                  <div className="relative border rounded p-2 mt-1 flex">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileImage}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <span className="flex-1 text-gray-500">
                      {selectedFiles.length > 0
                        ? selectedFiles.join(", ")
                        : "Choose Images"}
                    </span>
                    <FaCloudUploadAlt className="text-gray-500 text-xl" />
                  </div>
                </div>

                {/* Chassis Number */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    Chassis Number
                  </label>
                  <input
                    type="text"
                    name="Chassis Number"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Interest Percentage %*/}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium">
                    Interest Percentage %
                  </label>
                  <input
                    type="text"
                    name="Interest Percentage %"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                    className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* KYC Documents */}
                <div>
                  <h2 className="font-medium">KYC Documents</h2>
                  {[
                    "Duplicate Key",
                    "License Xerox",
                    "Aadhar Xerox",
                    "Original RC",
                    "Ration Xerox",
                  ].map((doc) => (
                    <label
                      key={doc}
                      className="flex items-center space-x-2 mt-2"
                    >
                      <input type="checkbox" className="w-4 h-4" />
                      <span>{doc}</span>
                    </label>
                  ))}
                </div>

                {/*Upload Files */}
                <div className="space-y-3 max-w-sm mx-auto">
                  {labels.map((label, i) => (
                    <div key={i}>
                      <label className="block font-semibold">{`Upload ${label}`}</label>
                      <input
                        type="file"
                        multiple
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                                file:rounded-lg file:border-0 file:bg-blue-600 file:text-white 
                              hover:file:bg-blue-700"
                      />
                    </div>
                  ))}
                </div>

                {/* Input Fields Section */}
                <div className="space-y-4">
                  {inputLabels.map((label, i) => (
                    <div key={i}>
                      <label className="text-gray-700 text-sm font-medium">
                        {label}
                      </label>
                      <input
                        type="text"
                        className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  ))}
                </div>
              </form>
            </div>
          )}
          {currentStep === 2 && <VehiclePage2 />}
          {currentStep === 3 && <VehiclePage3 />}

        </div>

        {/* Previous & Next Buttons finish button */}
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={prevStep}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${
              currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${
              currentStep === steps.length
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentStep === steps.length}
          >
            Next
          </button>
          {/* Finish Button */}
          {currentStep === steps.length - 0 && (
            <button
              onClick={finishProcess}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vehiclepage1;
