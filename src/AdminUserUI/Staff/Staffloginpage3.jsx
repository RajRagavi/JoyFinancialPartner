import React, { useState, useEffect, useRef } from "react";
// import { useReactToPrint } from "react-to-print";
import { db } from "../../Firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Dues from "./Dues";

const Staffloginpage3 = ({ loanId }) => {
  const [date, setDate] = useState("");
  const [loanDetails, setLoanDetails] = useState(null);
  const billRef = useRef(null); // ✅ Properly Defined

  useEffect(() => {
    const fetchLoanDetails = async () => {
      if (!loanId) return;

      try {
        const vehicleLoanRef = collection(db, "vehicle_loans");
        const goldLoanRef = collection(db, "gold_loans");
        
        const qVehicle = query(vehicleLoanRef, where("LoanNo", "==", loanId));
        const qGold = query(goldLoanRef, where("LoanNo", "==", loanId));
        
        const vehicleSnap = await getDocs(qVehicle);
        const goldSnap = await getDocs(qGold);
        
        let loanData = null;
        
        if (!vehicleSnap.empty) {
          loanData = { ...vehicleSnap.docs[0].data(), type: "Vehicle Loan" };
        } else if (!goldSnap.empty) {
          loanData = { ...goldSnap.docs[0].data(), type: "Gold Loan" };
        }
        
        setLoanDetails(loanData);
      } catch (error) {
        console.error("Error fetching loan details:", error);
      }
    };

    fetchLoanDetails();
  }, [loanId]);

  // const handlePrint = useReactToPrint({
  //   content: () => billRef.current || null, // ✅ Ensure Content Exists
  // });

  return (
    <div className="p-2">
      <h1 className="text-gray-700 bg-gray-100 font-sans py-2 p-2">PAY DUE</h1>
      <div className="grid grid-cols-3 gap-4 p-6">
        {/* HPL NO */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">HPL NO</label>
          <input type="text" value={loanDetails?.LoanNo || ""} readOnly className="border p-2 rounded-md bg-gray-200" />
        </div>

        {/* REG NO */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">REG NO</label>
          <input type="text" value={loanDetails?.["Vehicle Reg No"] || ""} readOnly className="border p-2 rounded-md bg-gray-200" />
        </div>

        {/* RECP NO */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">RECP NO</label>
          <input type="text" className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        {/* Date Input */}
        <div className="flex flex-col mb-4">
          <label className="font-semibold text-gray-700">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        {/* PartyName */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">PartyName</label>
          <input type="text" value={loanDetails?.["Customer Name"] || ""} readOnly className="border p-2 rounded-md bg-gray-200" />
        </div>

        {/* Area */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Area</label>
          <input type="text" value={loanDetails?.["Customer Address"] || ""} readOnly className="border p-2 rounded-md bg-gray-200" />
        </div>
      </div>
      {/* Dues */}
      <Dues />

      {/* ✅ Bill Section with Proper Ref */}
      <div ref={billRef} className="p-4 border rounded-md bg-white shadow-md w-96 mx-auto mt-6">
        <h2 className="text-lg font-bold text-center mb-2">Payment Receipt</h2>
        <p><strong>Loan No:</strong> {loanDetails?.LoanNo}</p>
        <p><strong>Customer:</strong> {loanDetails?.["Customer Name"]}</p>
        <p><strong>Amount Paid:</strong> ₹20,000</p>
        <p><strong>Date:</strong> {date}</p>
      </div>

      {/* ✅ Print Button (Now Works Correctly) */}
      {/* <div className="flex justify-center mt-4">
        <button onClick={handlePrint} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
          Save & Print
        </button>
      </div> */}
    </div>
  );
};

export default Staffloginpage3;
