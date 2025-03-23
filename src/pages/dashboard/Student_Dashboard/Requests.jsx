import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './Requests.css';

const Requests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // TODO: Replace with actual API call
      // Simulated API response
      const data = [
        {
          id: 1,
          companyName: "Tech Corp",
          companyLogo: "https://via.placeholder.com/40",
          role: "Software Engineer Intern",
          salary: "₹40,000/month",
          status: "pending",
          description: "Looking for passionate developers for our summer internship program",
          requirements: "Strong in React, Node.js",
          location: "Bangalore",
          type: "Internship",
          applicationDate: "2025-03-15"
        },
        {
          id: 2,
          companyName: "Digital Solutions",
          companyLogo: "https://via.placeholder.com/40",
          role: "Full Stack Developer",
          salary: "₹12,00,000/year",
          status: "accepted",
          description: "Join our dynamic team of full-stack developers",
          requirements: "3+ years experience, MERN stack",
          location: "Mumbai",
          type: "Full-time",
          applicationDate: "2025-03-10"
        }
      ];

      setRequests(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRequests(prev => 
        prev.map(request => 
          request.id === requestId 
            ? { ...request, status: 'accepted' }
            : request
        )
      );
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRequests(prev => 
        prev.map(request => 
          request.id === requestId 
            ? { ...request, status: 'declined' }
            : request
        )
      );
    } catch (error) {
      console.error('Error declining request:', error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              Requests
              <span className="badge bg-primary ms-2">{requests.length}</span>
            </h2>
          </div>

          {requests.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">No requests found</h4>
              <p>You don't have any job or internship requests yet.</p>
            </div>
          ) : (
            <div className="request-list">
              {requests.map(request => (
                <div key={request.id} className="card mb-3 request-card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      {/* Company Logo & Name */}
                      <div className="col-md-3 mb-3 mb-md-0">
                        <div className="d-flex align-items-center">
                          <img
                            src={request.companyLogo}
                            alt={request.companyName}
                            className="rounded-circle me-3"
                            width="40"
                            height="40"
                          />
                          <div>
                            <h5 className="mb-0">{request.companyName}</h5>
                            <small className="text-muted">{request.location}</small>
                          </div>
                        </div>
                      </div>

                      {/* Role & Salary */}
                      <div className="col-md-3 mb-3 mb-md-0">
                        <h6 className="mb-1">{request.role}</h6>
                        <div className="text-success">{request.salary}</div>
                      </div>

                      {/* Type & Date */}
                      <div className="col-md-3 mb-3 mb-md-0">
                        <div className="badge bg-info mb-2">{request.type}</div>
                        <div className="text-muted small">
                          Applied on: {new Date(request.applicationDate).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="col-md-3 text-md-end">
                        {request.status === 'pending' ? (
                          <div className="d-flex gap-2 justify-content-md-end">
                            <button
                              className="btn btn-primary"
                              onClick={() => handleAccept(request.id)}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleDecline(request.id)}
                            >
                              Decline
                            </button>
                          </div>
                        ) : (
                          <div className={`badge bg-${request.status === 'accepted' ? 'success' : 'danger'}`}>
                            {request.status === 'accepted' ? 'Accepted' : 'Declined'}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="mt-3">
                      <div className="mb-2">
                        <strong>Description:</strong>
                        <p className="mb-1">{request.description}</p>
                      </div>
                      <div>
                        <strong>Requirements:</strong>
                        <p className="mb-0">{request.requirements}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;