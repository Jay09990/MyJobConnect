import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { FaBriefcase, FaUsers, FaCheckCircle, FaClock } from 'react-icons/fa';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import PostJob from './PostJob';
import './CompanyDashboard.css';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('jobs');
  const [showPostJob, setShowPostJob] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample data (replace with actual API calls)
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Remote',
      salary: '$80,000 - $100,000',
      status: 'active',
      applications: 12
    },
    {
      id: 2,
      title: 'UX Designer',
      department: 'Design',
      type: 'Contract',
      location: 'New York',
      salary: '$70,000 - $90,000',
      status: 'closed',
      applications: 8
    },
    {
      id: 3,
      title: 'Software Engineer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Remote',
      salary: '$80,000 - $120,000',
      status: 'active',
      applications: 45
    },
    {
      id: 4,
      title: 'Product Manager',
      department: 'Product',
      type: 'Full-time',
      location: 'New York, NY',
      salary: '$100,000 - $150,000',
      status: 'active',
      applications: 32
    },
    {
      id: 5,
      title: 'UI/UX Designer',
      department: 'Design',
      type: 'Full-time',
      location: 'San Francisco, CA',
      salary: '$90,000 - $130,000',
      status: 'closed',
      applications: 28
    }
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      candidateName: 'John Doe',
      position: 'Frontend Developer',
      college: 'MIT',
      experience: '2 years',
      education: 'B.Tech in Computer Science',
      skills: ['React', 'JavaScript', 'CSS'],
      status: 'pending'
    },
    {
      id: 2,
      candidateName: 'Jane Smith',
      position: 'UX Designer',
      college: 'Stanford',
      experience: '3 years',
      education: 'M.S. in HCI',
      skills: ['Figma', 'User Research', 'Prototyping'],
      status: 'shortlisted'
    },
    {
      id: 3,
      candidateName: 'Mike Johnson',
      position: 'Software Engineer',
      college: 'RISD',
      experience: '2 years',
      education: 'B.F.A. Design',
      skills: ['Figma', 'Adobe XD', 'Sketch'],
      status: 'rejected'
    }
  ]);

  // Calculate dashboard stats
  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(job => job.status === 'active').length,
    totalApplications: applications.length,
    shortlisted: applications.filter(app => app.status === 'shortlisted').length
  };

  // Filter and search functions
  const filterJobs = (jobs) => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  const filterApplications = (applications) => {
    return applications.filter(app => {
      const matchesSearch = app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.college.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  // Action handlers
  const handleViewJob = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      // Show job details modal
      console.log('View job:', job);
    }
  };

  const handleEditJob = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      // Show edit job modal
      console.log('Edit job:', job);
    }
  };

  const handleCloseJob = (jobId) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId 
          ? { ...job, status: 'closed' }
          : job
      )
    );
  };

  const handlePostJob = (jobData) => {
    const newJob = {
      id: jobs.length + 1,
      ...jobData,
      status: 'active',
      applications: 0
    };
    setJobs(prevJobs => [...prevJobs, newJob]);
    setShowPostJob(false);
  };

  const handleViewApplication = (applicationId) => {
    const application = applications.find(a => a.id === applicationId);
    if (application) {
      // Show application details modal
      console.log('View application:', application);
    }
  };

  const handleShortlistApplication = (applicationId) => {
    setApplications(prevApps => 
      prevApps.map(app => 
        app.id === applicationId 
          ? { ...app, status: 'shortlisted' }
          : app
      )
    );
  };

  const handleRejectApplication = (applicationId) => {
    setApplications(prevApps => 
      prevApps.map(app => 
        app.id === applicationId 
          ? { ...app, status: 'rejected' }
          : app
      )
    );
  };

  // Filter the data
  const filteredJobs = filterJobs(jobs);
  const filteredApplications = filterApplications(applications);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Breadcrumb />
        <div className="company-dashboard">
          <div className="dashboard-header">
            <div className="welcome-section">
              <h1>Welcome, {user?.companyName}</h1>
              <p>Manage your job postings and applications</p>
            </div>
            <button className="post-job-btn" onClick={() => setShowPostJob(true)}>
              <i className="bi bi-plus-lg"></i> Post New Job
            </button>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon bg-blue">
                <FaBriefcase />
              </div>
              <div className="stat-info">
                <h3>{stats.totalJobs}</h3>
                <p>Total Jobs</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-green">
                <FaCheckCircle />
              </div>
              <div className="stat-info">
                <h3>{stats.activeJobs}</h3>
                <p>Active Jobs</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-purple">
                <FaUsers />
              </div>
              <div className="stat-info">
                <h3>{stats.totalApplications}</h3>
                <p>Total Applications</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-orange">
                <FaClock />
              </div>
              <div className="stat-info">
                <h3>{stats.shortlisted}</h3>
                <p>Shortlisted</p>
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="content-header">
              <div className="tab-buttons">
                <button 
                  className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('jobs')}
                >
                  Posted Jobs
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('applications')}
                >
                  Applications
                </button>
              </div>
            </div>

            <div className="section-header">
              <div className="search-box">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select 
                className="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                {activeTab === 'jobs' ? (
                  <>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                  </>
                ) : (
                  <>
                    <option value="pending">Pending</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </>
                )}
              </select>
            </div>

            {activeTab === 'jobs' ? (
              <div className="jobs-table">
                <table>
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Department</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Applications</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map(job => (
                      <tr key={job.id}>
                        <td>{job.title}</td>
                        <td>{job.department}</td>
                        <td>{job.type}</td>
                        <td>{job.location}</td>
                        <td>{job.applications}</td>
                        <td>
                          <span className={`status-badge ${job.status}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="actions">
                          <button 
                            className="action-btn" 
                            title="View Details"
                            onClick={() => handleViewJob(job.id)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button 
                            className="action-btn" 
                            title="Edit"
                            onClick={() => handleEditJob(job.id)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            className="action-btn" 
                            title="Close Job"
                            onClick={() => handleCloseJob(job.id)}
                          >
                            <i className="bi bi-x-circle"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="applications-table">
                <table>
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Position</th>
                      <th>College</th>
                      <th>Experience</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map(app => (
                      <tr key={app.id}>
                        <td>{app.candidateName}</td>
                        <td>{app.position}</td>
                        <td>{app.college}</td>
                        <td>{app.experience}</td>
                        <td>
                          <span className={`status-badge ${app.status}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="actions">
                          <button 
                            className="action-btn" 
                            title="View Details"
                            onClick={() => handleViewApplication(app.id)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button 
                            className="action-btn success" 
                            title="Shortlist"
                            onClick={() => handleShortlistApplication(app.id)}
                          >
                            <i className="bi bi-check-circle"></i>
                          </button>
                          <button 
                            className="action-btn danger" 
                            title="Reject"
                            onClick={() => handleRejectApplication(app.id)}
                          >
                            <i className="bi bi-x-circle"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPostJob && (
        <PostJob 
          isOpen={showPostJob}
          onClose={() => setShowPostJob(false)}
          onSubmit={handlePostJob}
        />
      )}
    </div>
  );
};

export default CompanyDashboard;
