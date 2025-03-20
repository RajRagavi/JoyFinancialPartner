import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../Firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Staffloginpage2 from "./Staffloginpage2";
import Staffloginpage3 from "./Staffloginpage3";
import Emicalculator from "./Emicalculator";

const StaffDashboard = () => {
  const [showTable, setShowTable] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loans, setLoans] = useState([]);
  const steps = [
    { id: 1, label: "Common Search" },
    { id: 2, label: "Customer Search" },
    { id: 3, label: "Pay Bill Now" },
  ];

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const fetchLoans = async (searchParams) => {
    try {
      let loanQuery = [];
      if (searchParams.loanId) {
        loanQuery.push(where("id", "==", searchParams.loanId));
      }
      if (searchParams.phone) {
        loanQuery.push(where("phone", "==", searchParams.phone));
      }
      if (searchParams.name) {
        loanQuery.push(where("customerName", "==", searchParams.name));
      }

      const vehicleLoanRef = query(collection(db, "vehicle_loans"), ...loanQuery);
      const goldenLoanRef = query(collection(db, "golden_loan"), ...loanQuery);
      
      const vehicleLoansSnap = await getDocs(vehicleLoanRef);
      const goldenLoansSnap = await getDocs(goldenLoanRef);

      const allLoans = [
        ...vehicleLoansSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        ...goldenLoansSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
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

  const finishProcess = () => {
    alert("Process Completed Successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col ml-64">
      <h1 className="text-2xl font-semibold px-4">{steps[currentStep - 1].label}</h1>

      {/* Step 1: Common Search */}
      {currentStep === 1 && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6"
        >
          <input {...register("loanId")} placeholder="Loan ID" className="border p-2 rounded" />
          <input {...register("phone")} placeholder="Phone Number" className="border p-2 rounded" />
          <input {...register("name")} placeholder="Customer Name" className="border p-2 rounded" />
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
                <th className="border p-2">Loan ID</th>
                <th className="border p-2">Customer Name</th>
                <th className="border p-2">Loan Amount</th>
                <th className="border p-2">Pending</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id} className="text-center">
                  <td className="border p-2">{loan.id}</td>
                  <td className="border p-2">{loan.customerName}</td>
                  <td className="border p-2">{loan.loanAmount}</td>
                  <td className="border p-2">{loan.pendingAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EMI Calculator */}
      <Emicalculator />
      
      {/* Steps Navigation */}
            {currentStep === 2 && <Staffloginpage2 />}
            {currentStep === 3 && <Staffloginpage3 />}
      
            <div className="flex justify-end mt-6 space-x-3">
              <button onClick={prevStep} className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={currentStep === 1}>Previous</button>
              <button onClick={nextStep} className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${currentStep === steps.length ? "opacity-50 cursor-not-allowed" : ""}`} disabled={currentStep === steps.length}>Next</button>
              {currentStep === steps.length && <button onClick={finishProcess} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">Save & Print</button>}
            </div>
          </div>
  );
};

export default StaffDashboard;
