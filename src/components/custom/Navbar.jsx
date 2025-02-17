import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Navbar() {
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <Link to={"/"}>
        <div className="flex justify-between">
          <img className="w-16 h-auto" src="/plane-logo.svg" alt="Logo" />
          <h1 className="font-extrabold text-[40px] text-center text-gray-900 mt-1 ml-3">
            Trip Buddy
          </h1>
        </div>
      </Link>
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  );
}

export default Navbar;
