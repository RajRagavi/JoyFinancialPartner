import { hover, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Mobile from "../../assets/Images/Mobile.png";
import Vector from "../../assets/Images/Vector.png";
import hero1 from "../../assets/Images/hero1.png";
import hero2 from "../../assets/Images/hero2.png";
import hero3 from "../../assets/Images/hero3.png";
import Vector1 from "../../assets/Images/vector1.png";
import Vector2 from "../../assets/Images/vector2.png";


const HeroSection = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between 
    min-h-screen px-6 md:px-20 overflow-hidden bg-white">
      {/* Background Circle with Animation */}
      <motion.img
        src={Vector}
        className="absolute top-15 left-1 w-44 h-44 md:w-60 md:h-60 mt-20"
        animate={{
          scale: [1, 1.1, 1], // Smooth scaling effect
          opacity: [0.8, 1, 1] // Slight opacity variation
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.img
        src={Vector1}
        className="absolute bottom-70 right-90 w-64 h-64 md:w-84 md:h-80 mt-20"
        animate={{
          scale: [1, 1.1, 1], // Smooth scaling effect
          opacity: [0.8, 1, 1] // Slight opacity variation
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.img
        src={Vector2}
        className="absolute top-20 right-30 w-64 h-64 md:w-84 md:h-80 mt-20"
        animate={{
          scale: [1, 1.1, 1], // Smooth scaling effect
          opacity: [0.8, 1, 1] // Slight opacity variation
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Swiper Slider */}
      <div className="w-full max-w-6xl">
        <Swiper
          modules={[ Autoplay]}
          navigation={false}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="w-full mb-40"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="flex flex-col-reverse md:flex-row items-center justify-between ">
              {/* Left Content */}
              <div className="text-center md:text-left max-w-lg">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Get Your Dream Vehicle with Hassle-Free Loans!
                </h1>
                <p className="mt-4 text-gray-600">
                Whether it’s a car or a bike, we offer flexible loan options with low interest rates and quick approvals.
                </p>
                <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <button className="w-full md:w-auto border-2 border-blue-500 text-blue-500 hover:text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition">
                    Apply Now
                  </button>
                </div>
                <p className="mt-4 text-blue-500 font-semibold">
                  Get up to 90% financing on your new vehicle!
                  </p>
              </div>

              {/* Right - Image */}
              <div className="relative flex justify-center items-center w-full md:w-1/2">
                <img
                  src={hero1}
                  alt="Phone"
                  className="w-full max-w-[350px] md:max-w-[400px] rounded-xl drop-shadow-xl object-cover"
                  />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="flex flex-col-reverse md:flex-row items-center justify-between">
              {/* Left Content */}
              <div className="text-center md:text-left max-w-lg">
                <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                Turn Your Gold into Instant Cash!
               </h1>
                <p className="mt-4 text-gray-600">
                Secure a high-value loan against your gold with our trusted financing solutions. Safe, quick, and hassle-free.
                </p>
                <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <button className="w-full md:w-auto border-2 border-blue-500 text-blue-500 hover:text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition">
                    Get Loan Now
                  </button>
                </div>
                <p className="mt-4 text-blue-500 font-semibold">
                No hidden charges! Get the best value for your gold today!
                </p>
              </div>

              {/* Right - Image */}
              <div className="relative flex justify-center items-center w-full md:w-1/2">
                <img
                  src={hero2}
                  alt="Phone"
                  className="w-full max-w-[350px] md:max-w-[400px] rounded-xl drop-shadow-xl object-cover"
                  
                />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="flex flex-col-reverse md:flex-row items-center justify-between">
              {/*Left content */}
              <div className="text-center md:text-left max-w-lg">
                <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                Trusted Financial Partner for Your Needs
                </h1>
                <p className="mt-4 text-gray-500">
                With years of experience in the financial sector, we provide reliable and transparent loan solutions tailored for you.
                </p>
                <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <button className="w-full md:w-auto border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 rounded-full px-6 py-4 transition shadow-lg">
                    Know More</button>
                </div>
                <p className="mt-4 text-blue-500 font-semibold">
                  Your trusted partner for financial growth!</p>
              </div>

              {/* Right - Image */}
              <div className="relative flex justify-center items-center w-full md:w-1/2">
                <img
                src={hero3}
                alt="Phone"
                className="w-full max-w-[350px] md:max-w-[400px] rounded-xl drop-shadow-xl object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSection;