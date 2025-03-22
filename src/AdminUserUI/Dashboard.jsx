import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import StaffDashboard from "./Staff/StaffDashboard";

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

const Dashboard = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole ? userRole : "staff");
  }, []);

  return (
    <div className="flex min-h-screen sm:mr-40">
      {role === "admin" ? (
        <div className="flex-1 p-6 bg-gray-200 lg:ml-64">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center sm:text-left">Admin Dashboard</h2>

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {["Active Loans", "Closed Loans", "Seized Loans", "Principle Balance", "Cash in Hand", "Fixed Deposit"].map((item, index) => (
              <div key={index} className="bg-blue-900 text-white rounded shadow-md h-20 p-3 text-center text-xs sm:text-sm md:text-base">
                {item}
              </div>
            ))}
          </div>

          {/* Charts & Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="col-span-1 md:col-span-2 bg-white p-4 rounded shadow-md">
              <h2 className="text-center text-lg font-bold text-black">CT Osprey Nest Count</h2>
              <ResponsiveContainer width="100%" height={200} className="sm:h-[300px]">
                <BarChart data={data} layout="vertical">
                  <XAxis type="number" domain={[0, 800]} tick={{ fontSize: 10 }} tickCount={9} />
                  <YAxis dataKey="year" type="category" tick={{ fontSize: 12, fontWeight: "bold" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="nests" fill="#3182CE" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap justify-center gap-4 p-4">
              {["Today Loans", "Settlement Amount", "Interest Income"].map((item, index) => (
                <div key={index} className="bg-blue-900 text-white rounded shadow-md h-20 p-3 text-center text-xs sm:text-sm md:text-base">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <StaffDashboard />
      )}
    </div>
  );
};

export default Dashboard;
