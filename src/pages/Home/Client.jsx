import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function Client() {
  const clientReviews = [
    { rating: 4, content: "I needed a vehicle loan urgently, and Joy Finance made the process so easy. Quick approval, minimal paperwork, and great customer support!", reviewer: "Arun Kumar", location: "Trichy" },
    { rating: 4.5, content: "Getting a gold loan was hassle-free with Joy Finance. The interest rates were reasonable, and the staff was very helpful. I got the loan amount within hours!", reviewer: "Sundaram", location: "Illupur" },
    { rating: 4, content: "Joy Finance helped me purchase my dream bike with their fast vehicle loan service. The process was smooth, and the repayment options were flexible. Thank you!", reviewer: "Ravi", location: "Viralimalai" },
];

  // ⭐ Star Rating Component
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
      </div>
    );
  };

  return (
    <div>
      {/* Client Reviews Section */}
      <div className="text-center py-10 bg-gray-100">
        <h2 className="text-3xl font-bold">What Clients Say</h2>
        <p className="mt-3 text-gray-600 max-w-lg mx-auto">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 md:px-20 gap-6">
        {clientReviews.map(({ rating, content, reviewer, location }, i) => (
  <div key={i} className="bg-white p-6 rounded-lg shadow-md">
    <StarRating rating={rating} />
    <p className="text-gray-600 text-justify">{content}</p>
    <p className="mt-2 font-semibold text-blue-700 flex justify-end">
  - {reviewer}, {location}
</p>

  </div>
))}

        </div>
      </div>
    </div>
  );
}

export default Client;
