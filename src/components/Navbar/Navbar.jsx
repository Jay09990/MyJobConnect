/**
 * Navbar Component
 * 
 * Provides the main navigation header for the application with responsive design.
 * Features:
 * - Conditional rendering based on authentication state
 * - Profile dropdown menu for authenticated users
 * - Mobile-responsive design
 * - Default avatar fallback
 */

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import defaultAvatar from '../../assets/images/default-avatar.png';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  // Handle clicks outside of dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && 
          !dropdownRef.current.contains(event.target) && 
          !avatarRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get display name based on user type
  const getDisplayName = () => {
    if (!user) return '';
    
    switch (user.userType) {
      case 'company':
        return user.companyName;
      case 'college':
        return user.collegeName;
      case 'student':
        return user.name || user.email.split('@')[0];
      default:
        return user.email;
    }
  };

  // Handle user logout
  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  // Handle dashboard click
  const handleDashboardClick = () => {
    if (user) {
      navigate(`/dashboard/${user.userType}`);
      setShowDropdown(false);
    }
  };

  // Handle logo click
  const handleLogoClick = (e) => {
    e.preventDefault();
    const currentPath = window.location.pathname;
    if (currentPath === '/login' || currentPath === '/register') {
      navigate('/');
    } else if (user) {
      navigate(`/dashboard/${user.userType}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
      <div className="container">
        {/* Brand Logo/Name */}
        <a 
          href="#" 
          className="navbar-brand fw-bold fs-3" 
          onClick={handleLogoClick}
        >
          JobConnect
        </a>

        {/* Navigation Items */}
        <div className="ms-auto d-flex align-items-center">
          {user ? (
            <div className="position-relative">
              <div 
                ref={avatarRef}
                className="d-flex align-items-center gap-2" 
                onClick={() => setShowDropdown(!showDropdown)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={user.profilePicture || defaultAvatar}
                  alt="Profile"
                  className="rounded-circle"
                  width="40"
                  height="40"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultAvatar;
                  }}
                />
                <span className="d-none d-md-inline">{getDisplayName()}</span>
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div 
                  ref={dropdownRef}
                  className="position-absolute end-0 mt-2 py-2 bg-white rounded-3 shadow-sm"
                  style={{ 
                    minWidth: '200px',
                    zIndex: 1000
                  }}
                >
                  <button 
                    className="dropdown-item px-4 py-2"
                    onClick={handleDashboardClick}
                  >
                    Dashboard
                  </button>
                  {user.userType === 'student' && (
                    <Link 
                      to="/dashboard/student/profile"
                      className="dropdown-item px-4 py-2"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                  )}
                  <hr className="my-2" />
                  <button
                    className="dropdown-item px-4 py-2 text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Guest User Buttons
            <div className="d-flex gap-3">
              <button 
                className="btn btn-outline-primary px-4"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button 
                className="btn btn-primary px-4"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;