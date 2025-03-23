// AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Auth Pages
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";

// Dashboard Pages
import CollegeDashboard from "../pages/dashboard/college/college-dashboard";
import CollegeSettings from "../pages/dashboard/college/settings";
import CollegeCompanies from "../pages/dashboard/college/companies";
import CollegeRequests from "../pages/dashboard/college/requests";
import StudentsPage from "../pages/dashboard/college/students";

// Student Pages
import StudentDashboard from "../pages/dashboard/Student_Dashboard/StudentDashboard";
import StudentProfile from "../pages/dashboard/Student_Dashboard/Profile";
import StudentRequests from "../pages/dashboard/Student_Dashboard/Requests";

// Company Pages
import CompanyDashboard from "../pages/dashboard/company/CompanyDashboard";
import PostJob from "../pages/dashboard/company/PostJob";

// Landing Page
import LandingPage from "../pages/Landing/Landing_page";

// Protected Route Component
const ProtectedRoute = ({ children, allowedUserTypes }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedUserTypes && !allowedUserTypes.includes(user.userType)) {
    return <Navigate to={`/dashboard/${user.userType}`} />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      {/* Student Routes */}
      <Route path="/dashboard/student" element={
        <ProtectedRoute allowedUserTypes={['student']}>
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/student/profile" element={
        <ProtectedRoute allowedUserTypes={['student']}>
          <StudentProfile />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/student/requests" element={
        <ProtectedRoute allowedUserTypes={['student']}>
          <StudentRequests />
        </ProtectedRoute>
      } />
      
      {/* College Routes */}
      <Route path="/dashboard/college" element={
        <ProtectedRoute allowedUserTypes={['college']}>
          <CollegeDashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/college/settings" element={
        <ProtectedRoute allowedUserTypes={['college']}>
          <CollegeSettings />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/college/companies" element={
        <ProtectedRoute allowedUserTypes={['college']}>
          <CollegeCompanies />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/college/requests" element={
        <ProtectedRoute allowedUserTypes={['college']}>
          <CollegeRequests />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/college/students" element={
        <ProtectedRoute allowedUserTypes={['college']}>
          <StudentsPage />
        </ProtectedRoute>
      } />

      {/* Company Routes */}
      <Route path="/dashboard/company" element={
        <ProtectedRoute allowedUserTypes={['company']}>
          <CompanyDashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/company/post-job" element={
        <ProtectedRoute allowedUserTypes={['company']}>
          <PostJob />
        </ProtectedRoute>
      } />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
