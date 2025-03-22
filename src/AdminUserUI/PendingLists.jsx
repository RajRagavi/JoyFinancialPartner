import React, { useState } from "react";

function PendingLists() {
  const [selectedLoan, setSelectedLoan] = useState("");

  return (
    <div className="p-5 bg-white min-h-screen flex flex-col lg:ml-64 max-w-full mt-30">
      <h1 className="text-white w-full bg-blue-700 px-2 py-3 text-xl sm:text-2xl mb-2 rounded-sm font-semibold text-center">
        Pending Lists
      </h1>

      {/* Buttons Section */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {["Print", "Due Pending", "Approval Pending"].map((loanType) => (
          <button
            key={loanType}
            onClick={() => setSelectedLoan(loanType)}
            className={`px-4 py-2 w-full sm:w-auto rounded-lg text-white font-semibold shadow-md transition ${
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
  );
}

export default PendingLists;
