import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../Firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import Staffloginpage2 from "./Staffloginpage2";
import Staffloginpage3 from "./Staffloginpage3";
import Emicalculator from "./Emicalculator";
import { useReactToPrint } from "react-to-print";

const StaffDashboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const billRef = useRef();

  const steps = [
    { id: 1, label: "Common Search" },
    { id: 2, label: "Customer Search" },
    { id: 3, label: "Pay Bill Now" },
  ];

  const { handleSubmit, register } = useForm();

  // ✅ Fetch user role from Firestore
  const fetchUserRole = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User is not authenticated.");
        return null;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      return userSnap.exists() ? userSnap.data().role : null;
    } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
  };

  // ✅ Fetch loans based on search input
  const fetchLoans = async (searchParams) => {
    try {
      console.log("🔍 Searching Loans with params:", searchParams);
  
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        alert("You must be logged in to search loans.");
        return;
      }
  
      const vehicleLoanRef = collection(db, "vehicle_loans");
      const goldLoanRef = collection(db, "gold_loans");
  
      const vehicleLoansSnap = await getDocs(vehicleLoanRef);
      const goldLoansSnap = await getDocs(goldLoanRef);
  
      const allVehicleLoans = vehicleLoansSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const allGoldLoans = goldLoansSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
      console.log("📜 All Vehicle Loans:", allVehicleLoans);
      console.log("📜 All Gold Loans:", allGoldLoans);
  
      const filteredLoans = [
        ...allVehicleLoans.filter((loan) => loan.LoanNo == searchParams.LoanNo),
        ...allGoldLoans.filter((loan) => loan.LoanNo == searchParams.LoanNo),
      ];
  
      console.log("✅ Filtered Loans:", filteredLoans);
  
      setLoans(filteredLoans);
      setSelectedLoan(filteredLoans.length > 0 ? filteredLoans[0] : null);
    } catch (error) {
      console.error("❌ Error fetching loans:", error);
    }
  };
  
  const onSubmit = (data) => {
    console.log("📥 Search Input:", data);

    if (!data.LoanNo) {
      alert("⚠️ Please enter Loan ID");
      return;
    }

    fetchLoans(data);
  };

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
  });

  return (
    <div className="min-h-screen flex flex-col lg:ml-64 sm:mr-15 mt-10">
      <h1 className="text-2xl font-semibold px-4">{steps[currentStep - 1].label}</h1>

      {/* Step 1: Common Search */}
      {currentStep === 1 && (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <input {...register("LoanNo")} placeholder="Loan ID" className="border p-2 rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
        </form>
      )}

      {/* Search Results */}
      {currentStep === 1 && (
        <>
          <p className="mt-4">Loans Found: {loans.length}</p> {/* Debug log */}
          {loans.length > 0 && <Staffloginpage2 loanData={selectedLoan} />}
        </>
      )}

      {/* EMI Calculator */}
      {currentStep === 1 && <Emicalculator />}

      {/* Step 2: Customer Search */}
      {currentStep === 2 &&  <Staffloginpage2 loanData={selectedLoan} />}

      {/* Step 3: Pay Bill Now */}
      {currentStep === 3 &&  <Staffloginpage3 loanData={selectedLoan} />}

      {/* Navigation Buttons */}
      <div className="flex justify-end mt-6 space-x-3">
        <button
          onClick={prevStep}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={currentStep === 1}
        >
          Previous
        </button>

        {currentStep < steps.length && (
          <button onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Next
          </button>
        )}

        {currentStep === steps.length && (
          <button onClick={handlePrint} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
            Save & Print
          </button>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
