import React, { useState, useEffect } from 'react';
import { Calendar, Users, Briefcase, CheckCircle, PlusCircle, Search, X } from 'lucide-react';
import { baseUrl } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobWorkers, setJobWorkers] = useState([]);
  const [showWorkersModal, setShowWorkersModal] = useState(false);
  const [loadingWorkers, setLoadingWorkers] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    locality: '',
    startDate: '',
    totalDays: '',
    description: '',
    need: '',
    fullfilled: 0,
    salary: '',
    requiredSkills: [],
    isActive: true // Set active by default
  });

  useEffect(() => {
    // Fetch jobs when component mounts
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/emp/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  const fetchJobWorkers = async (jobId) => {
    setLoadingWorkers(true);
    try {
      // Assuming there's an endpoint to fetch workers for a specific job
      const response = await axios.get(`${baseUrl}/emp/job/${jobId}/workers`);
      setJobWorkers(response.data);
    } catch (error) {
      console.error("Failed to fetch job workers:", error);
      setJobWorkers([]); // Set empty array in case of error
    } finally {
      setLoadingWorkers(false);
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    fetchJobWorkers(job.id);
    setShowWorkersModal(true);
  };

  const closeWorkersModal = () => {
    setShowWorkersModal(false);
    setSelectedJob(null);
    setJobWorkers([]);
  };

  const stats = [
    { title: 'Total Jobs Posted', value: jobs.length.toString(), icon: Briefcase, color: 'bg-blue-500' },
    { title: 'Workers Hired', value: jobs.reduce((total, job) => total + job.fullfilled, 0).toString(), icon: Users, color: 'bg-green-500' },
    { title: 'Active Jobs', value: jobs.filter(job => job.isActive).length.toString(), icon: Calendar, color: 'bg-yellow-500' },
    { title: 'Completed Jobs', value: jobs.filter(job => !job.isActive).length.toString(), icon: CheckCircle, color: 'bg-purple-500' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillsChange = (e) => {
    setFormData({
      ...formData,
      requiredSkills: [e.target.value], // For now just use the single selected skill
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    // Validate required fields
    if (!formData.jobTitle) {
      setError("Job title is required");
      setIsLoading(false);
      return;
    }

    if (!formData.companyName) {
      setError("Company name is required");
      setIsLoading(false);
      return;
    }

    if (!formData.locality) {
      setError("Location is required");
      setIsLoading(false);
      return;
    }

    if (!formData.startDate) {
      setError("Start date is required");
      setIsLoading(false);
      return;
    }

    if (!formData.totalDays) {
      setError("Total days is required");
      setIsLoading(false);
      return;
    }

    if (!formData.need) {
      setError("Number of workers is required");
      setIsLoading(false);
      return;
    }

    if (!formData.salary) {
      setError("Salary is required");
      setIsLoading(false);
      return;
    }

    if (formData.requiredSkills.length === 0 || !formData.requiredSkills[0]) {
      setError("Required skills are required");
      setIsLoading(false);
      return;
    }

    if (!formData.description) {
      setError("Job description is required");
      setIsLoading(false);
      return;
    }

    try {
      const jobData = {
        ...formData,
        need: parseInt(formData.need),
        totalDays: parseInt(formData.totalDays),
        salary: parseFloat(formData.salary),
        isActive: true // Always set active when creating a new job
      };
      
      const res = await axios.post(`${baseUrl}/emp/createjob`, jobData);
      if (res.data) {
        // Reset form and refresh jobs
        setFormData({
          jobTitle: "",
          companyName: "",
          locality: "",
          startDate: "",
          totalDays: "",
          description: "",
          need: "",
          fullfilled: 0,
          salary: "",
          requiredSkills: [],
          isActive: true
        });
        
        // Switch to overview tab and refresh jobs
        setActiveTab('overview');
        fetchJobs();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to post job");
      console.error("Job posting error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Workers modal component
  const WorkersModal = () => {
    if (!showWorkersModal || !selectedJob) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              Workers for: {selectedJob.jobTitle} - {selectedJob.companyName}
            </h3>
            <button 
              onClick={closeWorkersModal}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {loadingWorkers ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : jobWorkers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No workers have accepted this job yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Worker Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobWorkers.map((worker) => (
                    <tr key={worker.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {worker.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {worker.phone || worker.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {worker.skills?.join(", ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {worker.experience || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Accepted
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-6 flex justify-end">
            <button 
              onClick={closeWorkersModal}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Employer Dashboard</h1>
          <button
            onClick={() => setActiveTab('post')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Post New Job
          </button>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500 truncate">{stat.title}</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white shadow rounded-lg">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('post')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
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
          <div className="p-6">
            {activeTab === 'overview' ? (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Job Postings</h3>
                  {jobs.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      <p>No jobs posted yet. Click on "Post Job" to create your first job listing.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Job Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Company
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Workers (Filled/Needed) 
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Start Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {jobs.map((job) => (
                            <tr 
                              key={job.id} 
                              onClick={() => handleJobClick(job)}
                              className="cursor-pointer hover:bg-gray-50"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {job.jobTitle}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {job.companyName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {job.locality}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {job.workers.length}/{job.need}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    job.isActive
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {job.isActive ? 'active' : 'completed'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(job.startDate).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <form className="space-y-6 bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium">Post New Job</h3>
                
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="e.g. Construction Worker, Electrician"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g. L&T Construction"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      name="locality"
                      value={formData.locality}
                      onChange={handleInputChange}
                      placeholder="e.g. Downtown Site, East Industrial Park"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Required Skills</label>
                    <select
                      name="requiredSkills"
                      value={formData.requiredSkills[0] || ''}
                      onChange={handleSkillsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select a job role</option>
                      {[
    'Construction', 'Plumbing', 'Electrical', 'Painting', 'Carpentry', 
    'Masonry', 'Tiling', 'Roofing', 'Landscaping', 'Welding', 
    'HVAC', 'Flooring', 'Drywall', 'Concrete Work', 'Cabinet Making',
    'Glazing', 'Insulation', 'Demolition', 'Fence Installation', 'Window Installation',
    'Appliance Repair', 'Paving', 'Bricklaying', 'Stucco Work', 'Siding Installation'].map((skill) => (
                        <option key={skill} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Workers</label>
                    <input
                      type="number"
                      name="need"
                      value={formData.need}
                      onChange={handleInputChange}
                      placeholder="e.g. 5"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Daily Wage (USD)</label>
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="e.g. 200"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Days</label>
                    <input
                      type="number"
                      name="totalDays"
                      value={formData.totalDays}
                      onChange={handleInputChange}
                      placeholder="e.g. 30"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Job Description</label>
                    <textarea
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe job responsibilities, requirements, working hours, etc."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isLoading ? 'Posting...' : 'Post Job'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Workers Modal */}
      <WorkersModal />
    </div>
  );
};

export default EmployerDashboard;