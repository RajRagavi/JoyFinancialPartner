import React, { useState } from "react";
import VehicleLoan from "./VehicleLoan";
import GlodLoan from "./GlodLoan";

function Kyc() {
  const [selectedLoan, setSelectedLoan] = useState("Vehicle Loan");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (assumed to be on the left) */}
      
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-200 lg:ml-64 mt-10 ">
        {/* Button Container */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setSelectedLoan("Vehicle Loan")}
            className={`px-6 py-3 rounded-lg text-white font-semibold shadow-md transition ${
              selectedLoan === "Vehicle Loan"
                ? "bg-blue-700"
                : "bg-blue-900 hover:bg-blue-700"
            }`}
          >
            Vehicle Loan
          </button>
          <button
            onClick={() => setSelectedLoan("Gold Loan")}
            className={`px-6 py-3 rounded-lg text-white font-semibold shadow-md transition ${
              selectedLoan === "Gold Loan"
                ? "bg-blue-700"
                : "bg-blue-900 hover:bg-blue-700"
            }`}
          >
            Gold Loan
          </button>
        </div>

        {/* Dynamic Form Display */}
        {selectedLoan === "Vehicle Loan" && <VehicleLoan />}
        {selectedLoan === "Gold Loan" && <GlodLoan />}
      </div>
    </div>
  );
}

export default Kyc;
