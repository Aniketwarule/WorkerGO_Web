import React, { useState, useEffect } from 'react';
import { Calendar, Users, Briefcase, CheckCircle, PlusCircle, Search } from 'lucide-react';

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverStats, setHoverStats] = useState(null);

  // Set isLoaded to true after component mounts for entrance animations
  useEffect(() => {
    setIsLoaded(true);
    // Add pulse animation to random stats periodically
    const interval = setInterval(() => {
      const randomStat = Math.floor(Math.random() * 4);
      setHoverStats(randomStat);
      setTimeout(() => setHoverStats(null), 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { title: 'Total Jobs Posted', value: '24', icon: Briefcase, color: 'bg-blue-500' },
    { title: 'Workers Hired', value: '156', icon: Users, color: 'bg-green-500' },
    { title: 'Active Jobs', value: '8', icon: Calendar, color: 'bg-yellow-500' },
    { title: 'Completed Jobs', value: '16', icon: CheckCircle, color: 'bg-purple-500' },
  ];

  const recentJobs = [
    {
      id: 1,
      title: 'Construction Workers Needed',
      location: 'Downtown Site',
      workers: 5,
      status: 'active',
      date: '2025-03-15',
    },
    {
      id: 2,
      title: 'Warehouse Loading Staff',
      location: 'East Industrial Park',
      workers: 3,
      status: 'completed',
      date: '2025-03-10',
    },
    // Add more jobs as needed
  ];

  const JobPostingForm = () => (
    <form className="space-y-6 bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium">Post New Job</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Job Title", type: "text" },
          { label: "Location", type: "text" },
          { label: "Required Skills", type: "text" },
          { label: "Number of Workers", type: "number" },
          { label: "Daily Wage (USD)", type: "number" },
          { label: "Start Date", type: "date" }
        ].map((field, index) => (
          <div 
            key={index} 
            className="form-field transform transition-all duration-500"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: 'slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
              animationDelay: `${index * 100}ms`
            }}
          >
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type={field.type}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
            />
          </div>
        ))}

        <div className="md:col-span-2 transform transition-all duration-500" 
          style={{ 
            animation: 'slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
            animationDelay: '600ms'
          }}>
          <label className="block text-sm font-medium text-gray-700">Additional Details</label>
          <textarea
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 hover:rotate-1 hover:shadow-lg"
        >
          Post Job
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Background animated gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 z-0 animate-gradient-bg"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className={`flex justify-between items-center mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'}`}>
          <h1 className="text-2xl font-semibold text-gray-900 relative">
            Employer Dashboard
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-600 transition-all duration-700 dashboard-title-underline"></span>
          </h1>
          <button
            onClick={() => setActiveTab('post')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
          >
            <PlusCircle className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-90" />
            Post New Job
          </button>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`bg-white overflow-hidden shadow rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${hoverStats === index ? 'animate-pulse' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => {
                const iconEl = document.getElementById(`stat-icon-${index}`);
                if (iconEl) iconEl.classList.add('animate-bounce');
              }}
              onMouseLeave={() => {
                const iconEl = document.getElementById(`stat-icon-${index}`);
                if (iconEl) iconEl.classList.remove('animate-bounce');
              }}
            >
              <div className="p-5 relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-opacity-10 transition-all duration-500 stat-circle" style={{ backgroundColor: stat.color.replace('bg-', '') }}></div>
                
                <div className="flex items-center relative z-10">
                  <div className={`flex-shrink-0 rounded-md p-3 ${stat.color} transform transition-all duration-300 hover:rotate-12`}>
                    <stat.icon id={`stat-icon-${index}`} className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500 truncate">{stat.title}</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900 transition-all duration-500 stat-counter" data-target={stat.value}>0</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white shadow rounded-lg transition-all duration-500 transform hover:shadow-xl">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('post')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'post'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Post Job
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-hidden">
            {activeTab === 'overview' ? (
              <div className="animate-fadeIn">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 relative inline-block">
                    Recent Job Postings
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded"></span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Job Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Workers
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentJobs.map((job, index) => (
                          <tr 
                            key={job.id} 
                            className="hover:bg-blue-50 transition-colors duration-200"
                            style={{ 
                              animation: 'slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
                              animationDelay: `${index * 150}ms` 
                            }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {job.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {job.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {job.workers}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full transition-all duration-300 ${
                                  job.status === 'active'
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                }`}
                              >
                                {job.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {job.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <JobPostingForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add CSS animations
const styles = document.createElement('style');
styles.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slide-in-bottom {
    0% { transform: translateY(20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slide-in-right {
    0% { transform: translateX(20px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes rotate-bg {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .animate-gradient-bg {
    background-size: 400% 400%;
    animation: rotate-bg 15s ease infinite;
  }
  
  .dashboard-title-underline {
    width: 70% !important;
  }
  
  /* Counter animation for stats */
  .stat-counter {
    opacity: 0;
    animation: fadeIn 0.5s ease-out forwards;
    animation-delay: 0.8s;
  }
  
  /* Hover effect for stat cards */
  .stat-circle {
    transform: scale(0);
    opacity: 0;
  }
  
  .bg-white:hover .stat-circle {
    transform: scale(1);
    opacity: 0.2;
  }
`;
document.head.appendChild(styles);

// Animation for number counting effect
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1500; // Animation duration in milliseconds
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = duration / frameRate;
    let frame = 0;
    
    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(progress * target);
      
      if (counter && counter.textContent !== undefined) {
        counter.textContent = currentCount;
      }
      
      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else if (counter) {
        counter.textContent = target;
      }
    };
    
    setTimeout(() => {
      animate();
    }, 1000); // Delay before starting animation
  });
};

// Run counter animations after component mounts
if (typeof window !== 'undefined') {
  window.addEventListener('load', animateCounters);
}

export default EmployerDashboard;