import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Emicalculator = () => {
    const [amount, setAmount] = useState(150000);
    const [rate, setRate] = useState(11.3);
    const [months, setMonths] = useState(24);
  
    const COLORS = ["#f77073", "#1d9bff"];
  
    const calculateEMI = () => {
      let P = amount;
      let R = rate / 12 / 100;
      let N = months;
  
      let EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      let totalPay = EMI * N;
      let totalInt = totalPay - P;
  
      return { emi: EMI.toFixed(2), totalInterest: totalInt.toFixed(2), totalPayment: totalPay.toFixed(2) };
    };
  
    const { emi, totalInterest, totalPayment } = calculateEMI();
  
    const data = [
      { name: "Total Interest", value: parseFloat(totalInterest) },
      { name: "Total Payment", value: parseFloat(totalPayment) },
    ];

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">
        EMI Calculator
      </h2>

      {/* Side-by-Side Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Left Side - EMI Details */}
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Loan Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Interest Rate %</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full border p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Tenure (Months)</label>
            <input type="number" value={months} onChange={(e) => setMonths(e.target.value)} className="w-full border p-2 rounded" />
          </div>

          <div className="bg-green-700 text-white p-4 rounded">
            <p><strong>Loan Amount:</strong> ₹{amount}</p>
            <p><strong>Interest %:</strong> {rate}%</p>
            <p><strong>Tenure (Months):</strong> {months}</p>
            <p><strong>EMI (Monthly):</strong> ₹{emi}</p>
            <p><strong>Total Interest:</strong> ₹{totalInterest}</p>
            <p className="font-bold text-lg"><strong>Total Payment:</strong> ₹{totalPayment}</p>
          </div>
        </div>

        {/* Right Side - Pie Chart */}
        <div className="flex justify-center">
          <PieChart width={300} height={300}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

      </div>
    </div>
  );
};

export default Emicalculator;
