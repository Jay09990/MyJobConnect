/**
 * Registration Page Component
 * 
 * Handles user registration for companies and colleges.
 * Features:
 * - Tab-based interface for company/college selection
 * - Form validation
 * - Redirect to appropriate login page after registration
 * - Password confirmation
 * - Error handling
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState("company");
  
  return (
    <div className="container d-flex flex-column align-items-center vh-100 justify-content-center">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center fw-bold">Create an Account</h2>
        
        {/* Registration Type Selector */}
        <div className="btn-group w-100 mb-3" role="group">
          <button 
            className={`btn ${activeTab === "company" ? "btn-primary" : "btn-light"}`} 
            onClick={() => setActiveTab("company")}
          >
            <i className="bi bi-buildings"></i> Company
          </button>
          <button 
            className={`btn ${activeTab === "college" ? "btn-primary" : "btn-light"}`} 
            onClick={() => setActiveTab("college")}
          >
            <i className="bi bi-bank"></i> College
          </button>
        </div>

        {/* Conditional Form Rendering */}
        {activeTab === "company" ? (
          <CompanyRegisterForm />
        ) : (
          <CollegeRegisterForm />
        )}
      </div>
    </div>
  );
};

/**
 * Company Registration Form Component
 * 
 * Handles company-specific registration details and validation.
 * Redirects to company login page after successful registration.
 */
const CompanyRegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login with company context
      navigate("/login", { 
        state: { 
          userType: "company", 
          email: formData.email, 
          companyName: formData.companyName 
        } 
      });
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Company Name</label>
        <input
          type="text"
          className="form-control"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Register Company</button>
      <div className="text-center mt-3">
        Already have an account? <a href="/login" className="text-decoration-none">Sign In</a>
      </div>
    </form>
  );
};

/**
 * College Registration Form Component
 * 
 * Handles college-specific registration details and validation.
 * Redirects to college login page after successful registration.
 */
const CollegeRegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    collegeName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login with college context
      navigate("/login", { 
        state: { 
          userType: "college", 
          email: formData.email, 
          collegeName: formData.collegeName 
        } 
      });
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">College Name</label>
        <input
          type="text"
          className="form-control"
          value={formData.collegeName}
          onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Register College</button>
      <div className="text-center mt-3">
        Already have an account? <a href="/login" className="text-decoration-none">Sign In</a>
      </div>
    </form>
  );
};

export default RegisterPage;
