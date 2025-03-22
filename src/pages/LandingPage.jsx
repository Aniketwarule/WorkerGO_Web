import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, ShieldCheck, ArrowRight, Smartphone, Phone, TrendingUp, Building2 } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Briefcase className="w-12 h-12 text-blue-600" />,
      title: 'Post Jobs Easily',
      description: 'Create and manage job postings with just a few clicks',
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: 'Connect with Workers',
      description: 'Find skilled workers that match your requirements',
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-blue-600" />,
      title: 'Verified Workers',
      description: 'All workers are verified through our broker network',
    },
  ];

  const stats = [
    {
      title: 'Active Workers',
      value: '5,000+',
      icon: Users,
      description: 'Skilled workers ready to work',
    },
    {
      title: 'Jobs Completed',
      value: '25,000+',
      icon: Briefcase,
      description: 'Successfully completed jobs',
    },
    {
      title: 'Employers',
      value: '1,000+',
      icon: Building2,
      description: 'Trusted companies hiring',
    },
    {
      title: 'Success Rate',
      value: '95%',
      icon: TrendingUp,
      description: 'Job completion rate',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Connect with Skilled Workers</h1>
            <p className="text-xl mb-8">
              WorkerGo connects employers with verified daily wage workers through a trusted network of brokers
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden shadow rounded-lg border border-gray-200"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.title}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {stat.value}
                          </div>
                        </dd>
                        <dd className="text-sm text-gray-500">{stat.description}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Types Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Who We Serve</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Briefcase className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Employers</h3>
              <p className="text-gray-600">Post jobs and find reliable workers for your projects</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Brokers</h3>
              <p className="text-gray-600">Register and manage workers without smartphones</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <ShieldCheck className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Administrators</h3>
              <p className="text-gray-600">Oversee platform operations and ensure quality</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile App Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6">Download Our Mobile App</h2>
              <p className="text-gray-600 mb-8">
                Get instant access to job opportunities and manage your workforce on the go
              </p>
              <div className="flex gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  App Store
                </button>
                <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Play Store
                </button>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=500"
                alt="Mobile App"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">WorkerGo</h3>
              <p className="text-gray-400">Connecting workers with opportunities</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +1 (555) 123-4567
                </p>
                <p>support@workergo.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} WorkerGo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;