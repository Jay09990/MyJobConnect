/**
 * College Dashboard Component
 * 
 * Features:
 * - Student directory
 * - Request management
 * - College settings
 * - Stats overview
 */

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { FaUserGraduate, FaClipboardList, FaCheckCircle, FaUserPlus } from 'react-icons/fa';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import './CollegeDashboard.css';

const CollegeDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample data (replace with API calls)
  const [students] = useState([
    {
      id: 1,
      name: 'John Doe',
      rollNumber: 'CS2021001',
      branch: 'Computer Science',
      year: '3rd Year',
      gpa: '3.8',
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      rollNumber: 'CS2021002',
      branch: 'Computer Science',
      year: '3rd Year',
      gpa: '3.9',
      status: 'active'
    }
  ]);

  const [requests] = useState([
    {
      id: 1,
      studentName: 'Alice Johnson',
      type: 'Profile Update',
      details: 'Request to update branch information',
      status: 'pending'
    },
    {
      id: 2,
      studentName: 'Bob Wilson',
      type: 'Document Verification',
      details: 'Request for transcript verification',
      status: 'pending'
    }
  ]);

  // Calculate dashboard stats
  const stats = {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.status === 'active').length,
    totalRequests: requests.length,
    pendingRequests: requests.filter(r => r.status === 'pending').length
  };

  // Filter functions
  const filterStudents = (students) => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.branch.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  const filterRequests = (requests) => {
    return requests.filter(request => {
      const matchesSearch = request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          request.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  // Handle request actions
  const handleAcceptRequest = (requestId) => {
    // API call to accept request
    console.log('Accept request:', requestId);
  };

  const handleDeclineRequest = (requestId) => {
    // API call to decline request
    console.log('Decline request:', requestId);
  };

  // Filter the data
  const filteredStudents = filterStudents(students);
  const filteredRequests = filterRequests(requests);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Breadcrumb />
        <div className="college-dashboard">
          <div className="dashboard-header">
            <div className="welcome-section">
              <h1>Welcome, {user?.collegeName}</h1>
              <p>Manage your students and college information</p>
            </div>
            <button className="add-student-btn">
              <FaUserPlus /> Add New Student
            </button>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon bg-blue">
                <FaUserGraduate />
              </div>
              <div className="stat-info">
                <h3>{stats.totalStudents}</h3>
                <p>Total Students</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-green">
                <FaCheckCircle />
              </div>
              <div className="stat-info">
                <h3>{stats.activeStudents}</h3>
                <p>Active Students</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-orange">
                <FaClipboardList />
              </div>
              <div className="stat-info">
                <h3>{stats.totalRequests}</h3>
                <p>Total Requests</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-red">
                <FaClipboardList />
              </div>
              <div className="stat-info">
                <h3>{stats.pendingRequests}</h3>
                <p>Pending Requests</p>
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="content-header">
              <div className="tab-buttons">
                <button 
                  className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
                  onClick={() => setActiveTab('students')}
                >
                  Students Directory
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
                  onClick={() => setActiveTab('requests')}
                >
                  Requests
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  Settings
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
              {activeTab !== 'settings' && (
                <select 
                  className="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  {activeTab === 'students' ? (
                    <>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </>
                  ) : (
                    <>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="declined">Declined</option>
                    </>
                  )}
                </select>
              )}
            </div>

            {activeTab === 'students' ? (
              <div className="students-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Roll Number</th>
                      <th>Branch</th>
                      <th>Year</th>
                      <th>GPA</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(student => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.rollNumber}</td>
                        <td>{student.branch}</td>
                        <td>{student.year}</td>
                        <td>{student.gpa}</td>
                        <td>
                          <span className={`status-badge ${student.status}`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="actions">
                          <button className="action-btn" title="View Profile">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="action-btn" title="Edit">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="action-btn danger" title="Remove">
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : activeTab === 'requests' ? (
              <div className="requests-table">
                <table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Type</th>
                      <th>Details</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map(request => (
                      <tr key={request.id}>
                        <td>{request.studentName}</td>
                        <td>{request.type}</td>
                        <td>{request.details}</td>
                        <td>
                          <span className={`status-badge ${request.status}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="actions">
                          <button 
                            className="action-btn success" 
                            title="Accept"
                            onClick={() => handleAcceptRequest(request.id)}
                          >
                            <i className="bi bi-check-circle"></i>
                          </button>
                          <button 
                            className="action-btn danger" 
                            title="Decline"
                            onClick={() => handleDeclineRequest(request.id)}
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
              <div className="settings-form">
                <h3>College Settings</h3>
                <form>
                  <div className="form-group">
                    <label>College Name</label>
                    <input type="text" defaultValue={user?.collegeName} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={user?.email} />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea rows="3"></textarea>
                  </div>
                  <div className="form-group">
                    <label>Website</label>
                    <input type="url" />
                  </div>
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input type="tel" />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDashboard;
