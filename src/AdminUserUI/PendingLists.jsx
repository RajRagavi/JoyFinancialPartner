import React, {useState} from 'react'

function PendingLists() {
  const [selectedLoan, setSelectedLoan] = useState("");

  return (
    <div className=''>
      
    <div className="p-5 bg-white min-h-screen flex flex-col ml-64">
    <h1 className='text-white w-full bg-blue-700 px-2 py-3 text-2xl mb-2 
    rounded-sm font-semibold'>Pending Lists</h1>
      <div className="flex flex-wrap space-x-6 mb-6">
      {["Print", "Due Pending", "Approval Pending"].map((loanType) => (
          <button
            key={loanType}
            onClick={() => setSelectedLoan(loanType)}
            className={`px-4 py-2 rounded-lg text-white font-semibold shadow-md transition ${
              selectedLoan === loanType
                ? "bg-blue-700"
                : "bg-gray-500 hover:bg-blue-900"
            }`}
          >
            {loanType}
          </button>
        ))}
      </div>
    </div>
    </div>
  )
}

export default PendingLists