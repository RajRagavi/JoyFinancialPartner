import React from "react";
import { Car } from "lucide-react";
import { FaCoins, FaHandHoldingUsd } from "react-icons/fa";

const Furturedloans = () => {
    const loantypes = [
        { id: 1, name: "Vehicle Loan", icon: <Car size={50} /> },
        { id: 2, name: "Gold Loan", icon: <FaCoins size={50} color="gold" /> },
        { id: 3, name: "Business Loan", icon: <FaHandHoldingUsd size={50} /> },
    ];

    return (
        <div>
            <div className="text-center px-4 md:px-10 bg-gray-100 py-10">
                <h1 className="text-3xl md:text-4xl font-bold">Our Furtured Loans</h1>
                <p className="text-md text-gray-600 max-w-lg mx-auto mt-4">
                    Explore our top loan options with low interest rates, flexible
                    repayment plans, and quick approvals. Whether it's a Vehicle, Gold
                    or Business loan, we have the perfect solution to meet your financial
                    needs!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 place-items-center gap-5 mt-10 mb-10">
                    {loantypes.map((data) => (
                        <div key={data.id} className="space-y-3 text-center">
                            <div className="w-[100px] h-[50px] flex items-center justify-center text-blue-500">
                                {data.icon}  {/* Render the icon component directly */}
                            </div>
                            <div>
                                <h2 className="font-bold text-blue-950 text-xl">
                                    {data.name}
                                </h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Furturedloans;
