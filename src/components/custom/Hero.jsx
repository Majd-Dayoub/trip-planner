import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center text-gray-900 mt-16">
        Personalize Your Next Trip with{" "}
        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          AI
        </span>
      </h1>
      <p className="text-xl text-gray-900 text-center">
        Your Personal Travel Assistant: custom itineraries tailored
        to your unique interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button >Get Started for Free Now</Button>
      </Link>
      
    </div>
  );
}

export default Hero;
