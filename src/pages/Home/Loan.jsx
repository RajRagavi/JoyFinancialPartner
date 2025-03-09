import { useState } from "react";
import { ImUsers } from "react-icons/im";

function Loan() {
 const [active, setActive] = useState(null);

  const loantypes = [
    { name: "Vehicle Loans", icon: <ImUsers size={30} /> },
    { name: "Business Loans", icon: <ImUsers size={30} /> },
    { name: "Personal Loans", icon: <ImUsers size={30} /> },
  ];



  return (
    <div>{/* Loan Types Section */}
    <div className="text-center py-16 px-4 md:px-10">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        You can avail a <br />
        various loans with us
      </h2>
      <p className="mt-3 text-gray-600 max-w-lg mx-auto">
        All you need is a loved vehicle loan. Your business is our priority.
      </p>
    
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loantypes.map((loan) => (
          <button
            key={loan.name}
            onClick={() => setActive(loan.name)}
            className={`w-full sm:w-64 p-6 flex flex-col items-center rounded-lg shadow-lg transition ${
              active === loan.name
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <span
              className={`text-3xl ${
                active === loan.name ? "text-white" : "text-blue-500"
              } hover:text-white`}
            >
              {loan.icon}
            </span>
            <span className="mt-2 text-lg font-semibold">{loan.name}</span>
          </button>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Loan