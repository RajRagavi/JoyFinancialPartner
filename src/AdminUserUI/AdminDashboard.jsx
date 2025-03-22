import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";



// Sample data
const data = [
  { year: "2014", nests: 150 },
  { year: "2015", nests: 220 },
  { year: "2016", nests: 350 },
  { year: "2017", nests: 470 },
  { year: "2018", nests: 600 },
  { year: "2019", nests: 720 },
  { year: "2020", nests: 800 },
];

function AdminDashboard() {
  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-200 lg:ml-64 sm:ml-0 w-full">
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center sm:text-left">
      Admin Dashboard
    </h2>

    {/* Cards Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {["Active Loans", "Closed Loans", "Seized Loans", "Principle Balance", "Cash in Hand", "Fixed Deposit"].map(
        (item, index) => (
          <div
            key={index}
            className="bg-blue-900 text-white rounded shadow-md min-h-[80px] flex items-center justify-center text-xs sm:text-sm md:text-base w-full"
          >
            {item}
          </div>
        )
      )}
    </div>

    {/* Charts & Summary */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className="col-span-1 md:col-span-2 bg-white p-4 rounded shadow-md w-full">
        <h2 className="text-center text-lg font-bold text-black">CT Osprey Nest Count</h2>
        <div className="w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} layout="vertical">
              <XAxis type="number" domain={[0, 800]} tick={{ fontSize: 10 }} tickCount={9} />
              <YAxis dataKey="year" type="category" tick={{ fontSize: 12, fontWeight: "bold" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="nests" fill="#3182CE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
        {["Today Loans", "Settlement Amount", "Interest Income"].map((item, index) => (
          <div
            key={index}
            className="bg-blue-900 text-white rounded shadow-md min-h-[80px] flex items-center justify-center text-xs sm:text-sm md:text-base w-full"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default AdminDashboard