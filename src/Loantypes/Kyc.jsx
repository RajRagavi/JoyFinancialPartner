import React from 'react'
import { useState } from 'react';
import BusinessLoan from './BusinessLoan';
import PropertyLoan from './PropertyLoan';

const Kyc = () => {
  const [selectedLoan, setSelectedLoan] = useState("");

  const [formData, setFormData] =useState({
    adhaarFile: null,
    licenceFile: null,
  });
  const handleFileChange =(e) =>{
    const{name, files} =e.target;
    setFormData((prev) =>({
      ...prev, [name]: files[0],
    }))
  }
  const handleSubmit =(e) =>{
    e.preventDefault();
    console.log("uplaoded Files:", formData);
  }

  const loanContent = {
    "Vehicle Loan": "List of active loans will be displayed here.",
    "Business Loans": "List of closed loans will be displayed here.",
    "Property Loans": "List of seized loans will be displayed here.",
  };
  return (
    <div className="p-5 bg-gray-200 min-h-screen flex flex-col ml-64">

      {/* Loan Type Buttons */}
      <div className="flex flex-wrap space-x-6 px-10 justify-between mb-6">
        {["Vehicle Loan", "Business Loan", "Property Loan"].map((loanType) => (
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
          <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Proposal Number", "Land Mark *", "Vehicle Number",
              "Borrower Name *", "Alternate Number *", "Vehicle Make",
              "Date", "CoBorrower Name *", "Vehicle Model & Year",
              "Father Name *", "CoBorrower Phone *", "Vehicle Value",
              "Phone Number *", "Monthly Income *", "Loan Required",
               "Occupation ", "Pan Card Number *",
            ].map((label, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium">{label}</label>
                <input
                  type="text"
                  className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}

            {/* Upload Adhaar Card */}
          <div className='flex flex-col'>
            <label className='text-gray-700 text-sm font-medium'>Adhaar Card *</label>
            <input type="file" name="adhaarFile" accept=".pdf,.jpg,.png" onChange={handleFileChange} 
              className='border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'/>
          </div>

          {/* Upload Licence */}
          <div className='flex flex-col right-20'>
            <label className='text-gray-700 text-sm font-medium'>Licence *</label>
            <input type="file" name="licenceFile" accept=".pdf,.jpg,.png" onChange={handleFileChange} 
              className='border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'/>
          </div>

            {/* Address Field with 3 Lines */}
            <div className="sm:col-span-2 md:col-span-3">
              <label className="text-gray-700 text-sm font-medium">Address *</label>
              <div className="flex flex-col gap-2 ">
                <input type="text" placeholder="Line 1" className="border rounded p-2 mt-1 w-1/3 
                focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="text" placeholder="Line 2" className="border rounded p-2 mt-1 w-1/3 
                focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="text" placeholder="Line 3" className="border rounded p-2 mt-1 w-1/3 
                focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
            </div>

            <div className='col-span-full mt-4 text-center'>
            <button type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
              Submit
            </button>
          </div>
          </form>
        </div>
      )}
      {/* Show Business Loan Form */}
      {selectedLoan === "Business Loan" && <BusinessLoan />}
      {selectedLoan === "Property Loan" &&<PropertyLoan />}
    </div>
      
  )
}

export default Kyc