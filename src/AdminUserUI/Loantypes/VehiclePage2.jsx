import React, { useState } from 'react'


const VehiclePage2 = () => {

    const [formData, setFormData] = useState({
        adhaarFile: null,
        licenceFile: null,
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
  return (
    <div className='bg-gray-200 min-h-screen flex flex-col'>
        <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-5xl mt-4">
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {/* Vehicle Value*/}
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

          {/* Due Date*/}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Due Date
            </label>
            <input
              type="text"
              name="Due Date"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Pay mode*/}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Pay mode
            </label>
            <input
              type="text"
              name="Pay mode"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Down Payment */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Down Payment
            </label>
            <input
              type="text"
              name="Down Payment"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Due Month */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Due Month
            </label>
            <input
              type="text"
              name="Due Month"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Net_Payable */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Net_Payable
            </label>
            <input
              type="text"
              name="Net_Payable"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Loan Amount */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Loan Amount
            </label>
            <input
              type="text"
              name="Loan Amount"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Penalty / Day*/}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Penalty / Day
            </label>
            <input
              type="text"
              name="Penalty / Day"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Pay mode1*/}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Pay mode1
            </label>
            <input
              type="text"
              name="Pay mode1"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Amount In Words */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Amount In Words
            </label>
            <input
              type="text"
              name="Amount In Words"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Principle part  */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Principle part 
            </label>
            <input
              type="text"
              name="Principle part "
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Documentation Charge */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Documentation Charge
            </label>
            <input
              type="text"
              name="Documentation Charge"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Interest in % */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Interest in %
            </label>
            <input
              type="text"
              name="Interest in %"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Interest Part */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Interest Part
            </label>
            <input
              type="text"
              name="Interest Part"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Remarks*/}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Remarks
            </label>
            <input
              type="text"
              name="Remarks"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>


          {/* Loan Date */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Loan Date
            </label>
            <input
              type="text"
              name="Loan Date"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Total Due Amount */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
            Total Due Amount
            </label>
            <input
              type="text"
              name="Total Due Amount"
              value={formData.engineNumber}
              onChange={handleInputChange}
              className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          
        </form>
        </div>
    </div>
  )
}

export default VehiclePage2