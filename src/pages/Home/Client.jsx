import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Image1 from "../../assets/Images/client1.jpeg";
import Image2 from "../../assets/Images/client2.jpeg";
import Image3 from "../../assets/Images/client3.jpeg";

function Client() {

    const clientReviews = [
        { name: "Regina Miles", role: "Designer", rating: 4, image: Image1 },
        { name: "John Doe", role: "Developer", rating: 4.5, image: Image2 },
        { name: "Sophia Adams", role: "Manager", rating: 4, image: Image3 },
      ];
    
      
      const StarRating = ({ rating }) => (
        <div className="flex">
          {[...Array(5)].map((_, i) =>
            rating > i + 0.5 ? (
              <FaStar key={i} className="text-yellow-400" />
            ) : (
              <FaStarHalfAlt key={i} className="text-yellow-400" />
            )
          )}
        </div>
      );
  return (
    <div>
        
      {/* Client Reviews Section */}
      <div className="text-center py-10 bg-gray-100">
        <h2 className="text-3xl font-bold">What Clients Say</h2>
        <p className="mt-3 text-gray-600 max-w-lg mx-auto">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 md:px-20 gap-6">
          {clientReviews.map(({ name, role, image, rating }, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <StarRating rating={rating} />
              <p className="text-gray-600 mt-2 text-justify">
                Slate helps you see how many more days you need to work to reach
                your financial goal.
              </p>
              <div className="flex items-center mt-4">
                <img
                  src={image}
                  alt={name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold">{name}</h3>
                  <p className="text-gray-500">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest News Section */}
      <div className="text-center py-10">
        <h2 className="text-3xl font-bold">Latest News</h2>
        <p className="mt-3 text-gray-600 max-w-lg mx-auto">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics.
        </p>
      </div>

    </div>
  )
}

export default Client