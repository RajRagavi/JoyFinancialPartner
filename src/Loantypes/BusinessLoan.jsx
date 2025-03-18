import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const BusinessLoan = () => {
  const [selectedLoan, setSelectedLoan] = useState("");

  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileImage = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files.map((file) => file.name));
  };

  const [formData, setFormData] = useState({
    adhaarFile: null,
    licenceFile: null,
  });
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("uplaoded Files:", formData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className=" bg-gray-200 min-h-screen flex flex-col">
      {/* Show Form Only for Vehicle Loans */}

      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-5xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Gold Loan form
        </h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Borrower Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Borrower Name *
            </label>
            <input
              type="text"
              name="Customer Name"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Personal Number*/}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Personal Number*
            </label>
            <input
              type="text"
              name="Customer Name"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Father Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Father Name
            </label>
            <input
              type="text"
              name="Customer Name"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Date*/}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">Date</label>
            <input
              type="text"
              name="Customer Name"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Alternate Number **/}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Alternate Number *
            </label>
            <input
              type="text"
              name="Customer Name"
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
              name="Customer Name"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Gold Rate today */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Gold Rate today *
            </label>
            <input
              type="text"
              name="Customer Name"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* CoBorrower Phone * */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              CoBorrower Phone **
            </label>
            <input
              type="text"
              name="Customer Name"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/*Required Loan Amount*/}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Required Loan Amount*
            </label>
            <input
              type="text"
              name="Customer Name"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/*Phone Number **/}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Phone Number **
            </label>
            <input
              type="text"
              name="Customer Name"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/*Monthly Income **/}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Monthly Income *
            </label>
            <input
              type="text"
              name="Customer Name"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/*Rate of Interest**/}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Rate of Interest*
            </label>
            <input
              type="text"
              name="Customer Name"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/*Total Gold Weight **/}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Total Gold Weight **
            </label>
            <input
              type="text"
              name="Customer Name"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/*Gold weight after wastage **/}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Gold weight after wastage *
            </label>
            <input
              type="text"
              name="Customer Name"
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
              <span className="flex-1 text-gray-500">
                {selectedFiles.length > 0
                  ? selectedFiles.join(", ")
                  : "Choose Images"}
              </span>
              <FaCloudUploadAlt className="text-gray-500 text-xl" />
            </div>
          </div>

          {/* Borrower Photo */}
          <div className="flex flex-col right-20">
            <label className="text-gray-700 text-sm font-medium">
              Borrower Photo*
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

          {/* Gold Photo Upload * */}
          <div className="flex flex-col right-20">
            <label className="text-gray-700 text-sm font-medium">
              Gold Photo Upload *
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

          {/* Pan Card Photo */}
          <div className="flex flex-col right-20">
            <label className="text-gray-700 text-sm font-medium">
              Pan Card Photo
            </label>
            <div className="relative border rounded p-2 mt-1 flex">
              <input
                type="file"
                multiple
                accept="png, jpeg,jpg"
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

          {/* Gold weight after wastage * */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Gold weight after wastage *
            </label>
            <input
              type="text"
              name="Customer Name"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/*Tenure */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">Tenure</label>
            <input
              type="text"
              name="Customer Name"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">City</label>
            <input
              type="text"
              name="Customer Name"
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
                Pin Code
              </label>
              <input
                type="text"
                className="border rounded p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm font-medium">
                Land Mark
              </label>
              <input
                type="text"
                className="border rounded p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
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
            {["Received Gold", "Aadhar Xerox"].map((doc) => (
              <label key={doc} className="flex items-center space-x-2 mt-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>{doc}</span>
              </label>
            ))}
          </div>

          {/* KYC Documents */}
          <div>
            {["Gold Verified ", "Vehicle Documents Verified ?"].map((doc) => (
              <label key={doc} className="flex items-center space-x-2 mt-5">
                <input type="checkbox" className="w-4 h-4" />
                <span>{doc}</span>
              </label>
            ))}
          </div>
        </form>

        {/* Submit Button */}
        <div className="flex justify-end gap-3 mt-4">
          <div className="col-span-full">
            <button
              type="submit"
              className="bg-blue-600 text-white px-10 py-2 rounded-lg shadow-md hover:bg-blue-700"
            >
              Back
            </button>
          </div>
          {/* Apply Now*/}
          <div className="col-span-full">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLoan;
