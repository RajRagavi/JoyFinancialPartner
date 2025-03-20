import React, {useState} from "react";

const Dues = () => {
  const [formData, setFormData] = useState({
    hplNo: "",
    regNo: "",
    recpNo: "1",
    date: "19-03-2025",
    partyName: "",
    area: "",
    dues: "0",
    handLoan: "0",
    defAmount: "0",
    addLess: "0",
    dueAmount: "0",
    hlRemark: "",
    total: "",
    remark: "",
    payMode: "Cash A/C",
    releaseVehicle: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for numeric fields
    if (
      [
        "dues",
        "handLoan",
        "defAmount",
        "addLess",
        "dueAmount",
        "total",
      ].includes(name)
    ) {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};

    // Required fields
    ["hplNo", "regNo", "partyName", "area"].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Numeric fields should not be empty
    ["dues", "handLoan", "defAmount", "addLess", "dueAmount", "total"].forEach(
      (field) => {
        if (!formData[field]) {
          newErrors[field] = "Enter a valid number";
        }
      }
    );

    // Remark should be at least 5 characters long
    if (formData.remark.length < 5) {
      newErrors.remark = "Remark must be at least 5 characters long";
    }

    // Dropdown validation
    if (!formData.payMode) newErrors.payMode = "Select a payment mode";
    if (!formData.releaseVehicle) newErrors.releaseVehicle = "Select an option";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="grid grid-cols-2 gap-4 bg-gray-100">
      {/* Right Section (Dues & Payment Details) */}
      <div className="flex flex-col p-4 ">
        <label>Dues</label>
        <input
          type="text"
          name="dues"
          value={formData.dues}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {errors.dues && (
          <span className="text-red-500 text-sm">{errors.dues}</span>
        )}

        <label>Hand Loan</label>
        <input
          type="text"
          name="handLoan"
          value={formData.handLoan}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {errors.handLoan && (
          <span className="text-red-500 text-sm">{errors.handLoan}</span>
        )}

        <label>Def. Amount</label>
        <input
          type="text"
          name="defAmount"
          value={formData.defAmount}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {errors.defAmount && (
          <span className="text-red-500 text-sm">{errors.defAmount}</span>
        )}

        <label>Add/ Less</label>
        <input
          type="text"
          name="addLess"
          value={formData.addLess}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {errors.addLess && (
          <span className="text-red-500 text-sm">{errors.addLess}</span>
        )}

        <label>Pay Mode</label>
        <select
          name="payMode"
          value={formData.payMode}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Cash A/C">Cash A/C</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
        {errors.payMode && (
          <span className="text-red-500 text-sm">{errors.payMode}</span>
        )}
      </div>

      {/* Right Section (Amount & Remarks) */}
      <div className="flex flex-col  p-4 ">
        <label>Due Amount</label>
        <input
          type="text"
          name="dueAmount"
          value={formData.dueAmount}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {errors.dueAmount && (
          <span className="text-red-500 text-sm">{errors.dueAmount}</span>
        )}

        <label>HL REMARK</label>
        <input
          type="text"
          name="hlRemark"
          value={formData.hlRemark}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label>Total</label>
        <input
          type="text"
          name="total"
          value={formData.total}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {errors.total && (
          <span className="text-red-500 text-sm">{errors.total}</span>
        )}

        <label>Remark</label>
        <input
          type="text"
          name="remark"
          value={formData.remark}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {errors.remark && (
          <span className="text-red-500 text-sm">{errors.remark}</span>
        )}

        <label>Release Vehicle in Seizing</label>
        <select
          name="releaseVehicle"
          value={formData.releaseVehicle}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.releaseVehicle && (
          <span className="text-red-500 text-sm">{errors.releaseVehicle}</span>
        )}
      </div>
    </div>
  );
};

export default Dues;
