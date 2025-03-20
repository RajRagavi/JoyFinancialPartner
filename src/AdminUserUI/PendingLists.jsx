import React, {useState, useEffect} from 'react'

function PendingLists() {
  const [selectedLoan, setSelectedLoan] = useState("");
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("") 
      .then((response) => response.json())
      .then((data) => {
        setLoans(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Define Table Headers
  const headers = [
    "L.No", "Customer Name", "Location", "Loan Date", "Phone Number", 
    "Due Amount", "Due Date", "Total Tenure", "Current Tenure",
    "Payed Till now", "Pending Tenure", "Pending Due Amt", 
    "Last Due Date", "Customer Response"
  ];

  return (
    <div className="p-5 bg-white min-h-screen flex flex-col ml-64">
      <h1 className="text-white w-full bg-blue-700 px-2 py-3 text-2xl mb-2 rounded-sm font-semibold">
        Pending Lists
      </h1>
      
      {/* Buttons */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="border p-2">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loans.length > 0 ? (
                loans.map((loan, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">{loan.id}</td>
                    <td className="border p-2">{loan.name}</td>
                    <td className="border p-2">{loan.location}</td>
                    <td className="border p-2">{loan.loan_date}</td>
                    <td className="border p-2">{loan.phone}</td>
                    <td className="border p-2">{loan.due_amount.toFixed(2)}</td>
                    <td className="border p-2">{loan.due_date}</td>
                    <td className="border p-2">{loan.total_tenure}</td>
                    <td className="border p-2">{loan.current_tenure}</td>
                    
                  </tr>
                ))
              ) : (
                // Empty Rows for Better UI
                [...Array(10)].map((_, rowIndex) => (
                  <tr key={rowIndex} className="border">
                    {[...Array(headers.length)].map((_, colIndex) => (
                      <td key={colIndex} className="border p-4 bg-white"></td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default PendingLists