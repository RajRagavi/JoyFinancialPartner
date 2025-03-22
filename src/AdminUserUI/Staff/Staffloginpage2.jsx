import React, { useEffect, useState } from "react";
import { FaUserAlt, FaBuilding, FaMoneyBillWave, FaPhoneAlt, FaCar } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";

const Staffloginpage2 = ({ loanData }) => {
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (!loanData?.id) return;

      try {
        const docRef = doc(db, loanData.type === "Vehicle Loan" ? "vehicle_loans" : "gold_loans", loanData.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCustomerDetails(docSnap.data());
        } else {
          console.log("No such document found!");
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    fetchCustomerDetails();
  }, [loanData]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ✅ Customer Details Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-400 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaUserAlt className="mr-2" /> Customer Details
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {/* Left Section */}
          <div>
            <p className="font-semibold text-lg">Loan No: {customerDetails?.LoanNo || "N/A"}</p>
            <p className="text-gray-200">Borrower: {customerDetails?.CustomerName || "N/A"}</p>
            <p className="text-gray-200">Father: {customerDetails?.FatherName || "N/A"}</p>
            <p className="text-gray-200">Co-Borrower: {customerDetails?.CoBorrowerName || "N/A"}</p>
            <p className="text-gray-200">Mobile: {customerDetails?.MobileNumber || "N/A"}</p>
            <p className="text-gray-200">Alternate Mobile: {customerDetails?.AlternateNumber || "N/A"}</p>
          </div>

          {/* Middle Section */}
          <div>
            <p className="font-semibold text-lg flex items-center">
              <FaBuilding className="mr-2" /> Address
            </p>
            <p className="text-gray-200">{customerDetails?.DoorFlatNumber || "N/A"}, {customerDetails?.StreetLane || "N/A"}</p>
            <p className="text-gray-200">{customerDetails?.AreaSocietyName || "N/A"}, {customerDetails?.CityVillage || "N/A"}, {customerDetails?.District || "N/A"}</p>
            <p className="text-gray-200">{customerDetails?.State || "N/A"} - {customerDetails?.Pincode || "N/A"}</p>
            <p className="text-gray-200">Country: {customerDetails?.Country || "N/A"}</p>
          </div>

          {/* Right Section */}
          <div>
            <p className="font-semibold text-lg">Loan Details</p>
            <p className="text-gray-200">Date: {customerDetails?.Date || "N/A"}</p>
            <p className="text-gray-200">Amount: ₹{customerDetails?.Amount || "N/A"}</p>
            <p className="text-gray-200">Tenure: {customerDetails?.Tenure || "N/A"} months</p>
            <p className="text-gray-200">Interest Rate: {customerDetails?.["Interest (%)"] || "N/A"}%</p>
            <p className="text-gray-200">Other EMI: ₹{customerDetails?.OtherEMI || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* ✅ Vehicle Details Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <FaCar className="mr-2" /> Vehicle Details
        </h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="font-semibold text-lg">Make: {customerDetails?.["Vehicle Make"] || "N/A"}</p>
            <p className="font-semibold text-lg">Model & Year: {customerDetails?.["Vehicle Model & Year"] || "N/A"}</p>
            <p className="font-semibold text-lg">Type: {customerDetails?.["Vehicle Type"] || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Reg No: {customerDetails?.["Vehicle Number"] || "N/A"}</p>
            <p className="font-semibold text-lg">Chassis No: {customerDetails?.["Chassis Number"] || "N/A"}</p>
            <p className="font-semibold text-lg">Engine No: {customerDetails?.["Engine Number"] || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Value: ₹{customerDetails?.["Vehicle Value"] || "N/A"}</p>
            <p className="font-semibold text-lg">Loan Required: ₹{customerDetails?.LoanRequired || "N/A"}</p>
            <p className="font-semibold text-lg">Approved: {customerDetails?.approved ? "✅ Yes" : "❌ No"}</p>
          </div>
        </div>
      </div>

      {/* ✅ Loan Details Table */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2 flex items-center">
          <FaMoneyBillWave className="mr-2 text-green-600" /> Loan History
        </h2>
        <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              {["Loan No", "Date", "Amount", "Tenure", "Interest Rate", "EMI", "Status"].map((item) => (
                <th key={item} className="p-3 text-left">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr className="border-b hover:bg-gray-100 text-gray-800">
              <td className="p-3">{customerDetails?.LoanNo || "N/A"}</td>
              <td className="p-3">{customerDetails?.Date || "N/A"}</td>
              <td className="p-3">₹{customerDetails?.Amount || "N/A"}</td>
              <td className="p-3">{customerDetails?.Tenure || "N/A"} months</td>
              <td className="p-3">{customerDetails?.["Interest (%)"] || "N/A"}%</td>
              <td className="p-3">₹{customerDetails?.OtherEMI || "N/A"}</td>
              <td className="p-3">{customerDetails?.approved ? "✅ Approved" : "❌ Pending"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staffloginpage2;
