import React, { useState }from 'react'

const PropertyLoan = () => {

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
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Loan form</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {["Proposal Number", "Land Mark *", "Vehicle Number",
              "Borrower Name *", "Alternate Number *", "Vehicle Make",
              "Date", "CoBorrower Name *", "Vehicle Model & Year",
              "Father Name *", "CoBorrower Phone *", "Vehicle Value",
              "Phone Number *", "Monthly Income *", "Loan Required",
               "Occupation ", "Adhaar Number *", "Pan Card Number *"
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

export default PropertyLoan