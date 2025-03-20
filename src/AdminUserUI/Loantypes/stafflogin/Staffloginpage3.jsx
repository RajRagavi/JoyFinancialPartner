import React, { useState } from "react";
import Dues from "./Dues";

const Staffloginpage3 = () => {
  const [date, setDate] = useState("");

  return (
    <div className=" p-2">
      <h1 className="text-gray-700 bg-gray-100 font-sans py-2 p-2">PAY DUE</h1>
      <div className="grid grid-cols-3 gap-4 p-6">
        {/* HPL NO */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">HPL NO</label>
          <input
            type="text"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* REG NO */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">REG NO</label>
          <input
            type="text"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* RECP NO */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">RECP NO</label>
          <input
            type="text"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Date Input */}
        <div className="flex flex-col mb-4">
          <label className="font-semibold text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* PartyName */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">PartyName</label>
          <input
            type="text"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Area */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Area</label>
          <input
            type="text"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      {/* Dues */}
      <Dues />
    </div>
  );
};

export default Staffloginpage3;
