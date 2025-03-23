/**
 * Login Page Component
 * 
 * Handles user authentication for students, companies, and colleges.
 * Features:
 * - Tab-based interface for user type selection
 * - Pre-filled data from registration
 * - Role-based redirection after login
 * - Form validation and error handling
 * - Responsive design
 */

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("student");
  const [companyName, setCompanyName] = useState("");

  // Set active tab and email if coming from registration
  useEffect(() => {
    if (location.state?.userType) {
      setActiveTab(location.state.userType);
      if (location.state.email) {
        setEmail(location.state.email);
      }
      if (location.state.companyName) {
        setCompanyName(location.state.companyName);
      }
    }
  }, [location.state]);

  // Handle form submission and role-based redirection
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare credentials based on user type
      const credentials = {
        email,
        password,
        userType: activeTab,
        ...(activeTab === 'company' ? { companyName } : { college })
      };

      // Attempt login
      const user = await login(credentials);

      // Role-based navigation
      switch (activeTab) {
        case "student":
          navigate("/dashboard/student");
          break;
        case "college":
          navigate("/dashboard/college");
          break;
        case "company":
          navigate("/dashboard/company");
          break;
        default:
          navigate("/dashboard/student");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center vh-100 justify-content-center">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center fw-bold">Welcome Back</h2>
        <p className="text-center">Sign in to your account to continue</p>

        {/* User Type Selection Tabs */}
        <div className="btn-group w-100 mb-3" role="group">
          <button 
            className={`btn ${activeTab === "student" ? "btn-primary" : "btn-light"}`}
            onClick={() => setActiveTab("student")}
          >
            <i className="bi bi-mortarboard"></i> Student
          </button>
          <button 
            className={`btn ${activeTab === "company" ? "btn-primary" : "btn-light"}`}
            onClick={() => setActiveTab("company")}
          >
            <i className="bi bi-building"></i> Company
          </button>
          <button 
            className={`btn ${activeTab === "college" ? "btn-primary" : "btn-light"}`}
            onClick={() => setActiveTab("college")}
          >
            <i className="bi bi-bank"></i> College
          </button>
        </div>

        <h4 className="text-center">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Login
        </h4>
        <p className="text-center">
          Enter your credentials to access your {activeTab} account
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          {activeTab === "company" ? (
            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} 
                required 
              />
            </div>
          ) : (
            <div className="mb-3">
              <label className="form-label">College Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={college} 
                onChange={(e) => setCollege(e.target.value)} 
                required 
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <div className="text-end">
              <a href="/forgot-password" className="text-decoration-none">
                Forgot password?
              </a>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>

        {/* Registration Link (Only for companies and colleges) */}
        {activeTab !== "student" && (
          <div className="text-center mt-3">
            Don't have an account? <a href="/register" className="text-decoration-none">Sign Up</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
