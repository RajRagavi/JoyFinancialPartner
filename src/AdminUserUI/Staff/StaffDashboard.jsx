import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../Firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Staffloginpage2 from "./Staffloginpage2";
import Staffloginpage3 from "./Staffloginpage3";
import Emicalculator from "./Emicalculator";

import { useReactToPrint } from "react-to-print";

const StaffDashboard = () => {
  const [showTable, setShowTable] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null); // 🔥 Selected Loan Data

  const steps = [
    { id: 1, label: "Common Search" },
    { id: 2, label: "Customer Search" },
    { id: 3, label: "Pay Bill Now" },
  ];

  const { handleSubmit, register } = useForm();

  const fetchLoans = async (searchParams) => {
    try {
      let queries = [];
      if (searchParams.loanId) {
        queries.push(where("LoanNo", "==", searchParams.loanId));
      }
      if (searchParams.phone) {
        queries.push(where("Mobile Number", "==", searchParams.phone));
      }
      if (searchParams.name) {
        queries.push(where("Customer Name", "==", searchParams.name));
      }

      // 🔥 Vehicle Loans
      const vehicleLoanRef = collection(db, "vehicle_loans");
      const vehicleLoanQuery = queries.length > 0 ? query(vehicleLoanRef, ...queries) : vehicleLoanRef;
      const vehicleLoansSnap = await getDocs(vehicleLoanQuery);

      // 🔥 Gold Loans
      const goldLoanRef = collection(db, "gold_loans");
      const goldLoanQuery = queries.length > 0 ? query(goldLoanRef, ...queries) : goldLoanRef;
      const goldLoansSnap = await getDocs(goldLoanQuery);

      // ✅ Combine Data
      const allLoans = [
        ...vehicleLoansSnap.docs.map((doc) => ({ id: doc.id, type: "Vehicle Loan", ...doc.data() })),
        ...goldLoansSnap.docs.map((doc) => ({ id: doc.id, type: "Gold Loan", ...doc.data() })),
      ];

      setLoans(allLoans);
      setShowTable(allLoans.length > 0);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  const onSubmit = (data) => {
    if (!data.loanId && !data.phone && !data.name) {
      alert("Please enter at least one search field");
      return;
    }
    fetchLoans(data);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
  });

  return (
    <div className="min-h-screen flex flex-col lg:ml-64 sm:mr-15 mt-10 ">
      <h1 className="text-2xl font-semibold px-4">{steps[currentStep - 1].label}</h1>

      {/* Step 1: Common Search */}
      {currentStep === 1 && (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <input {...register("LoanNo")} placeholder="Loan ID" className="border p-2 rounded" />
          {/* <input {...register("phone")} placeholder="Phone Number" className="border p-2 rounded" />
          <input {...register("name")} placeholder="Customer Name" className="border p-2 rounded" /> */}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
        </form>
      )}

      {/* Search Results Table */}
      {currentStep === 1 && showTable && (
        <div className="mt-8 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Search Results</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Loan Type</th>
                <th className="border p-2">Loan ID</th>
                <th className="border p-2">Customer Name</th>
                <th className="border p-2">Mobile Number</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id} className="text-center">
                  <td className="border p-2">{loan.type || "Vehicle Loan"}</td>
                  <td className="border p-2">{loan.LoanNo}</td>
                  <td className="border p-2">{loan["Customer Name"]}</td>
                  <td className="border p-2">{loan["Mobile Number"]}</td>
                  <td className="border p-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => { setSelectedLoan(loan); nextStep(); }}>
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
     {/* EMI Calculator */}
     {currentStep === 1 && <Emicalculator />}
      {/* Step 2: Customer Search */}
      {currentStep === 2 && <Staffloginpage2 loanData={selectedLoan} />}

      {/* Step 3: Pay Bill Now */}
      {currentStep === 3 && <Staffloginpage3 loanData={selectedLoan} />}

      {/* Navigation Buttons */}
      <div className="flex justify-end mt-6 space-x-3 xs:mr-50">
        <button onClick={prevStep} className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={currentStep === 1}>Previous</button>
        {currentStep < steps.length && (
          <button onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Next</button>
        )}
        {currentStep === steps.length && (
          <button onClick={handlePrint} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">Save & Print</button>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
