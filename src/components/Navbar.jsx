import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Briefcase } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  // Check if current path is dashboard/portal to hide login button
  const isDashboardOrPortal = () => {
    const currentPath = location.pathname.toLowerCase();
    return (
      currentPath.includes('/admindashboard') ||
      currentPath.includes('/brokerportal') ||
      currentPath.includes('/employerdashboard') ||
      currentPath.includes('/admin') ||
      currentPath.includes('/broker') ||
      currentPath.includes('/employer')
    );
  };

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
          
          {/* Only show login button if not on a dashboard/portal page */}
          {!isDashboardOrPortal() && (
            <div className="flex items-center">
              <button
                onClick={() => navigate("/login")}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out hover:shadow-md transform hover:-translate-y-1"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;