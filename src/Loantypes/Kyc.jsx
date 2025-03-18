import React from "react";
import { useState } from "react";
import BusinessLoan from "./BusinessLoan";
import PropertyLoan from "./Vehiclepage1";
import { FaCloudUploadAlt } from "react-icons/fa";

const Kyc = () => {
  const [selectedLoan, setSelectedLoan] = useState("");

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const fileArray = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      [name]: fileArray,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      hardProofs: checked
        ? [...prev.hardProofs, value]
        : prev.hardProofs.filter((item) => item !== value),
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

  const loanContent = {
    "Vehicle Loan": "List of active loans will be displayed here.",
    "Business Loans": "List of closed loans will be displayed here.",
    "Property Loans": "List of seized loans will be displayed here.",
  };
  return (
    <div className="p-5 bg-gray-200 min-h-screen flex flex-col ml-64">
      {/* Loan Type Buttons */}
      <div className="flex flex-wrap space-x-6 px-10 justify-between mb-6">
        {["Vehicle Loan", "Gold Loan"].map((loanType) => (
          <button
            key={loanType}
            onClick={() => setSelectedLoan(loanType)}
            className={`px-4 py-4 rounded-lg text-white font-semibold shadow-md transition ${
              selectedLoan === loanType
                ? "bg-blue-700"
                : "bg-blue-900 hover:bg-blue-700"
            }`}
          >
            {loanType}
          </button>
        ))}
      </div>

      {/* Show Form Only for Vehicle Loans */}
      {selectedLoan === "Vehicle Loan" && (
        <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Vehicle Loan Form
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {/* Customer Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Customer Name *
              </label>
              <input
                type="text"
                name="Customer Name"
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Father Name  */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Father Name *
              </label>
              <input
                type="text"
                name="fathername"
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Vehicle Number  */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Vehicle Number *
              </label>
              <input
                type="text"
                name="vehicleNumer"
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Vehicle Make  */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Vehicle Make *
              </label>
              <input
                type="text"
                name="Vehiclemake"
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Vehicle  Model & Year   */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Vehicle Model & Year *
              </label>
              <input
                type="text"
                name="Vehiclemodel"
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Engine Number */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Engine Number *
              </label>
              <input
                type="text"
                name="engineNumber"
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Borrower Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Borrower Name *
              </label>
              <input
                type="text"
                name="borrowername"
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Monthly Income */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Monthly Income *
              </label>
              <input
                type="text"
                name="monthlyincome"
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Moblie Number  */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Moblie Number *
              </label>
              <input
                type="text"
                name="mobile Numer"
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Alternate Number  */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Alternate Number *
              </label>
              <input
                type="text"
                name="alternatenumber *"
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* CoBorrower Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                CoBorrower Name *
              </label>
              <input
                type="text"
                name="Ccoborrowername *"
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* CoBorrower Phone*/}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                CoBorrower Phone *
              </label>
              <input
                type="text"
                name="coborrowerphone"
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Occupation   */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Occupation *
              </label>
              <input
                type="text"
                name="Occupation "
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Loan Required */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Loan Required
              </label>
              <input
                type="text"
                name="Loan Required"
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Other EMI */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Other EMI{" "}
              </label>
              <input
                type="text"
                name="Other EMI "
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Tenure*/}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Tenure
              </label>
              <input
                type="text"
                name="Loan Required"
                value={formData.engineNumber}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/*Aadhar  Photo Upload */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Aadhar Front & Back Side Photo
              </label>
              <div className="relative border rounded p-2 mt-1 flex">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileImage}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className="flex-1 text-gray-500">Choose Images</span>
                <FaCloudUploadAlt className="text-gray-500 text-xl" />
              </div>

              {/* Image Preview */}
              <div className="mt-3 grid  gap-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt="uploaded"
                    className="h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/*Pan Upload */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Pan Photo *
              </label>
              <div className="relative border rounded p-2 mt-1 flex">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileImage}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className="flex-1 text-gray-500">Choose Images</span>
                <FaCloudUploadAlt className="text-gray-500 text-xl" />
              </div>

              {/* Image Preview */}
              <div className="mt-3 grid  gap-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt="uploaded"
                    className="h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/*Licence Upload */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Licence Photo *
              </label>
              <div className="relative border rounded p-2 mt-1 flex">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileImage}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className="flex-1 text-gray-500">Choose Images</span>
                <FaCloudUploadAlt className="text-gray-500 text-xl" />
              </div>

              {/* Image Preview */}
              <div className="mt-3 grid  gap-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt="uploaded"
                    className="h-20 object-cover rounded"
                  />
                ))}
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
                <span className="flex-1 text-gray-500">Choose Images</span>
                <FaCloudUploadAlt className="text-gray-500 text-xl" />
              </div>

              {/* Image Preview */}
              <div className="mt-3 grid  gap-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt="uploaded"
                    className="h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Amount *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Months */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Months *
              </label>
              <input
                type="number"
                name="months"
                value={formData.months}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Interest */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Interest (%) *
              </label>
              <div className="relative border rounded p-2 mt-1 flex">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileImage}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className="flex-1 text-gray-500">Choose Images</span>
                <FaCloudUploadAlt className="text-gray-500 text-xl" />
              </div>

              {/* Image Preview */}
              <div className="mt-3 grid  gap-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt="uploaded"
                    className="h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* Upload Input with Icon */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">
                Vehicle Photo Upload *
              </label>
              <div className="relative border rounded p-2 mt-1 flex">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileImage}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className="flex-1 text-gray-500">Choose Images</span>
                <FaCloudUploadAlt className="text-gray-500 text-xl" />
              </div>

              {/* Image Preview */}
              <div className="mt-3 grid  gap-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt="uploaded"
                    className="h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>
            {/* Address Field with 3 Lines */}
            <div>
              <div className="sm:col-span-2 md:col-span-3">
                <label className="text-gray-700 text-sm font-medium">
                  Address *
                </label>
                <div className="flex flex-col gap-2">
                  {["Line 1", "Line 2", "Line 3"].map((placeholder, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={placeholder}
                      className="border rounded p-0.5 mt-1  focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Right Side Fields */}

            <div className="flex flex-col gap-2">
              <div>
                <label className="text-gray-700 text-sm font-medium">
                  Chassis Number
                </label>
                <input type="text" className="border rounded p-2 w-full mt-1" />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-medium">
                  Land Mark
                </label>
                <input type="text" className="border rounded p-2 w-full mt-1" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 text-sm font-medium">Date</label>
              <input
                type="text"
                name="alternatenumber *"
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
                <label key={doc} className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>{doc}</span>
                </label>
              ))}
            </div>

            {/* NOC */}
            <div className="grid grid-cols-2 ">
              <div className="flex flex-col md:flex-col-3">
                <h2 className="font-medium">NOC</h2>
                <label className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="w-4 h-4" />
                </label>
              </div>

              {/* Ready Cash */}
              <div className="flex flex-col">
                <h2 className="font-medium">Ready Cash</h2>
                <label className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="w-4 h-4" />
                </label>
              </div>

              {/* Extra Verification Checkboxes */}
              <div className="col-span-3  flex  flex-col mt-4">
                {[
                  "Borrower House Verified",
                  "Vehicle Documents Verified ?",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <input type="checkbox" className="w-4 h-4" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Received and Checked KYC */}
            <div>
              <h2 className="font-medium">
                Received and checked KYC Documents for both Borrower and
                Guarantor ?
              </h2>
              <label className="flex space-x-2 mt-2">
                <input type="checkbox" className="w-4 h-4" />
              </label>
            </div>

            
          </form>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
              <div className="col-span-full mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-10 py-2 rounded-lg shadow-md hover:bg-blue-700"
                >
                  Back
                </button>
              </div>
              {/* Apply Now*/}
              <div className="col-span-full mt-4">
              <a href="/vechile-next-page-one"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md
               hover:bg-blue-700 block text-center">Apply Now</a>
              </div>
            </div>
        </div>
      )}
      {/* Show Business Loan Form */}
      {selectedLoan === "Gold Loan" && <BusinessLoan />}
      {selectedLoan === "Property Loan" && <PropertyLoan />}
    </div>
  );
};

export default Kyc;
