import React, { useState } from "react";
import { ChevronDown } from 'lucide-react';

const customers = [
  { id: "101", name: "John Doe" },
  { id: "102", name: "Jane Smith" },
  { id: "103", name: "Michael Johnson" },
];

const Entry = () => {
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");

  // Customer ID Enter செய்தால் Name Auto-Fill
  const handleCustomerIdChange = (e) => {
    const id = e.target.value;
    setCustomerId(id);

    const customer = customers.find((c) => c.id === id);
    setCustomerName(customer ? customer.name : "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-5 bg-gray-200 min-h-screen flex flex-col lg:ml-64">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-5xl">
      <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* Customer ID Input */}
      <div className='flex flex-col'>
      <label className="text-gray-700 font-medium text-sm">Customer ID</label>
      <input
        type="text"
        value={customerId}
        onChange={handleCustomerIdChange}
        placeholder="Enter Customer ID"
        className="border rounded p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      </div>

      {/* Customer Name with Embedded Dropdown */}
      <div className='flex flex-col right-20'>
      <label className="text-gray-700 text-sm font-medium">Customer Name</label>
      <div className="relative w-full">
        <select
          value={customerName}
          className="border rounded p-2 w-full mt-1 appearance-none bg-gray-100 focus:outline-none"
        >
          <option value="">{customerName || "Select Customer"}</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.name}>
              {customer.name}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <ChevronDown />
        </div>
        </div>
      </div>
      {/* Loan ID */}
      <div className="flex flex-col">
        <label className="text-gray-700 text-sm font-medium">Loan ID</label>
        <input type="text" name="fathername"  onChange={handleInputChange}
        className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
      </div> 

      {/* Loan Amount */}
      <div className="flex flex-col">
        <label className="text-gray-700 text-sm font-medium">Loan Total Amount</label>
        <input type="text" name="fathername"  onChange={handleInputChange}
        className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
      </div> 

      {/* paid amount*/}
      <div className="flex flex-col">
        <label className="text-gray-700 text-sm font-medium">Paid Amount</label>
        <input type="text" name="fathername"  onChange={handleInputChange}
        className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
      </div>

      {/* peinding amount*/}
      <div className="flex flex-col">
        <label className="text-gray-700 text-sm font-medium">Peinding Amount</label>
        <input type="text" name="fathername"  onChange={handleInputChange}
        className="border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
      </div>
      </form>
    </div>
    </div>
  );
};

export default Entry;