
import { motion } from "framer-motion";
import Mobile from "../../assets/Images/Mobile.png";
import Vector from "../../assets/Images/Vector.png";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-20 overflow-hidden bg-white ">
      
      {/* Background Circle with Animation */}
      <motion.img
       src={Vector}
        className="absolute top-15 left-1 w-44 h-44 md:w-60 md:h-60 "
        animate={{
          scale: [1, 1.1, 1], // Smooth scaling effect
          opacity: [0.8, 1, 0.8] // Slight opacity variation
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
              

      {/* Left Content */}
      <div className="z-10 text-center md:text-left max-w-lg mt-10 md:mt-0 ">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight   ">
          Your Financial <br /> Partner
        </h1>
        <p className="mt-4 text-gray-600">
          We know how large objects will act, but things on a small scale.
        </p>
        <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <button className="w-full md:w-auto border-2 border-blue-500 text-blue-500 hover:text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition">
              Get Quote Now
            </button>
            <button className="w-full md:w-auto border-2 border-blue-500 text-blue-500 hover:text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition">
              Learn More
            </button>
          </div>
        </div>

      {/* Mobile Image with Animation */}
      <div className="relative mt-10 md:mt-0 flex justify-center ">
      
         <motion.img
          src={Mobile}
          alt="Phone"
          className="relative z-10 w-full h-full md:w-full drop-shadow-xl rotate-[15deg]"
          animate={{
            rotate: [10, 0, -10, 10], // Smooth tilt effect
            y: [0, -10, 0], // Floating effect
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
     
      </div>
    </div>
  );
};

export default HeroSection;
