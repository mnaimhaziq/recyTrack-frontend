import React from "react";
import { useNavigate } from "react-router-dom";
import Typed from "react-typed";
import CustomButton from "../../components/CustomButton";

const HomeHero = () => {
  
  const navigate = useNavigate();
  const RegisterNavigationLink = () => {
    navigate("/register");
  };

  return (
    <div className="text-white">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#00df9a] font-bold p-2">
        RECYCLING TRACKING SYSTEM
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          Empowering a Sustainable Future.
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
            Track your progress for
          </p>
          <Typed
            className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
            strings={["Plastic", "Glass", "Paper", "Metal", "Electronics"]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500">
          Monitor your recycling efforts and contribute to a greener planet.
        </p>
        <div className="text-black">
        <button className="bg-[#00df9a] hover:bg-transparent border-2 border-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 hover:text-[#00df9a] "  onClick={RegisterNavigationLink}>
          Get Started
        </button>
        </div>
      
      
      </div>
    </div>
  );
};

export default HomeHero;
