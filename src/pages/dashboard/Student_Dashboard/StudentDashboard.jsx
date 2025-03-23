import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Sidebar from '../../../components/Sidebar/Sidebar';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="dashboard-container d-flex">
      <Sidebar />
      <div className="dashboard-content flex-grow-1 p-4">
        <div className="dashboard-header mb-4">
          <h2>Welcome, {user?.name || 'Student'}</h2>
          <p className="text-muted">Manage your profile and applications</p>
        </div>

        <div className="dashboard-stats row g-4 mb-4">
          <div className="col-md-4">
            <div className="stat-card bg-primary bg-opacity-10 p-4 rounded-3">
              <h3 className="stat-number text-primary">0</h3>
              <p className="stat-label mb-0">Active Applications</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card bg-success bg-opacity-10 p-4 rounded-3">
              <h3 className="stat-number text-success">0</h3>
              <p className="stat-label mb-0">Approved Applications</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card bg-info bg-opacity-10 p-4 rounded-3">
              <h3 className="stat-number text-info">0</h3>
              <p className="stat-label mb-0">Pending Requests</p>
            </div>
          </div>
        </div>

        <div className="dashboard-actions mb-4">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="action-card p-4 border rounded-3">
                <h4>Complete Your Profile</h4>
                <p className="text-muted">Update your information to increase your chances</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => window.location.href = '/dashboard/student/profile'}
                >
                  Update Profile
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="action-card p-4 border rounded-3">
                <h4>View Requests</h4>
                <p className="text-muted">Check your pending requests and applications</p>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => window.location.href = '/dashboard/student/requests'}
                >
                  View Requests
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
