import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Building2, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { baseUrl } from '../App';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("employer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    phone: "",
    userType: 'employer'
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const payload = {
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      userType,
      ...(userType === 'employer' ? { companyName: formData.companyName } : { name: formData.name })
    };

    try {
      if (userType === 'broker') {
        await axios.post(`${baseUrl}/emp/registerBroker`, payload);
      } else {
        await axios.post(`${baseUrl}/emp/register`, payload);
      }
      navigate('/login');
    } catch (err) {
      console.log('Registration error:', err.response?.data);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const errorVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const companyFieldVariants = {
    hidden: { height: 0, opacity: 0, marginTop: 0, marginBottom: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      marginTop: 24,
      marginBottom: 24,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      marginTop: 0,
      marginBottom: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Update userType in formData when it changes
  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      userType
    }));
  }, [userType]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <motion.div
          className="sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </motion.div>

        <motion.div
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* User Type Selection */}
            <div className="mb-6">
              <motion.div
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`py-2 px-4 text-sm font-medium rounded-md capitalize
                    ${
                      userType === "employer"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  onClick={() => setUserType("employer")}
                >
                  <Building2 className="inline-block h-5 w-5 mr-2" />
                  Employer
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`py-2 px-4 text-sm font-medium rounded-md capitalize
                    ${
                      userType === "broker"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  onClick={() => setUserType("broker")}
                >
                  <Briefcase className="inline-block h-5 w-5 mr-2" />
                  Broker
                </motion.button>
              </motion.div>
            </div>

            <motion.form
              className="space-y-6"
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md"
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    key="error-message"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {userType === 'employer' && (
                <motion.div
                  variants={companyFieldVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="company-field"
                  className="overflow-hidden"
                >
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </motion.div>
              )}

              {userType === 'broker' && (
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Broker Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
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
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., 1234567890"
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
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Registering...' : 'Register'}
                </motion.button>
              </motion.div>

              <motion.div className="text-sm text-center" variants={itemVariants}>
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate("/login")}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign in
                  </motion.button>
                </p>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;

