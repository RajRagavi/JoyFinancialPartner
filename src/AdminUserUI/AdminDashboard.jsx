import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
                const goldLoansSnapshot = await getDocs(collection(db, "gold_loans"));
                const vehicleLoansSnapshot = await getDocs(collection(db, "vehicle_loans"));
                setActiveLoans(goldLoansSnapshot.size + vehicleLoansSnapshot.size);
    
                const closedLoansSnapshot = await getDocs(query(collection(db, "loans"), where("status", "==", "closed")));
                setClosedLoans(closedLoansSnapshot.size);
    
                const seizedLoansSnapshot = await getDocs(query(collection(db, "vehicle_loans"), where("missedPayments", ">=", 3)));
                setSeizedLoans(seizedLoansSnapshot.size);
    
                let totalBalance = 0;
                const allLoansSnapshot = await getDocs(collection(db, "loans"));
                allLoansSnapshot.forEach(doc => {
                    totalBalance += doc.data().outstandingBalance || 0;
                });
                setPrincipleBalance(totalBalance);
    
                let totalIncome = 0;
                const transactionsSnapshot = await getDocs(collection(db, "transactions"));
                transactionsSnapshot.forEach(doc => {
                    totalIncome += doc.data().amount || 0;
                });
                setCashInHand(totalIncome);
    
                const today = new Date().toISOString().split("T")[0];
    
                const todayLoansSnapshot = await getDocs(query(collection(db, "loans"), where("sanctionDate", "==", today)));
                setTodayLoans(todayLoansSnapshot.size);
    
                let totalInterest = 0;
                transactionsSnapshot.forEach(doc => {
                    totalInterest += doc.data().interestEarned || 0;
                });
                setInterestIncome(totalInterest);
    
                const todayReceiptsSnapshot = await getDocs(query(collection(db, "receipts"), where("date", "==", today)));
                setTodayReceipts(todayReceiptsSnapshot.size);
    
                let totalCollection = 0;
                todayReceiptsSnapshot.forEach(doc => {
                    totalCollection += doc.data().amount || 0;
                });
    
                // ✅ Fetch Today's Collection from loan_payments
                let todayLoanCollection = 0;
                const todayCollectionQuery = query(
                    collection(db, "loan_payments"),
                    where("paymentDate", "==", today) // Ensure Firestore has 'paymentDate' in YYYY-MM-DD format
                );
                const todayCollectionSnapshot = await getDocs(todayCollectionQuery);
                todayCollectionSnapshot.forEach(doc => {
                    todayLoanCollection += doc.data().amount || 0;
                });
    
                // 🔹 Debug: Log data to check if Firestore is returning correct values
                console.log("Today Loan Collection Data:", todayCollectionSnapshot.docs.map(doc => doc.data()));
    
                // 🔹 Update Today Collection
                setTodayCollection(totalCollection + todayLoanCollection);
    
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };
    
        fetchLoanCounts();
    }, []);
        

    return (
        <div className="min-h-screen flex flex-col lg:ml-64 p-4 mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-900 text-white w-full h-32 flex flex-col items-center justify-center text-center rounded-md shadow">
                    <h3>Active Loans</h3>
                    <p className="text-2xl font-bold">{activeLoans}</p>
                </div>
                <div className="bg-blue-900 text-white w-full h-32 flex items-center justify-center text-center rounded-md shadow">
                    Closed Loans
                </div>
                <div className="bg-blue-900 text-white w-full h-32 flex items-center justify-center text-center rounded-md shadow">
                    Seized Loans
                </div>

                <div className="bg-blue-900 text-white w-full h-32 flex items-center justify-center text-center rounded-md shadow">
                    Principle Balance
                </div>
                <div className="bg-blue-900 text-white w-full h-32 flex items-center justify-center text-center rounded-md shadow">
                    Cash in Hand
                </div>
                <div className="bg-blue-900 text-white w-full h-32 flex items-center justify-center text-center rounded-md shadow">
                    Today Loans
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center w-full col-span-2">
                    <div className="w-full">
                        <h2 className="text-center text-lg font-bold text-black mb-4">CT Osprey Nest Count</h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={data} layout="vertical">
                                <XAxis type="number" domain={[0, 800]} tick={{ fontSize: 12 }} />
                                <YAxis dataKey="year" type="category" tick={{ fontSize: 14, fontWeight: "bold" }} />
                                <Tooltip />
                                <Bar dataKey="nests" fill="#3182CE" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 ">
                    <div className="bg-blue-900 text-white w-full h-32 flex items-center justify-center text-center rounded-md shadow">
                        Settlement Amount
                    </div>
                    <div className="bg-blue-900 text-white w-full h-32 flex items-center justify-center text-center rounded-md shadow">
                        Interest Income
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-900 text-white w-full h-32 flex items-center justify-center text-center rounded-md shadow">
                    Today Receipt
                </div>
                <div className="bg-blue-900 text-white w-full h-32 flex flex-col items-center justify-center text-center rounded-md shadow">
                    <h3>Today Collection</h3>
                    <p className="text-2xl font-bold">₹ {todayCollection}</p>
                </div>

                <div className="bg-blue-900 text-white w-full h-32 flex items-center justify-center text-center rounded-md shadow">
                    Closed Loans
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
