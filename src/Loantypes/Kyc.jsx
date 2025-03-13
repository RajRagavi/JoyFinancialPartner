import React from 'react'
import { useState } from 'react';
import BusinessLoan from './BusinessLoan';
import PropertyLoan from './PropertyLoan';

const Kyc = () => {
  const [selectedLoan, setSelectedLoan] = useState("");

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
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
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


  const loanContent = {
    "Vehicle Loan": "List of active loans will be displayed here.",
    "Business Loans": "List of closed loans will be displayed here.",
    "Property Loans": "List of seized loans will be displayed here.",
  };
  return (
    <div className="p-5 bg-gray-200 min-h-screen flex flex-col ml-64">

      {/* Loan Type Buttons */}
      <div className="flex flex-wrap space-x-6 px-10 justify-between mb-6">
        {["Vehicle Loan", "Gold Loan", ].map((loanType) => (
          <button
            key={loanType}
            onClick={() => setSelectedLoan(loanType)}
            className={`px-4 py-4 rounded-lg text-white font-semibold shadow-md transition ${
              selectedLoan === loanType ? "bg-blue-700" : "bg-blue-900 hover:bg-blue-700"
            }`}
          >
            {loanType}
          </button>
        ))}
      </div>

      {/* Show Form Only for Vehicle Loans */}
      {selectedLoan === "Vehicle Loan" && (
        <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Vehicle Loan Form</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            {/* Customer Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Customer Name *</label>
              <input type="text" name="Customer Name" value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/* Father Name  */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Father Name *</label>
              <input type="text" name="fathername" value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/* Vehicle Number  */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Vehicle Number *</label>
              <input type="text" name="vehicleNumer" value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/* Vehicle Make  */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Vehicle Make *</label>
              <input type="text" name="Vehiclemake" value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/* Vehicle  Model & Year   */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Vehicle Model & Year *</label>
              <input type="text" name="Vehiclemodel" value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/* Engine Number */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Engine Number *</label>
              <input type="text" name="engineNumber" value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/* Borrower Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Borrower Name *</label>
              <input type="text" name="borrowername" value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/* Monthly Income */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Monthly Income *</label>
              <input type="text" name="monthlyincome" value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/* Moblie Number  */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Moblie Number *</label>
              <input type="text" name="mobile Numer" value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/* Alternate Number  */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Alternate Number *</label>
              <input type="text" name="alternatenumber *" value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/* CoBorrower Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">CoBorrower Name *</label>
              <input type="text" name="Ccoborrowername *" value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/* CoBorrower Phone*/}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">CoBorrower Phone *</label>
              <input type="text" name="coborrowerphone" value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/* Occupation   */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Occupation  *</label>
              <input type="text" name="Occupation " value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/* Loan Required */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Loan Required</label>
              <input type="text" name="Loan Required" value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/* Other EMI */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Other EMI </label>
              <input type="text" name="Other EMI " value={formData.engineNumber} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div> 

            {/*Aadhar  Photo Upload */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Aadhar Photo *</label>
              <input type="file" name="Aadhar Photo" accept=".jpg,.png" onChange={handleFileChange} 
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>

            {/*Pan Upload */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Pan Photo *</label>
              <input type="file" name="panphoto" accept=".jpg,.png" onChange={handleFileChange} 
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>

            {/*Licence Upload */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Licence Photo *</label>
              <input type="file" name="Licencephoto" accept=".jpg,.png" onChange={handleFileChange} 
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>

            {/* Bike Live Photo Upload */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Bike Live Photo *</label>
              <input type="file" name="bikePhoto" accept=".jpg,.png" onChange={handleFileChange} 
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>
            

            {/* NOC or Ready-Cash (Drop Down) */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">NOC or Ready-Cash *</label>
              <select name="nocType" value={formData.nocType} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Select</option>
                <option value="NOC">NOC</option>
                <option value="Ready-Cash">Ready-Cash</option>
              </select>
            </div>

            {/* Amount */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Amount *</label>
              <input type="number" name="amount" value={formData.amount} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>

            {/* Months */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Months *</label>
              <input type="number" name="months" value={formData.months} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>

            {/* Interest */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium">Interest (%) *</label>
              <input type="number" name="interest" value={formData.interest} onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>

            {/* Hard-Proofs (Checkboxes) */}
            <div className="flex flex-col col-span-3">
              <label className="text-gray-700 text-sm font-medium">Hard-Proofs *</label>
              <div className="flex flex-wrap gap-4">
                {["Duplicate Key", "License Xerox", "Aadhar Xerox", "Original RC", "Ration Xerox"].map((proof) => (
                  <label key={proof} className="flex items-center space-x-2">
                    <input type="checkbox" value={proof} checked={formData.hardProofs.includes(proof)}
                      onChange={handleCheckboxChange} className="w-4 h-4"/>
                    <span>{proof}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Address Field with 3 Lines */}
            <div className="sm:col-span-2 md:col-span-3">
              <label className="text-gray-700 text-sm font-medium">Address *</label>
              <div className="flex flex-col gap-2">
                {["Line 1", "Line 2", "Line 3"].map((placeholder, index) => (
                  <input key={index} type="text" placeholder={placeholder}
                    className="border rounded p-2 mt-1 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-full mt-4 text-center">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
                Submit
              </button>
            </div>
          </form>
        </div>
    
      )}
      {/* Show Business Loan Form */}
      {selectedLoan === "Gold Loan" && <BusinessLoan />}
      {selectedLoan === "Property Loan" &&<PropertyLoan />}
    </div>
      
  )
}

export default Kyc