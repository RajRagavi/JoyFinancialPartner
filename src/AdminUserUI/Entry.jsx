import React, { useState, useEffect } from "react";
import { db } from "../Firebase/firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore"; // ✅ Import Timestamp

const formFields = [
  { label: "Date", type: "date" },
  { label: "Paid Amount", type: "number" },
];

const Entry = () => {
  const [loanNo, setLoanNo] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Loan Details when Loan No changes
  useEffect(() => {
    if (loanNo) {
      fetchLoanDetails(loanNo);
    }
  }, [loanNo]);

  // Fetch Loan Details from Firebase
  const fetchLoanDetails = async (loanNo) => {
    try {
      console.log("🔍 Searching for Loan No:", loanNo);
      const q = query(collection(db, "vehicle_loans"), where("LoanNo", "==", loanNo)); // FIXED FIELD NAME
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const loanData = querySnapshot.docs[0].data();
        console.log("✅ Loan Found:", loanData);
  
        setCustomerId(loanData["Customer ID"] || "Not Found");
        setCustomerName(loanData["Customer Name"] || "Not Found");
        setDueDate(loanData["dueDate"] || "Not Found"); // ✅ FIXED FIELD NAME
      } else {
        console.log("❌ No loan found for Loan No:", loanNo);
        setCustomerId("");
        setCustomerName("");
        setDueDate("");
      }
    } catch (error) {
      console.error("⚠️ Error fetching loan details:", error);
    }
  };
  

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate Form
  const validateForm = () => {
    let tempErrors = {};
    if (!loanNo.trim()) tempErrors.loanNo = "Loan No is required.";
    if (!customerId.trim()) tempErrors.customerId = "Customer ID is required.";
    if (!customerName.trim() || customerName === "Not Found") tempErrors.customerName = "Valid Customer required.";
    if (!dueDate.trim()) tempErrors.dueDate = "Due Date is required.";

    formFields.forEach(({ label }) => {
      if (!formData[label]) tempErrors[label] = `${label} is required.`;
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "loan_payments"), {
        loanNo,
        customerId,
        customerName,
        dueDate: Timestamp.fromDate(new Date(dueDate)), // ✅ Convert Date to Firestore Timestamp
        ...formData,
        timestamp: Timestamp.now(),
      });

      alert("✅ Loan entry recorded successfully!");
      setFormData({});
      setLoanNo("");
      setCustomerId("");
      setCustomerName("");
      setDueDate("");
      setErrors({});
    } catch (error) {
      console.error("❌ Error storing loan entry:", error);
      alert("Failed to submit loan entry.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="p-5 bg-gray-200 min-h-screen flex flex-col lg:ml-64">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Loan Payment Entry</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Loan No */}
          <div className="flex flex-col">
            <label className="block font-medium">Loan No *</label>
            <input
              type="text"
              value={loanNo}
              onChange={(e) => setLoanNo(e.target.value)}
              className="border p-2 w-full rounded-md"
            />
            {errors.loanNo && <p className="text-red-500 text-sm">{errors.loanNo}</p>}
          </div>

          {/* Customer ID */}
          <div className="flex flex-col">
            <label className="block font-medium">Customer ID *</label>
            <input
              type="text"
              value={customerId}
              readOnly
              className="border p-2 w-full bg-gray-100 rounded-md"
            />
            {errors.customerId && <p className="text-red-500 text-sm">{errors.customerId}</p>}
          </div>

          {/* Customer Name */}
          <div className="flex flex-col">
            <label className="block font-medium">Customer Name</label>
            <input
              type="text"
              value={customerName}
              readOnly
              className="border p-2 w-full bg-gray-100 rounded-md"
            />
            {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
          </div>

          {/* Due Date */}
          <div className="flex flex-col">
            <label className="block font-medium">Due Date *</label>
            <input
              type="date"
              value={dueDate}
              readOnly
              className="border p-2 w-full bg-gray-100 rounded-md"
            />
            {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
          </div>

          {/* Other Fields */}
          {formFields.map((field) => (
            <div key={field.label} className="flex flex-col">
              <label className="block font-medium">{field.label} *</label>
              <input
                type={field.type}
                name={field.label}
                value={formData[field.label] || ""}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md"
              />
              {errors[field.label] && <p className="text-red-500 text-sm">{errors[field.label]}</p>}
            </div>
          ))}

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className={`px-4 py-2 w-full sm:w-auto text-white rounded-md ${isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Entry;
