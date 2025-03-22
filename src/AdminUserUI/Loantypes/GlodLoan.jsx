import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { db } from "../../Firebase/firebaseConfig"
import { getFirestore, collection, addDoc } from "firebase/firestore";
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
    phoneNumber: "",
    monthlyIncome: "",
    rateOfInterest: "",
    totalGoldWeight: "",
    goldWeightAfterWastage: "",
    tenure: "",
    city: "",
    kycDocuments: [],
    goldVerified: false,
    vehicleDocumentsVerified: false,
    houseOwnRent: "",  // Address fields added
    doorFlatNumber: "",
    streetLane: "",
    areaSocietyName: "",
    cityVillage: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
});

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formFields = [
    { label: "borrowerName", type: "text", required: true },
    { label: "personalNumber", type: "number", required: true },
    { label: "fatherName", type: "text", required: false },
    { label: "date", type: "date", required: true },
    { label: "alternateNumber", type: "number", required: true },
    { label: "coBorrowerName", type: "text", required: false },
    { label: "goldRateToday", type: "number" },
    { label: "coBorrowerPhone", type: "number", required: false },
    { label: "requiredLoanAmount", type: "number", required: true },
    { label: "phoneNumber", type: "number", required: true },
    { label: "monthlyIncome", type: "number", required: true },
    { label: "rateOfInterest", type: "number", required: true },
    { label: "totalGoldWeight", type: "number", required: true },
    { label: "goldWeightAfterWastage", type: "number", required: true },
    { label: "tenure", type: "number", required: false },
];


  const addressFields = [

    { name:"House",label: "House Own/Rent", type: "text", placeholder: "House Own/Rent", required: true  },
   
      { name: "doorNumber", label: "Door / Flat Number", type: "text", placeholder: "Enter Door / Flat Number", required: true },
      { name: "street", label: "Street / Lane", type: "text", placeholder: "Enter Street / Lane", required: true },
      { name: "area", label: "Area / Society Name", type: "text", placeholder: "Enter Area / Society Name", required: true },
      { name: "city", label: "City / Village", type: "text", placeholder: "Enter City / Village", required: true },
    
    { name: "District", label: "District", type: "text", placeholder: "Enter District", required: true  },
    { name:"State", label: "State", type: "text", placeholder: "Enter State", required: true  },
    { name:"Country", label: "Country", type: "text", placeholder: "Enter Country", required: true  },
    { name:"Pincode", label: "Pincode", type: "text", placeholder: "Enter Pincode", required: true  },
    { name:"Landmark", label: "Landmark", type: "text", placeholder: "Enter Nearby Landmark (Optional)", required: true  },
];
const validateForm = () => {
  let newErrors = {};
  
  formFields.forEach((field) => {
    if (field.required && !formData[field.label]) {
      newErrors[field.label] = `${field.label} is required`;
    }
  });

  addressFields.forEach((field) => {
    if (field.required && !formData[field.label]) {
      newErrors[field.label] = `${field.label} is required`;
    }
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name.replace(/\s+/g, '')]: value }));
};


  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === "kycDocuments") {
      setFormData((prev) => ({
        ...prev,
        kycDocuments: checked
          ? [...prev.kycDocuments, e.target.value]
          : prev.kycDocuments.filter((doc) => doc !== e.target.value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      console.error("Form validation failed");
      alert("Please fill in all required fields.");
      return;
    }
  
    const user = auth.currentUser;
    if (!user) {
      console.error("Error: User not logged in!");
      alert("You must be logged in to submit the loan application.");
      return;
    }
  
    try {
      await addDoc(collection(db, "gold_loans"), {
        borrowerName: formData.borrowerName,
        personalNumber: formData.personalNumber,
        fatherName: formData.fatherName,
        date: formData.date,
        alternateNumber: formData.alternateNumber,
        coBorrowerName: formData.coBorrowerName,
        goldRateToday: formData.goldRateToday,
        coBorrowerPhone: formData.coBorrowerPhone,
        requiredLoanAmount: formData.requiredLoanAmount, // Fix: Corrected variable
        phoneNumber: formData.phoneNumber,
        monthlyIncome: formData.monthlyIncome,
        rateOfInterest: formData.rateOfInterest,
        totalGoldWeight: formData.totalGoldWeight,
        goldWeightAfterWastage: formData.goldWeightAfterWastage,
        tenure: formData.tenure,
        city: formData.city,
        address: formData.address,
        pinCode: formData.pinCode,
        landMark: formData.landMark,
        kycDocuments: formData.kycDocuments,
        goldVerified: formData.goldVerified,
        vehicleDocumentsVerified: formData.vehicleDocumentsVerified,
        createdBy: user.uid, // Store user ID for verification
        timestamp: new Date(),
      });
  
      console.log("Loan application saved successfully!");
      alert("Loan application submitted successfully!");
    } catch (error) {
      console.error("Error saving loan application:", error.message);
    }
  };
  

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center p-6">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-5xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Gold Loan Form</h2>
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {formFields.map((field) => (
            <div className="flex flex-col" key={field.label}>
              <label className="text-gray-700 text-sm font-medium">{field.label.replace(/([A-Z])/g, ' $1').trim()} *</label>
              <input
                type="text"
                name={field.label}
                value={formData[field.label]}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors[field.label] && <span className="text-red-500 text-sm">{errors[field.label]}</span>}
            </div>
          ))}

          <div className="col-span-full">
            {/* Address Fields */}
         <h2 className="text-lg font-medium mt-6">Address</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
         {addressFields.map((field) => (
            <div key={field.label}>
              <label className="block font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                className="border p-2 w-full rounded-md"
              />
                 {errors[field.label] && <p className="text-red-500 text-sm">{errors[field.label]}</p>}
            </div>
          ))}
        </div>
            <h2 className="font-medium">KYC Documents</h2>
            {["Received Gold", "Aadhar Xerox"].map((doc) => (
              <label key={doc} className="flex items-center space-x-2 mt-2">
                <input type="checkbox" className="w-4 h-4" name="kycDocuments" value={doc} onChange={handleCheckboxChange} />
                <span>{doc}</span>
              </label>
            ))}
          </div>

          <div className="col-span-full">
            {["goldVerified", "vehicleDocumentsVerified"].map((doc) => (
              <label key={doc} className="flex items-center space-x-2 mt-2">
                <input type="checkbox" className="w-4 h-4" name={doc} checked={formData[doc]} onChange={handleCheckboxChange} />
                <span>{doc.replace(/([A-Z])/g, ' $1').trim()}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700">
              {loading ? "Submitting..." : "Apply Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoldLoan;
