import React, { useState } from 'react'

const BusinessLoan = () => {
  const [selectedLoan, setSelectedLoan] =useState("");
  
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
  

  return (
    <div className=' bg-gray-200 min-h-screen flex flex-col'>
    

      {/* Show Form Only for Vehicle Loans */}
      
        <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Gold Loan form</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {["Customer Name", , 
              "Borrower Name *", "Alternate Number *", "Amount",
              "Date", "CoBorrower Name *", "Interest","Months",
              "Father Name *", "CoBorrower Phone *", "Other EMI",
              "Mobile Number *", "Monthly Income *", "Loan Required",
               "Occupation ", "Land Mark *", "Pan Card Number *"
              ].map((label, index) =>(
                <div key={index} className='flex flex-col'>
                  <label className='text-gray-700 text-sm font-medium'>{label}</label>
                  <input type="text" 
                  className='border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'/>
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

          {/* Upload Customer Photo */}
          <div className='flex flex-col right-20'>
            <label className='text-gray-700 text-sm font-medium'>Customer Photo *</label>
            <input type="file" name="customerphoto" accept=".pdf,.jpg,.png" onChange={handleFileChange} 
              className='border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'/>
          </div>

          {/* Upload Gold Photo */}
          <div className='flex flex-col right-20'>
            <label className='text-gray-700 text-sm font-medium'>Gold Photo</label>
            <input type="file" name="goldphoto" accept=".pdf,.jpg,.png" onChange={handleFileChange} 
              className='border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'/>
          </div>

          {/* Gold Weight */}
          <div className='flex flex-col right-20'>
            <label className='text-gray-700 text-sm font-medium'>Gold Weight</label>
            <input type="file" name="goldweight" accept=".pdf,.jpg,.png" onChange={handleFileChange} 
              className='border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'/>
          </div>

          {/* Upload Gold Rate */}
          <div className='flex flex-col right-20'>
            <label className='text-gray-700 text-sm font-medium'>Today’s Gold Rate</label>
            <input type="file" name="goldrate" accept=".pdf,.jpg,.png" onChange={handleFileChange} 
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
      
    </div>
  )
}

export default BusinessLoan