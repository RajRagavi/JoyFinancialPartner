import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase/firebaseConfig"; 
import { collection, addDoc , query, orderBy, limit, getDocs} from "firebase/firestore"; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 


import VehiclePage2 from "./VehiclePage2";
import VehiclePage3 from "./VehiclePage3";




const formFields = [
  
  { label: "Loan No", type:  "text", required: true },
  { label: "GEO CODE", type:  "text", required: true },
  { label: "Customer Name", type:  "text", required: true },
  { label: "Date of Birth", type: "date",  },
  { label: "Father Name", type:  "text", required: true },
  { label: "Vehicle Number", type: "number",  },
  { label: "Vehicle Value", type:  "text", required: true },
  { label: "Vehicle Type", type:  "text", required: true },
  { label: "Vehicle Make", type:  "text", required: true },
  { label: "Vehicle Model & Year", type:  "text", required: true },
  { label: "Engine Number", type:  "text", required: true },
  { label: "Borrower Name", type:  "text", required: true },
  { label: "Monthly Income", type: "number",  },
  { label: "Mobile Number", type: "number",  },
  { label: "Alternate Number", type: "number",  },
  { label: "CoBorrower Name", type:  "text", required: true },
  { label: "CoBorrower Phone", type: "number",  },
  { label: "Occupation", type:  "text", required: true },
  { label: "Loan Required", type: "number",  },
  { label: "Other EMI", type: "number", required: false },
  { label: "Tenure", type:  "text", required: true },
  { label: "Amount", type: "number",  },
  { label: "Months", type: "number",  },
  { label: "Interest (%)", type: "number",  },
  { label: "Chassis Number", type: "number",  },
  { label: "Date", type: "date",  }
];

const fileFields = [
  { label: "Aadhar Front & Back Side Photo", },
  { label: "Pan Photo",},
  { label: "Licence Photo" ,},
  { label: "Bike Live Photos",},
  { label: "Vehicle Photo Upload", },
  { label: "RC Image",},
  { label: "Borrower Image", },
  { label: "Vehicle Front",},
  { label: "Vehicle Back" ,}
];

const verificationOptions = [
  "Duplicate Key",
  "License Xerox",
  "Aadhar Xerox",
  "Original RC",
  "Ration Xerox",
  "NOC",
  "Ready Cash",
  "Received and checked KYC Documents for both Borrower and Guarantor?",
  "Borrower House Verified",
  "Vehicle Documents Verified?",
];
const addressFields = [

    { label: "House Own/Rent*", type:  "text", required: true  ,placeholder: "House Own/Rent*",  },
    { label: "Door / Flat Number", type:  "text", required: true  ,placeholder: "Enter Door / Flat Number",  },
    { label: "Street / Lane", type:  "text", required: true  ,placeholder: "Enter Street / Lane",  },
    { label: "Area / Society Name", type:  "text", required: true  ,placeholder: "Enter Area / Society Name",  },
    { label: "City / Village", type:  "text", required: true  ,placeholder: "Enter City / Village",  },
    { label: "District", type:  "text", required: true  ,placeholder: "Enter District",  },
    { label: "State", type:  "text", required: true  ,placeholder: "Enter State",  },
    { label: "Country", type:  "text", required: true  ,placeholder: "Enter Country",  },
    { label: "Pincode", type:  "text", required: true  ,placeholder: "Enter Pincode",  },
    { label: "Landmark", type:  "text", required: true  ,placeholder: "Enter Nearby Landmark (Optional)",  },
];

  

const VehicleLoan = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    LoanNo: "", 
    hardProofs: [], 
  });
  
  const [fileData, setFileData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

const storage = getStorage();


const handleCheckboxChange = (e) => {
  const { value, checked } = e.target;
  setFormData((prev) => ({
    ...prev,
    hardProofs: checked
      ? [...(prev.hardProofs || []), value]  // ✅ Fallback to empty array
      : (prev.hardProofs || []).filter((item) => item !== value),
  }));
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFileData({ ...fileData, [name]: files[0] });
  };

  const validateForm = () => {
    let newErrors = {};

    // Validate Required Fields
    formFields.forEach((field) => {
        if (field.required && !formData[field.label]) {
            newErrors[field.label] = `${field.label} is required`;
        }
    });

    // Validate Required Files
    fileFields.forEach((field) => {
        if (field.required && !fileData[field.label]) {
            newErrors[field.label] = `${field.label} is required`;
        }
    });
    addressFields.forEach((field) => {
      if (field.required && !formData[field.label]) {
        newErrors[field.label] = `${field.label} is required`;
      }
    });
    // Validate Mobile Number Format
    if (formData["Mobile Number"] && !/^\d{10}$/.test(formData["Mobile Number"])) {
        newErrors["Mobile Number"] = "Invalid Mobile Number (10 digits required)";
    }

    // Validate Numeric Fields
    ["Amount", "Interest (%)", "Months"].forEach((field) => {
        if (formData[field] && isNaN(formData[field])) {
            newErrors[field] = `${field} must be a valid number`;
        }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const uploadFile = async (file, fieldName) => {
  if (!file) return null;

  const storageRef = ref(storage, `kycUploads/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`${fieldName} Upload Progress: ${progress}%`);
      },
      (error) => {
        console.error(`Error uploading ${fieldName}:`, error);
        reject(null);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(`${fieldName} uploaded successfully:`, downloadURL);
        resolve(downloadURL);
      }
    );
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  let uploadedFiles = {};
  for (const key in fileData) {
    uploadedFiles[key] = await uploadFile(fileData[key], key);
  }

  const formSubmission = { 
    ...formData, 
    uploadedFiles, 
    timestamp: new Date() 
  };

  try {
    await addDoc(collection(db, "vehicle_loans"), {
      ...formSubmission,
      LoanNo: Number(formData.LoanNo), 
    });
   
    navigate("/kyc-vehicle");
    
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
const nextStep = () => {
  if (!validateForm()) {
    alert("Please fill all required fields before proceeding.");
    return;
  }
  if (currentStep < steps.length) {
    setCurrentStep(currentStep + 1);
  }
};

const prevStep = () => {
  if (currentStep > 1) {
    setCurrentStep(currentStep - 1);
  }
};

const steps = [
  { id: 1, label: "Borrower and Vehicle Details" },
  { id: 2, label: "Loan Details" },
  { id: 3, label: "Camera" },
];

const finishProcess = async () => {
  let uploadedFiles = {};
  for (const key in fileData) {
    uploadedFiles[key] = await uploadFile(fileData[key], key);
  }

  const formSubmission = { 
    ...formData,  // ✅ Step 1, Step 2 & Step 3 Data
    uploadedFiles, 
    timestamp: new Date() 
  };

  try {
    await addDoc(collection(db, "vehicle_loans"), formSubmission);
    alert("Process Completed Successfully!");
    
    // ✅ Reload the page after submission
    window.location.reload();
    
    // OR, if using React Router v6:
    // navigate(0);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

const generateLoanNumber = async () => {
  try {
    const loansRef = collection(db, "vehicle_loans");
    const q = query(loansRef, orderBy("LoanNo", "desc"), limit(1)); 
    const querySnapshot = await getDocs(q);

    let loanNo = "1001"; 
    if (!querySnapshot.empty) {
      const lastLoan = querySnapshot.docs[0].data();
      loanNo = (parseInt(lastLoan.LoanNo) + 1).toString(); 
    }

    setFormData((prev) => ({ ...prev, LoanNo: loanNo }));
  } catch (error) {
    console.error("Error generating loan number:", error);
  }
};

useEffect(() => {
  generateLoanNumber();
}, []);


  return (
    <div className="flex min-h-screen">
        

    {/* Main Content */}
    <div className=" bg-gray-200 min-h-screen flex flex-col  mb-5">
    <div className="flex items-center justify-between relative">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative flex-1 flex flex-col items-center font-semibold"
            >
              {index !== 0 && (
                <div
                  className={`absolute top-5 -left-1/2 w-full h-1 transition-all duration-300 ${
                    currentStep >= step.id ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
              <div
                className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                  currentStep >= step.id ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                {step.id}
              </div>
              <span className="text-sm mt-2 text-center">{step.label}</span>
            </div>
          ))}
        </div>
        {currentStep === 1 && (
      <form className="bg-white p-6 rounded-lg shadow-md mt-5" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Vehicle Loan Form</h2>
        <div className="grid grid-cols-3 gap-4">
          {formFields.map((field) => (
            <div key={field.label}>
              <label className="block font-medium">{field.label} *</label>
              <input type={field.type} name={field.label} value={formData[field.label] || ""} onChange={handleInputChange} className="border p-2 w-full rounded-md" />
              {errors[field.label] && <p className="text-red-500 text-sm">{errors[field.label]}</p>}
            </div>
          ))}
        </div>
         {/* Address Fields */}
         <h2 className="text-lg font-medium mt-6">Address</h2>
        <div className="grid grid-cols-3 gap-4">
          {addressFields.map((field) => (
            <div key={field.label}>
              <label className="block font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.label}
                value={formData[field.label] || ""}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                className="border p-2 w-full rounded-md"
              />
                 {errors[field.label] && <p className="text-red-500 text-sm">{errors[field.label]}</p>}
            </div>
          ))}
        </div>
        <h2 className="text-lg font-medium mt-6">KYC Documents Upload</h2>
        <div className="grid grid-cols-3 gap-4">
          {fileFields.map((field) => (
            <div key={field.label}>
              <label className="block font-medium">{field.label} *</label>
              <input type="file" name={field.label} onChange={handleFileChange} className="border p-2 w-full rounded-md" />
              {errors[field.label] && <p className="text-red-500 text-sm">{errors[field.label]}</p>}
            </div>
          ))}
        </div>
          {/* Verification Checkboxes */}
          <h2 className="text-lg font-medium mt-6">Verification</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {verificationOptions.map((option) => (
                            <label key={option} className="flex items-center space-x-2">
                                <input type="checkbox" name={option} onChange={(e) => handleCheckboxChange(e, "verification")} className="w-4 h-4" />
                                <span>{option}</span>
                            </label>
                        ))}
                 
                    </div>
                    </form>
                  )}
          {currentStep === 2 && <VehiclePage2 formData={formData} setFormData={setFormData} />}
          {currentStep === 3 && <VehiclePage3 formData={formData} setFormData={setFormData} />}

           {/* Previous & Next Buttons finish button */}
 <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={prevStep}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${
              currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${
              currentStep === steps.length
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentStep === steps.length}
          >
            Next
          </button>
          {/* Finish Button */}
          {currentStep === steps.length - 0 && (
            <button
              onClick={finishProcess}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg"
            >
              Finish
            </button>
          )}
        </div>
        </div>


                  
   
    </div>

  );
};

export default VehicleLoan;
