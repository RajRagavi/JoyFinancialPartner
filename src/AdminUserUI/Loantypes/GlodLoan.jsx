import React, { useState } from "react";
import { db } from "../../Firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const GoldLoan = () => {
  const [formData, setFormData] = useState({
    borrowerName: "",
    personalNumber: "",
    fatherName: "",
    date: "",
    alternateNumber: "",
    coBorrowerName: "",
    goldRateToday: "",
    coBorrowerPhone: "",
    requiredLoanAmount: "",
    monthlyIncome: "",
    rateOfInterest: "",
    totalGoldWeight: "",
    goldWeightAfterWastage: "",
    tenure: "",
    houseOwnRent: "",
    doorFlatNumber: "",
    streetLane: "",
    areaSocietyName: "",
    cityVillage: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
    kycDocuments: [],
    goldVerified: false,
    vehicleDocumentsVerified: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const formFields = [
    { name: "borrowerName", label: "Borrower Name", type: "text", required: true },
    { name: "personalNumber", label: "Personal Number", type: "number", required: true },
    { name: "fatherName", label: "Father's Name", type: "text", required: false },
    { name: "date", label: "Date", type: "date", required: true },
    { name: "alternateNumber", label: "Alternate Number", type: "number", required: true },
    { name: "coBorrowerName", label: "Co-Borrower Name", type: "text", required: false },
    { name: "goldRateToday", label: "Gold Rate Today", type: "number" },
    { name: "coBorrowerPhone", label: "Co-Borrower Phone", type: "number", required: false },
    { name: "requiredLoanAmount", label: "Required Loan Amount", type: "number", required: true },
    { name: "monthlyIncome", label: "Monthly Income", type: "number", required: true },
    { name: "rateOfInterest", label: "Rate of Interest", type: "number", required: true },
    { name: "totalGoldWeight", label: "Total Gold Weight", type: "number", required: true },
    { name: "goldWeightAfterWastage", label: "Gold Weight After Wastage", type: "number", required: true },
    { name: "tenure", label: "Tenure", type: "number", required: false },
  ];

  const addressFields = [
    { name: "houseOwnRent", label: "House Own/Rent", type: "dropdown", required: true },
    { name: "doorFlatNumber", label: "Door / Flat Number", type: "text", required: true },
    { name: "streetLane", label: "Street / Lane", type: "text", required: true },
    { name: "areaSocietyName", label: "Area / Society Name", type: "text", required: true },
    { name: "cityVillage", label: "City / Village", type: "text", required: true },
    { name: "district", label: "District", type: "text", required: true },
    { name: "state", label: "State", type: "text", required: true },
    { name: "country", label: "Country", type: "text", required: true },
    { name: "pincode", label: "Pincode", type: "text", required: true },
  ];

  const validateForm = () => {
    let newErrors = {};
    [...formFields, ...addressFields].forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    if (name === "kycDocuments") {
      setFormData((prev) => ({
        ...prev,
        kycDocuments: checked ? [...prev.kycDocuments, value] : prev.kycDocuments.filter((doc) => doc !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return alert("Please fill in all required fields.");

    const user = auth.currentUser;
    if (!user) return alert("You must be logged in to submit the loan application.");

    try {
      setLoading(true);
      await addDoc(collection(db, "gold_loans"), { ...formData, createdBy: user.uid, timestamp: new Date() });
      alert("Loan application submitted successfully!");
      setFormData({}); // Reset form
    } catch (error) {
      console.error("Error saving loan application:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center p-6">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-5xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Gold Loan Form</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...formFields, ...addressFields].map((field) => (
            <div key={field.name}>
              <label className="block font-medium">{field.label}</label>

              {field.type === "dropdown" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  className="border p-2 w-full rounded-md"
                >
                  <option value="" disabled>Select</option>
                  <option value="Own">Own</option>
                  <option value="Rent">Rent</option>
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.label}`}
                  className="border p-2 w-full rounded-md"
                />
              )}

              {errors[field.name] && <span className="text-red-500 text-sm">{errors[field.name]}</span>}
            </div>
          ))}

          <h2 className="col-span-full font-medium mt-6">KYC Documents</h2>
          {["Received Gold", "Aadhar Xerox","gold Verified","vehicle Documents Verified"].map((doc) => (
            <label key={doc} className="flex items-center space-x-2 mt-2">
              <input type="checkbox" className="w-4 h-4" name="kycDocuments" value={doc} onChange={handleCheckboxChange} />
              <span>{doc}</span>
            </label>
          ))}

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-6">{loading ? "Submitting..." : "Apply Now"}</button>
        </form>
      </div>
    </div>
  );
};

export default GoldLoan;
