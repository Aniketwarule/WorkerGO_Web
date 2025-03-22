import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div
            className="flex items-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => navigate("/")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Briefcase
              className={`h-8 w-8 transition-all duration-300 ease-in-out ${
                isHovered ? "text-blue-700 rotate-12" : "text-blue-600"
              }`}
            />
            <span className="ml-2 text-xl font-bold text-gray-900 transition-colors duration-300 ease-in-out hover:text-blue-600">
              WorkerGO
            </span>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => navigate("/login")}
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out hover:shadow-md transform hover:-translate-y-1"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
