import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
    // Local Storage / Session Storage / API Call மூலம் role ஐ பெறவும்
    const userRole = localStorage.getItem("userRole"); // 'admin' அல்லது 'staff' என set செய்யவும்
    if (userRole) {
      setRole(userRole);
    } else {
      setRole("staff"); // Default role (உங்களது தேவைக்கேற்ப மாற்றலாம்)
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Admin Dashboard */}
      {role === "admin" ? (
        <div className="flex-1 p-6 bg-gray-200 ml-64">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <div className="grid grid-cols-3 gap-4">
            {["Active Loans", "Closed Loans", "Seized Loans", "Principle Balance", "Cash in Hand", "Fixed Deposit"].map((item, index) => (
              <div key={index} className="bg-blue-900 text-white rounded shadow-md h-30 p-3">{item}</div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 items-start">
            <div className="col-span-2 bg-white p-4 rounded shadow-md">
              <h2 className="text-center text-lg font-bold text-black">CT Osprey Nest Count</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} layout="vertical">
                  <XAxis type="number" domain={[0, 800]} tick={{ fontSize: 12 }} tickCount={9} />
                  <YAxis dataKey="year" type="category" tick={{ fontSize: 14, fontWeight: "bold" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="nests" fill="#3182CE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col space-y-4 p-4">
              {["Today Loans", "Settlement Amount", "Interest Income"].map((item, index) => (
                <div key={index} className="bg-blue-900 text-white rounded shadow-md h-25 p-3">{item}</div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Staff Dashboard
        <StaffDashboard />
      )}
    </div>
  );
};

export default Dashboard;
