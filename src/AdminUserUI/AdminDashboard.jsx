import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
    const [activeLoans, setActiveLoans] = useState(0);
    const [closedLoans, setClosedLoans] = useState(0);
    const [seizedLoans, setSeizedLoans] = useState(0);
    const [principleBalance, setPrincipleBalance] = useState(0);
    const [cashInHand, setCashInHand] = useState(0);
    const [todayLoans, setTodayLoans] = useState(0);
    const [interestIncome, setInterestIncome] = useState(0);
    const [todayReceipts, setTodayReceipts] = useState(0);
    const [todayCollection, setTodayCollection] = useState(0);

    useEffect(() => {
        const fetchLoanCounts = async () => {
            try {
                // Fetch Active Loans
                const goldLoansSnapshot = await getDocs(collection(db, "gold_loans"));
                const vehicleLoansSnapshot = await getDocs(collection(db, "vehicle_loans"));
                setActiveLoans(goldLoansSnapshot.size + vehicleLoansSnapshot.size);

                // Fetch Closed Loans
                const closedLoansSnapshot = await getDocs(query(collection(db, "loans"), where("status", "==", "closed")));
                setClosedLoans(closedLoansSnapshot.size);

                // Fetch Seized Loans
                const seizedLoansSnapshot = await getDocs(query(collection(db, "vehicle_loans"), where("missedPayments", ">=", 3)));
                setSeizedLoans(seizedLoansSnapshot.size);

                // Fetch Principle Balance
                let totalBalance = 0;
                const allLoansSnapshot = await getDocs(collection(db, "loans"));
                allLoansSnapshot.forEach(doc => {
                    totalBalance += doc.data().outstandingBalance || 0;
                });
                setPrincipleBalance(totalBalance);

                // Fetch Cash in Hand (Total Income)
                let totalIncome = 0;
                const transactionsSnapshot = await getDocs(collection(db, "transactions"));
                transactionsSnapshot.forEach(doc => {
                    totalIncome += doc.data().amount || 0;
                });
                setCashInHand(totalIncome);

                // Fetch Today's Loans
                const today = new Date().toISOString().split("T")[0];
                const todayLoansSnapshot = await getDocs(query(collection(db, "loans"), where("sanctionDate", "==", today)));
                setTodayLoans(todayLoansSnapshot.size);

                // Fetch Interest Income
                let totalInterest = 0;
                transactionsSnapshot.forEach(doc => {
                    totalInterest += doc.data().interestEarned || 0;
                });
                setInterestIncome(totalInterest);

                // Fetch Today Receipts
                const todayReceiptsSnapshot = await getDocs(query(collection(db, "receipts"), where("date", "==", today)));
                setTodayReceipts(todayReceiptsSnapshot.size);

                // Fetch Today's Collection
                let totalCollection = 0;
                todayReceiptsSnapshot.forEach(doc => {
                    totalCollection += doc.data().amount || 0;
                });
                setTodayCollection(totalCollection);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchLoanCounts();
    }, []);

    return (
        <div className="min-h-screen flex flex-col lg:ml-64 sm:mr-15 mt-10 ">
            <div className="grid grid-cols-3 gap-4">
                {/* First Row */}
                <div className="bg-blue-900 text-white w-62 h-32 flex items-center justify-center text-center rounded-md shadow">
                    <h3>Active Loans: </h3>
                    <p className="text-2xl font-bold pl-4"> {activeLoans}</p></div>
                <div className="bg-blue-900 text-white w-62 h-32 flex items-center justify-center text-center rounded-md shadow">
                    Closed Loans
                </div>

                <div className="bg-blue-900 text-white w-62 h-32 flex items-center justify-center text-center rounded-md shadow">Seized Loans</div>

                {/* Second Row */}
                <div className="bg-blue-900 text-white w-62 h-32 flex items-center justify-center text-center rounded-md shadow">Principle Balance</div>
                <div className="bg-blue-900 text-white w-62 h-32 flex items-center justify-center text-center rounded-md shadow">Cash in Hand</div>
                <div className="bg-blue-900 text-white w-62 h-32 flex items-center justify-center text-center rounded-md shadow">Today Loans</div>
            </div>

            {/* Chart Section */}
            <div className="mt-6 grid grid-cols-3 gap-8 items-center ">
  <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center w-full col-span-2">
    <div className="w-full">
      <h2 className="text-center text-lg font-bold text-black mb-4">CT Osprey Nest Count</h2>
      <ResponsiveContainer width="100%" height={250}> {/* Increased width */}
        <BarChart data={data} layout="vertical">
          <XAxis type="number" domain={[0, 800]} tick={{ fontSize: 12 }} />
          <YAxis dataKey="year" type="category" tick={{ fontSize: 14, fontWeight: "bold" }} />
          <Tooltip />
          <Bar dataKey="nests" fill="#3182CE" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  <div className="grid grid-cols-1 gap-4">
    <div className="bg-blue-900 text-white  w-62 h-32 flex items-center justify-center text-center rounded-md shadow">Settlement Amount</div>
    <div className="bg-blue-900 text-white  w-62 h-32 flex items-center justify-center text-center rounded-md shadow">Interest Income</div>
  </div>
</div>


            {/* Bottom Row */}
            <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-blue-900 text-white w-62 h-32 flex items-center justify-center text-center rounded-md shadow">Today Receipt</div>
                <div className="bg-blue-900 text-white w-62 h-32 flex items-center justify-center text-center rounded-md shadow">Today Collection</div>
                <div className="bg-blue-900 text-white w-62 h-32 flex items-center justify-center text-center rounded-md shadow">Closed Loans</div>
            </div>
        </div>
    );
}

export default AdminDashboard;