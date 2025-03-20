import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const ViewLoans = () => {
  const [vehicleLoans, setVehicleLoans] = useState([]);
  const [goldLoans, setGoldLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("vehicle");


  useEffect(() => {
    const fetchLoans = async () => {
      const vehicleSnapshot = await getDocs(collection(db, "vehicle_loans"));
      const goldSnapshot = await getDocs(collection(db, "gold_loans"));

      setVehicleLoans(vehicleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setGoldLoans(goldSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      setLoading(false);
    };

    fetchLoans();
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-bold">Loading...</div>;
  }

  return (
    <div className=" min-h-screen">
     
      <div className=" p-6 ml-64 ">
        <h2 className="text-xl font-semibold">View Loans</h2>
        <div>
          <label className="font-semibold mr-2">Filter:</label>
          <select className="p-2 border rounded" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="vehicle">Vehicle Loans</option>
            <option value="gold">Gold Loans</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto ml-64">
       
        <div className="container mt-4">
     {/* Vehicle Loans Table */}
     {filter === "vehicle" && (
        <div className="overflow-x-auto">
          <h2 className="text-lg font-semibold">Vehicle Loans</h2>
          <table className="min-w-full border-collapse border border-blue-300">
            <thead>
              <tr className="bg-blue-200">
                <th className="border p-2">Loan ID</th>
                <th className="border p-2">Customer Name</th>
                <th className="border p-2">Mobile Number</th>
                <th className="border p-2">Vehicle Type</th>
                <th className="border p-2">Loan Amount</th>
              </tr>
            </thead>
            <tbody>
              {vehicleLoans.map((loan) => (
                <tr key={loan.id} className="bg-blue-100">
                  <td className="border p-2">{loan.LoanNo || "N/A"}</td>
                  <td className="border p-2">{loan["Customer Name"] || "N/A"}</td>
                  <td className="border p-2">{loan["Mobile Number"] || "N/A"}</td>
                  <td className="border p-2">{loan["Vehicle Type"] || "N/A"}</td>
                  <td className="border p-2">{loan["Loan Amount"] || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Gold Loans Table */}
      {filter === "gold" && (
        <div className="overflow-x-auto">
          <h2 className="text-lg font-semibold">Gold Loans</h2>
          <table className="min-w-full border-collapse border border-blue-300">
            <thead>
              <tr className="bg-blue-200">
                <th className="border p-2">Loan ID</th>
                <th className="border p-2">Borrower Name</th>
                <th className="border p-2">Phone Number</th>
                <th className="border p-2">Gold Weight</th>
                <th className="border p-2">Loan Amount</th>
              </tr>
            </thead>
            <tbody>
              {goldLoans.map((loan) => (
                <tr key={loan.id} className="bg-blue-100">
                  <td className="border p-2">{loan.LoanNo || "N/A"}</td>
                  <td className="border p-2">{loan["borrower Name"] || "N/A"}</td>
                  <td className="border p-2">{loan["phoneNumber"] || "N/A"}</td>
                  <td className="border p-2">{loan["goldWeightAfterWastage"] || "N/A"}</td>
                  <td className="border p-2">{loan["requiredLoanAmount"] || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default ViewLoans;
