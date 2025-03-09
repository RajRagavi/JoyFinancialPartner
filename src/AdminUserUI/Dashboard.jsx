import React, { useState } from "react";
import { FaSearch, FaSignOutAlt, FaHome, FaRegClock, FaSyncAlt, FaFileInvoice, FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard,  MdBarChart, MdLocalPrintshop } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


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
  const [showChart, setShowChart] = useState(true); 

 

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-200 ml-64 ">
       

        {/* Dashboard Cards */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
          {["Active Loans", "Closed Loans", "Seized Loans", 
          "Principle Balance", "Cash in Hand", "Fixed Deposit"].map((item, index) => (
            <div key={index} className="bg-blue-900 text-white rounded shadow-md h-30 p-3">
              {item}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 items-start">
          {/* Chart Section */}
          {showChart && (
            <div className="col-span-2 bg-white p-4 rounded shadow-md">
              <h2 className="text-center text-lg font-bold text-black">CT Osprey Nest Count</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} layout="vertical">
                  <XAxis type="number" domain={[0, 800]} tick={{ fontSize: 12 }} tickCount={9} />
                  <YAxis 
                    dataKey="year" type="category" 
                    tick={{ fontSize: 14, fontWeight: "bold" }} 
                    label={{ 
                      value: "year", 
                      angle: -90, 
                      position: "insideLeft", 
                      style: { textAnchor: 'middle', fontSize: 20, fontWeight: "bold", fill: "#3182CE" } 
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="nests" fill="#3182CE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Right Side Cards */}
          <div className="flex flex-col space-y-4 p-4">
            {["Today Loans", "Settlement Amount", "Interest Income"].map((item, index) => (
              <div key={index} className="bg-blue-900 text-white rounded shadow-md h-25 p-3">
                {item}
              </div>
            ))}
          </div>

          {/* Bottom Row Cards */}
          <div className="col-span-3 flex justify-center gap-4">
            {["Today Receipt", "Today Collection", "Closed Loans"].map((item, index) => (
              <div key={index} className="bg-blue-900 text-white rounded shadow-md w-1/3 h-30 p-3">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
