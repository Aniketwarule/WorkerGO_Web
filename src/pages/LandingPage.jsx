import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  Smartphone,
  Phone,
  TrendingUp,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Briefcase className="w-12 h-12 text-blue-600" />,
      title: "Post Jobs Easily",
      description: "Create and manage job postings with just a few clicks",
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Connect with Workers",
      description: "Find skilled workers that match your requirements",
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-blue-600" />,
      title: "Verified Workers",
      description: "All workers are verified through our broker network",
    },
  ];

  const stats = [
    {
      title: "Active Workers",
      value: "5,000+",
      icon: Users,
      description: "Skilled workers ready to work",
    },
    {
      title: "Jobs Completed",
      value: "25,000+",
      icon: Briefcase,
      description: "Successfully completed jobs",
    },
    {
      title: "Employers",
      value: "1,000+",
      icon: Building2,
      description: "Trusted companies hiring",
    },
    {
      title: "Success Rate",
      value: "95%",
      icon: TrendingUp,
      description: "Job completion rate",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const scaleVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animation */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-5xl font-bold mb-6"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              Connect with Skilled Workers
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            >
              WorkerGo connects employers with verified daily wage workers
              through a trusted network of brokers
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                onClick={() => navigate("/register")}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section with Animation */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white overflow-hidden shadow rounded-lg border border-gray-200"
                variants={itemVariants}
                whileHover={scaleVariants.hover}
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <motion.div
                      className="flex-shrink-0"
                      initial={{ scale: 0.5 }}
                      whileInView={{ rotate: 360, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </motion.div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.title}
                        </dt>
                        <dd className="flex items-baseline">
                          <motion.div
                            className="text-2xl font-semibold text-gray-900"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                          >
                            {stat.value}
                          </motion.div>
                        </dd>
                        <dd className="text-sm text-gray-500">
                          {stat.description}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* User Types Section with Animation */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Who We Serve
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg"
              variants={itemVariants}
              whileHover={scaleVariants.hover}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                viewport={{ once: true }}
              >
                <Briefcase className="w-12 h-12 text-blue-600 mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Employers</h3>
              <p className="text-gray-600">
                Post jobs and find reliable workers for your projects
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg"
              variants={itemVariants}
              whileHover={scaleVariants.hover}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
                viewport={{ once: true }}
              >
                <Users className="w-12 h-12 text-blue-600 mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Brokers</h3>
              <p className="text-gray-600">
                Register and manage workers without smartphones
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg"
              variants={itemVariants}
              whileHover={scaleVariants.hover}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                viewport={{ once: true }}
              >
                <ShieldCheck className="w-12 h-12 text-blue-600 mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Administrators</h3>
              <p className="text-gray-600">
                Oversee platform operations and ensure quality
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section with Animation */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Platform Features
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <motion.div
                  className="flex justify-center mb-4"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile App Section with Animation */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex-1"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Download Our Mobile App
              </h2>
              <p className="text-gray-600 mb-8">
                Get instant access to job opportunities and manage your
                workforce on the go
              </p>
              <div className="flex gap-4">
                <motion.button
                  className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2"
                  whileHover={{ scale: 1.05, backgroundColor: "#333" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Smartphone className="w-5 h-5" />
                  App Store
                </motion.button>
                <motion.button
                  className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2"
                  whileHover={{ scale: 1.05, backgroundColor: "#333" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Smartphone className="w-5 h-5" />
                  Play Store
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              className="flex-1"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=500"
                alt="Mobile App"
                className="rounded-lg shadow-xl"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.button
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1, backgroundColor: "#2563EB" }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2,
          }}
        >
          <Phone className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4">WorkerGo</h3>
              <p className="text-gray-400">
                Connecting workers with opportunities
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +1 (555) 123-4567
                </p>
                <p>support@workergo.com</p>
              </div>
            </motion.div>
          </motion.div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} WorkerGo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
