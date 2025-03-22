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

  useEffect(() => {
    const fetchLoans = async () => {
      const vehicleSnapshot = await getDocs(collection(db, "vehicle_loans"));
      const goldSnapshot = await getDocs(collection(db, "gold_loans"));

      // Convert Firestore docs to objects
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

    // Fetch image URLs if necessary
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

  if (loading) {
    return <div className="text-center text-xl font-bold">Loading...</div>;
  }

  const getTableHeaders = (loans) => {
    if (loans.length === 0) return [];
    return Object.keys(loans[0]);
  };

  const getFilteredLoans = () => {
    return filter === "vehicle" ? vehicleLoans : goldLoans;
  };

  return (
    <div className="min-h-screen flex flex-col lg:ml-64 sm:mr-15 mt-10 ">
      <div className="py-6">
        <h2 className="text-xl font-semibold mb-3">View Loans</h2>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="font-semibold">Filter:</label>
          <select
            className="p-2 border rounded text-sm sm:text-base"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="vehicle">Vehicle Loans</option>
            <option value="gold">Gold Loans</option>
          </select>
        </div>
      </div>

      {/* Loan Tables */}
      <div className="overflow-x-auto w-full">
        <div className="container mt-4">
          <div className="overflow-x-auto w-full">
            <h2 className="text-lg font-semibold mb-2">{filter === "vehicle" ? "Vehicle Loans" : "Gold Loans"}</h2>
            <table className="min-w-full border-collapse border border-blue-300 text-sm">
              <thead>
                <tr className="bg-blue-500 text-white">
                  {getTableHeaders(getFilteredLoans()).map((header) => (
                    <th key={header} className="border p-2 text-left">{header}</th>
                  ))}
                  <th className="border p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredLoans().map((loan) => (
                  <tr key={loan.id} className={`${loan.approved ? 'bg-gray-300' : 'odd:bg-blue-100 even:bg-blue-200 hover:bg-blue-300'}`}>
                    {getTableHeaders(getFilteredLoans()).map((header) => (
                      <td key={header} className="border p-2 text-left">
                        {loan[header] ? (
                          // Check if it's a string URL
                          typeof loan[header] === "string" && loan[header].startsWith("http") ? (
                            <img src={loan[header]} alt="Document" className="w-16 h-16 object-cover" 
                              onError={(e) => e.target.style.display = 'none'} />
                          ) :
                            // Check if it's an array of URLs
                            Array.isArray(loan[header]) ? (
                              loan[header].map((imgUrl, index) => (
                                <img key={index} src={imgUrl} alt={`Document ${index}`} className="w-16 h-16 object-cover mr-2" 
                                  onError={(e) => e.target.style.display = 'none'} />
                              ))
                            ) :
                              // Check if it's an object containing a URL
                              typeof loan[header] === "object" && loan[header]?.url ? (
                                <img src={loan[header].url} alt="Document" className="w-16 h-16 object-cover" 
                                  onError={(e) => e.target.style.display = 'none'} />
                              ) : (
                                loan[header].toString()
                              )
                        ) : "N/A"}
                      </td>
                    ))}

                    <td className="border p-2 text-left">
                      {!loan.approved && (
                        <button
                          onClick={() => approveLoan(loan.id, filter)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
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
      </div>
    </div>
  );
};

export default ViewLoans;
