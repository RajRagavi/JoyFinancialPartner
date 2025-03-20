import React from 'react'

const Staffloginpage2 = () => {
  return (
    <div>
        {/* ✅ Customer Details Section */}
      <div className="border border-gray-300 p-6 bg-[#69f7db] rounded-md grid grid-cols-3 gap-4 overflow-hidden">
        <div>
          <p className="font-semibold text-red-900">A/C No :</p>
          <p className="font-semibold text-blue-600">s/o</p>

          <p className="font-semibold text-red-900 mt-20">Co Obligant :</p>
          <p className="font-semibold text-blue-600">s/o</p>
        </div>

        <div>
          <p className="font-semibold text-red-900">Office Address</p>
          <p className="font-semibold text-red-900 mt-25">Co Obligant 2 :</p>
          <p className="font-semibold text-blue-600">s/o</p>
        </div>

        <div className='text-black'>
          <p className="font-semibold">Loan Date</p>
          <p className="font-semibold">Loan Amount</p>

          <p className="font-semibold mt-4">Tot Dues</p>
          <p className="font-semibold">Due_Amt(Prin+Int)</p>
          <p className="font-semibold">ROI %</p>

          <p className="font-semibold mt-4">Phone</p>
          <p className="font-semibold">House Phone</p>
          <p className="font-semibold">Office Phone</p>

          <p className="font-semibold mt-4">Model</p>
          <p className="font-semibold">Reg No</p>
          <p className="font-semibold">Chasis No</p>
          <p className="font-semibold">Engine No</p>
          <p className="font-semibold">RC</p>
          <p className="font-semibold">Insurance Company</p>
        </div>
      </div>

      {/* ✅ Loan Details Table */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Loan Details</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 p-2">Due</th>
              <th className="border border-gray-300 p-2">Due Date</th>
              <th className="border border-gray-300 p-2">Rcpt No</th>
              <th className="border border-gray-300 p-2">Rcpt Date</th>
              <th className="border border-gray-300 p-2">Due Amt</th>
              <th className="border border-gray-300 p-2">Due Rcvd</th>
              <th className="border border-gray-300 p-2">Due Bal</th>
              <th className="border border-gray-300 p-2">Due Received</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2">10/02/2025</td>
              <td className="border border-gray-300 p-2">12345</td>
              <td className="border border-gray-300 p-2">10/02/2025</td>
              <td className="border border-gray-300 p-2">20000</td>
              <td className="border border-gray-300 p-2">10/02/2025</td>
              <td className="border border-gray-300 p-2">20000</td>
              <td className="border border-gray-300 p-2">10/02/2025</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Staffloginpage2