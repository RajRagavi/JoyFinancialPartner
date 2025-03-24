import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const ViewLoans = () => {
  const [vehicleLoans, setVehicleLoans] = useState([]);
  const [goldLoans, setGoldLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("vehicle");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const loansPerPage = 5;

  useEffect(() => {
    const fetchLoans = async () => {
      const vehicleSnapshot = await getDocs(collection(db, "vehicle_loans"));
      const goldSnapshot = await getDocs(collection(db, "gold_loans"));
      
      const vehicleLoansData = await processLoanDocs(vehicleSnapshot);
      const goldLoansData = await processLoanDocs(goldSnapshot);
      
      setVehicleLoans(vehicleLoansData);
      setGoldLoans(goldLoansData);
      setLoading(false);
    };
    fetchLoans();
  }, []);

  const processLoanDocs = async (snapshot) => {
    const loanData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return Promise.all(loanData.map(async (loan) => {
      const updatedLoan = { ...loan };
      for (const key in loan) {
        if (typeof loan[key] === "string" && loan[key].startsWith("images/")) {
          try {
            updatedLoan[key] = await getDownloadURL(ref(storage, loan[key]));
          } catch (error) {
            console.error("Error fetching image URL:", error);
          }
        }
      }
      return updatedLoan;
    }));
  };

  const approveLoan = async (loanId, loanType) => {
    const loanRef = doc(db, `${loanType}_loans`, loanId);
    await updateDoc(loanRef, { approved: true });

    if (loanType === "vehicle") {
      setVehicleLoans(prevLoans => prevLoans.map(loan => loan.id === loanId ? { ...loan, approved: true } : loan));
    } else {
      setGoldLoans(prevLoans => prevLoans.map(loan => loan.id === loanId ? { ...loan, approved: true } : loan));
    }
  };

  if (loading) return <div className="text-center text-xl font-bold mt-10">Loading...</div>;

  const getTableHeaders = (loans) => (loans.length === 0 ? [] : Object.keys(loans[0]));

  const getFilteredLoans = () => {
    let loans = filter === "vehicle" ? vehicleLoans : goldLoans;
    if (searchTerm) {
      loans = loans.filter(loan => loan.LoanNo?.toString().includes(searchTerm));
    }
    return loans;
  };

  const filteredLoans = getFilteredLoans();
  const totalPages = Math.ceil(filteredLoans.length / loansPerPage);
  const indexOfLastLoan = currentPage * loansPerPage;
  const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
  const currentLoans = filteredLoans.slice(indexOfFirstLoan, indexOfLastLoan);

  return (
    <div className="min-h-screen flex flex-col lg:ml-64 sm:mr-15 mt-10 px-4">
      <div className="py-6">
        <h2 className="text-2xl font-semibold mb-4">View Loans</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="font-semibold">Filter:</label>
          <select className="p-2 border rounded bg-white shadow-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="vehicle">Vehicle Loans</option>
            <option value="gold">Gold Loans</option>
          </select>
          <input type="text" placeholder="Search by Loan No" className="p-2 border rounded shadow-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="w-full max-w-full">
    <h2 className="text-xl font-semibold mb-2">{filter === "vehicle" ? "Vehicle Loans" : "Gold Loans"}</h2>

    <div className="w-full overflow-x-auto"> {/* Here the table will scroll horizontally */}
      <div className="max-h-[400px] overflow-y-auto border border-gray-300 shadow-md rounded-lg">
        <table className="min-w-full border-collapse border border-blue-300 text-sm">
          <thead className="sticky top-0 bg-blue-500 text-white">
            <tr>
              {getTableHeaders(currentLoans).map((header) => (
                <th key={header} className="border p-3 text-left">{header}</th>
              ))}
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentLoans.map((loan) => (
              <tr key={loan.id} className="odd:bg-blue-100 even:bg-blue-200 hover:bg-blue-300 transition">
                {getTableHeaders(currentLoans).map((header) => (
                  <td key={header} className="border p-3 text-left whitespace-nowrap">
                    {loan[header]?.toString() || "N/A"}
                  </td>
                ))}
                <td className="border p-3 text-left">
                  {!loan.approved && (
                    <button
                      onClick={() => approveLoan(loan.id, filter)}
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        

        <div className="flex justify-between items-center mt-4">
          <button className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"}`} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span className="font-semibold">Page {currentPage} of {totalPages}</span>
          <button className={`px-4 py-2 bg-gray-300 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"}`} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default ViewLoans;
