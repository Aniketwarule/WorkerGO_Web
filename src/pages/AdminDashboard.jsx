import React, { useState, useEffect } from "react";
import {
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  Settings,
  Search,
  Download,
  AlertCircle,
  FileText,
} from "lucide-react";
import axios from "axios";
import { baseUrl } from "../App";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [statsData, setStatsData] = useState({
    totalWorkers: 0,
    totalEmployers: 0,
    totalBrokers: 0,
    totalJobs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/admin/stats`);
        setStatsData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load statistics. Please try again later.");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total Employers",
      value: loading ? "..." : statsData.totalEmployers,
      change: "+12%",
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      title: "Total Workers",
      value: loading ? "..." : statsData.totalWorkers,
      change: "+23%",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Active Brokers",
      value: loading ? "..." : statsData.totalBrokers,
      change: "+8%",
      icon: Briefcase,
      color: "bg-yellow-500",
    },
    {
      title: "Jobs Posted",
      value: loading ? "..." : statsData.totalJobs,
      change: "+15%",
      icon: FileText,
      color: "bg-purple-500",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "registration",
      description: "New employer registered: Tech Solutions Inc.",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "job",
      description: "New job posted: Construction workers needed",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "broker",
      description: "Broker John Smith added 5 new workers",
      time: "6 hours ago",
    },
    // Add more activities as needed
  ];

  const SystemSettings = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h3 className="text-lg font-medium mb-4">Platform Settings</h3>
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600" />
              <span className="ml-2">Enable email notifications</span>
            </label>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600" />
              <span className="ml-2">Require ID verification for workers</span>
            </label>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600" />
              <span className="ml-2">Auto-approve job postings</span>
            </label>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h3 className="text-lg font-medium mb-4">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              API Key
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                readOnly
                value="sk_test_123456789"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Regenerate
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Dashboard
          </h1>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-5 w-5 mr-2" />
              Export Data
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </motion.button>
          </div>
        </motion.div>

        {/* Statistics Grid */}
        {error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8"
          >
            <p>{error}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-white overflow-hidden shadow rounded-lg w-full"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <motion.div
                      initial={{ rotate: -10, scale: 0.9 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1 + index * 0.1,
                      }}
                      className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </p>
                      <div className="flex items-baseline">
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="text-2xl font-semibold text-gray-900"
                        >
                          {stat.value}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="ml-2 flex items-baseline text-sm font-semibold text-green-600"
                        >
                          {stat.change}
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow rounded-lg"
        >
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() => setActiveTab("users")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "users"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                User Management
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() => setActiveTab("settings")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "settings"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Settings
              </motion.button>
            </nav>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              {activeTab === "overview" ? (
                <div className="space-y-6">
                  {/* Platform Health */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white p-6 rounded-lg shadow"
                    >
                      <h3 className="text-lg font-medium mb-4">
                        System Health
                      </h3>
                      <div className="space-y-4">
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-500">
                            Server Status
                          </span>
                          <span className="flex items-center text-green-600">
                            <motion.span
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                repeat: Infinity,
                                repeatDelay: 2,
                                duration: 1,
                              }}
                              className="h-2.5 w-2.5 rounded-full bg-green-600 mr-2"
                            ></motion.span>
                            Operational
                          </span>
                        </motion.div>
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-500">
                            API Health
                          </span>
                          <span className="flex items-center text-green-600">
                            <motion.span
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                repeat: Infinity,
                                repeatDelay: 3,
                                duration: 1,
                              }}
                              className="h-2.5 w-2.5 rounded-full bg-green-600 mr-2"
                            ></motion.span>
                            100%
                          </span>
                        </motion.div>
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-500">
                            Database Status
                          </span>
                          <span className="flex items-center text-green-600">
                            <motion.span
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                repeat: Infinity,
                                repeatDelay: 4,
                                duration: 1,
                              }}
                              className="h-2.5 w-2.5 rounded-full bg-green-600 mr-2"
                            ></motion.span>
                            Connected
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white p-6 rounded-lg shadow"
                    >
                      <h3 className="text-lg font-medium mb-4">Alerts</h3>
                      <div className="space-y-4">
                        <motion.div
                          initial={{ x: 10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-start"
                        >
                          <motion.div
                            animate={{
                              rotate: [0, 5, 0, -5, 0],
                            }}
                            transition={{
                              repeat: Infinity,
                              repeatDelay: 5,
                              duration: 1,
                            }}
                          >
                            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                          </motion.div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              High Job Demand
                            </p>
                            <p className="text-sm text-gray-500">
                              Construction worker demand up 25% this week
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Recent Activity */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-6 rounded-lg shadow"
                  >
                    <h3 className="text-lg font-medium mb-4">
                      Recent Activity
                    </h3>
                    <div className="flow-root">
                      <ul className="-mb-8">
                        {recentActivity.map((activity, index) => (
                          <motion.li
                            key={activity.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <div className="relative pb-8">
                              {index !== recentActivity.length - 1 && (
                                <span
                                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                  aria-hidden="true"
                                />
                              )}
                              <div className="relative flex space-x-3">
                                <motion.div
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                  }}
                                >
                                  <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-white" />
                                  </span>
                                </motion.div>
                                <motion.div
                                  className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5"
                                  whileHover={{ x: 3 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                  }}
                                >
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      {activity.description}
                                    </p>
                                  </div>
                                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                    {activity.time}
                                  </div>
                                </motion.div>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              ) : activeTab === "settings" ? (
                <SystemSettings />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* User Management content would go here */}
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <motion.div
                        initial={{ x: -10 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex-1 relative"
                      >
                        <input
                          type="text"
                          placeholder="Search users..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </motion.div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ x: 10 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Add User
                      </motion.button>
                    </div>

                    {/* User table would go here */}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
