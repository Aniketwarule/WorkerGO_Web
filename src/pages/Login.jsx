import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import axios from 'axios';
import { baseUrl } from '../App';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState("employer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const payload = {
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe,
    };

    try {
      // Fix 1: Backend routes use GET not POST
      // Fix 2: Pass payload as query params for GET request
      let response;
      if (userType === 'broker') {
        response = await axios.get(`${baseUrl}/emp/brokerlogin`, { params: payload });
        login({
          email: formData.email,
          role: "broker",
        });
        navigate('/broker');
      } else if (userType === 'employer') {
        response = await axios.get(`${baseUrl}/emp/employerlogin`, { params: payload });
        login({
          email: formData.email,
          role: "employer",
        });
        navigate('/employer');
      } else if (userType === 'admin') {
        // Implement admin login if needed
        // For now, just redirect
        login({
          email: formData.email,
          role: "admin",
        });
        navigate('/admin');
      }

      // Display success message
      console.log("Login successful:", response?.data);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.97,
    },
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
    exit: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="sm:mx-auto sm:w-full sm:max-w-md"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
          >
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to WorkerGo
            </h2>
          </motion.div>

          <motion.div
            className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 50,
                delay: 0.3,
                duration: 0.5,
              }}
            >
              {/* User Type Selection */}
              <motion.div className="mb-6" variants={itemVariants}>
                <div className="grid grid-cols-3 gap-3">
                  {["employer", "broker", "admin"].map((type) => (
                    <motion.button
                      key={type}
                      type="button"
                      className={`
                        py-2 px-4 text-sm font-medium rounded-md capitalize
                        ${
                          userType === type
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        }
                      `}
                      onClick={() => setUserType(type)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay:
                          0.5 + ["employer", "broker", "admin"].indexOf(type) * 0.1,
                      }}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.form
                className="space-y-6"
                onSubmit={handleSubmit}
                variants={containerVariants}
              >
                {error && (
                  <motion.div
                    className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md"
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <motion.div
                      className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
                    >
                      <Mail className="h-5 w-5 text-gray-400" />
                    </motion.div>
                    <motion.input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="you@example.com"
                      whileFocus={{
                        scale: 1.01,
                        boxShadow: "0px 0px 4px rgba(59, 130, 246, 0.5)",
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <motion.div
                      className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
                    >
                      <Lock className="h-5 w-5 text-gray-400" />
                    </motion.div>
                    <motion.input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="••••••••"
                      whileFocus={{
                        scale: 1.01,
                        boxShadow: "0px 0px 4px rgba(59, 130, 246, 0.5)",
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between"
                  variants={itemVariants}
                >
                  <div className="flex items-center">
                    <motion.input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <motion.a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Forgot your password?
                    </motion.a>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    variants={buttonVariants}
                    whileHover={isLoading ? {} : "hover"}
                    whileTap={isLoading ? {} : "tap"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.span
                      className="flex items-center"
                      animate={isLoading ? {} : { x: [0, 3, 0] }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 1.5,
                        repeatDelay: 1,
                      }}
                    >
                      {isLoading ? "Signing in..." : "Sign in"} 
                      {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </motion.span>
                  </motion.button>
                </motion.div>

                <motion.div className="text-sm text-center" variants={itemVariants}>
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <motion.button
                      type="button"
                      onClick={() => navigate("/register")}
                      className="font-medium text-blue-600 hover:text-blue-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Register now
                    </motion.button>
                  </p>
                </motion.div>
              </motion.form>
            </motion.div>
          </motion.div>

          {/* Animated background elements */}
          <motion.div
            className="absolute top-10 left-20 w-24 h-24 rounded-full bg-blue-100 opacity-40"
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-blue-200 opacity-40"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <motion.div
            className="absolute top-1/2 right-36 w-16 h-16 rounded-full bg-blue-300 opacity-30"
            animate={{
              x: [0, 15, 0],
              y: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;