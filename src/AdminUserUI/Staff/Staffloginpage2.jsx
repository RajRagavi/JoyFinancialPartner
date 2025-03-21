import React, { useEffect, useState } from "react";
import { FaUserAlt, FaBuilding, FaMoneyBillWave, FaPhoneAlt, FaCar } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";

const Staffloginpage2 = ({ loanData }) => {
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (loanData?.id) {
        try {
          const docRef = doc(db, loanData.type === "Vehicle Loan" ? "vehicle_loans" : "gold_loans", loanData.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCustomerDetails(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching customer details:", error);
        }
      }
    };
    fetchCustomerDetails();
  }, [loanData]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ✅ Customer Details Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-400 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaUserAlt className="mr-2" /> Customer Search
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {/* Left Section */}
          <div>
            <p className="font-semibold text-lg">A/C No: {customerDetails?.LoanNo || "N/A"}</p>
            <p className="text-gray-200">s/o {customerDetails?.FatherName || "N/A"}</p>
            <p className="font-semibold text-lg mt-6">Co Obligant:</p>
            <p className="text-gray-200">{customerDetails?.CoObligant || "N/A"}</p>
          </div>

          {/* Middle Section */}
          <div>
            <p className="font-semibold text-lg flex items-center">
              <FaBuilding className="mr-2" /> Office Address: {customerDetails?.OfficeAddress || "N/A"}
            </p>
            <p className="font-semibold text-lg mt-6">Co Obligant 2:</p>
            <p className="text-gray-200">{customerDetails?.CoObligant2 || "N/A"}</p>
          </div>

          {/* Right Section */}
          <div>
            <p className="font-semibold text-lg">Loan Details</p>
            <p className="text-gray-200">{customerDetails?.LoanDate || "N/A"}, {customerDetails?.LoanAmount || "N/A"}, {customerDetails?.Dues || "N/A"}</p>
            <p className="font-semibold text-lg mt-4">Contact Details</p>
            <p className="text-gray-200">{customerDetails?.Phone || "N/A"}, {customerDetails?.HousePhone || "N/A"}, {customerDetails?.OfficePhone || "N/A"}</p>
            <p className="font-semibold text-lg mt-4 flex items-center">
              <FaCar className="mr-2" /> Vehicle Info
            </p>
            <p className="text-gray-200">{customerDetails?.VehicleModel || "N/A"}, {customerDetails?.RegNo || "N/A"}, {customerDetails?.ChasisNo || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* ✅ Loan Details Table */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2 flex items-center">
          <FaMoneyBillWave className="mr-2 text-green-600" /> Loan Details
        </h2>
        <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              {["Due", "Due Date", "Rcpt No", "Rcpt Date", "Due Amt", "Due Rcvd", "Due Bal", "Received"].map((item) => (
                <th key={item} className="p-3 text-left">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr className="border-b hover:bg-gray-100 text-gray-800">
              <td className="p-3">1</td>
              <td className="p-3">{customerDetails?.DueDate || "N/A"}</td>
              <td className="p-3">{customerDetails?.RcptNo || "N/A"}</td>
              <td className="p-3">{customerDetails?.RcptDate || "N/A"}</td>
              <td className="p-3">₹{customerDetails?.DueAmount || "N/A"}</td>
              <td className="p-3">₹{customerDetails?.DueReceived || "N/A"}</td>
              <td className="p-3">₹{customerDetails?.DueBalance || "N/A"}</td>
              <td className="p-3">{customerDetails?.ReceivedDate || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staffloginpage2;