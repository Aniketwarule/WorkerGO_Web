import React, { useState, useEffect } from "react";
import { Users, UserPlus, Search, Filter, CheckCircle2 } from "lucide-react";

const BrokerPortal = () => {
  const [activeTab, setActiveTab] = useState("workers");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Set isLoaded to true after component mounts for entrance animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const workers = [
    {
      id: 1,
      name: "Jayesh",
      phone: "9864456788",
      skills: ["Construction", "plumbing"],
      experience: "3 years",
      status: "available",
      location: "Pune",
    },
    {
      id: 2,
      name: "Adi",
      phone: "98765434567",
      skills: ["Construction", "Plumbing"],
      experience: "2 years",
      status: "hired",
      location: "Pune",
    },
    // Add more workers as needed
  ];

  const WorkerRegistrationForm = () => (
    <form className="space-y-6 bg-white p-6 rounded-lg shadow transition-all duration-500 transform animate-fadeIn">
      <h3 className="text-lg font-medium">Register New Worker</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Skills
          </label>
          <input
            type="text"
            placeholder="Separate skills with commas"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience Level
          </label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300">
            <option>Beginner (0-2 years)</option>
            <option>Intermediate (2-5 years)</option>
            <option>Expert (5+ years)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Preferred Job Types
          </label>
          <input
            type="text"
            placeholder="E.g., Construction, Painting"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location/Area
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Availability
          </label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300">
            <option>Immediate</option>
            <option>Within 1 week</option>
            <option>Within 2 weeks</option>
            <option>Custom date</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            ID Verification
          </label>
          <input
            type="file"
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Register Worker
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={`flex justify-between items-center mb-8 transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-2xl font-semibold text-gray-900">
            Broker Portal
          </h1>
          <button
            onClick={() => setActiveTab("register")}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Register New Worker
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Total Workers",
              value: 45,
              icon: Users,
              color: "bg-blue-500",
              delay: "0",
            },
            {
              title: "Currently Employed",
              value: 32,
              icon: CheckCircle2,
              color: "bg-green-500",
              delay: "100",
            },
            {
              title: "Available Workers",
              value: 13,
              icon: Users,
              color: "bg-yellow-500",
              delay: "200",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-white overflow-hidden shadow rounded-lg transform transition-all duration-500 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${stat.delay}ms` }}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div
                    className={`flex-shrink-0 ${stat.color} rounded-md p-3 transition-transform duration-300 hover:scale-110`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500 truncate">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white shadow rounded-lg transition-all duration-500 transform">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("workers")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === "workers"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Workers List
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === "register"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Register Worker
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-hidden">
            {activeTab === "workers" ? (
              <div className="animate-fadeIn">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search workers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                    <Filter className="h-5 w-5 mr-2" />
                    Filter
                  </button>
                </div>

                {/* Workers Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Worker
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Skills
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Experience
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {workers.map((worker, index) => (
                        <tr
                          key={worker.id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {worker.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {worker.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {worker.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 transition-all duration-300 hover:bg-blue-200"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {worker.experience}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full transition-all duration-300 ${
                                worker.status === "available"
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              }`}
                            >
                              {worker.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {worker.location}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <WorkerRegistrationForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add CSS animations
const styles = document.createElement("style");
styles.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(styles);

export default BrokerPortal;
