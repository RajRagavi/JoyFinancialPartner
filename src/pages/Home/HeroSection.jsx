import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Vector from "../../assets/Images/Vector.png";
import hero1 from "../../assets/Images/hero1.png";
import hero2 from "../../assets/Images/finance.PNG";
import hero3 from "../../assets/Images/Finance_management.PNG";
import Vector1 from "../../assets/Images/VectorIcon.png";
import Vector2 from "../../assets/Images/vector2.png";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between 
    min-h-screen px-4 sm:px-6 md:px-20 overflow-hidden bg-white mt-10">
      
      {/* Swiper Slider */}
      <div className="w-full max-w-full">
        <Swiper
          modules={[Autoplay]}
          navigation={false}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="w-full mb-10"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="flex flex-col-reverse md:flex-row items-center justify-between ">
              
              {/* Left Content */}
              <div className="text-center sm:text-left max-w-lg px-4 sm:px-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Get Your Dream Vehicle with Hassle-Free Loans!
                </h1>
                <p className="mt-4 text-gray-600">
                  Whether it’s a car or a bike, we offer flexible loan options with low interest rates and quick approvals.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="w-full sm:w-auto border-2 border-blue-500 text-blue-500 hover:text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition">
                    Contact Us
                  </button>
                </div>
                <p className="mt-4 text-blue-500 font-semibold">
                  Get up to 90% financing on your new vehicle!
                </p>
              </div>

              {/* Right - Image */}
              <div className="relative flex justify-center items-center w-full md:w-1/2">
                <img src={hero1} className="w-full max-w-[90%] sm:max-w-xs md:max-w-md object-contain" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSection;
