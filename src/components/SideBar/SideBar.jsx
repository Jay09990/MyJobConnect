import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaRegUserCircle, FaCog, FaSignOutAlt, FaBriefcase, FaUsers, FaBuilding } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Get navigation links based on user type
  const getNavLinks = () => {
    const baseLinks = [
      {
        to: `/dashboard/${user?.userType}`,
        label: 'Dashboard',
        icon: <FaHome className="me-2" />
      }
    ];

    const userTypeLinks = {
      company: [
        {
          to: '/dashboard/company/post-job',
          label: 'Post Job',
          icon: <FaBriefcase className="me-2" />
        }
      ],
      student: [
        {
          to: '/dashboard/student/profile',
          label: 'Profile',
          icon: <FaRegUserCircle className="me-2" />
        },
        {
          to: '/dashboard/student/requests',
          label: 'Requests',
          icon: <FaBriefcase className="me-2" />
        }
      ],
      college: [
        {
          to: '/dashboard/college/students',
          label: 'Students',
          icon: <FaUsers className="me-2" />
        },
        {
          to: '/dashboard/college/companies',
          label: 'Companies',
          icon: <FaBuilding className="me-2" />
        },
        {
          to: '/dashboard/college/requests',
          label: 'Requests',
          icon: <FaBriefcase className="me-2" />
        }
      ]
    };

    return [...baseLinks, ...(userTypeLinks[user?.userType] || [])];
  };

  const navLinks = getNavLinks();

  return (
    <div className="sidebar bg-light">
      {/* Logo */}
      <Link to="/" className="sidebar-brand text-decoration-none">
        <h2 className="text-primary mb-4">JobConnect</h2>
      </Link>

      {/* Navigation Links */}
      <ul className="nav flex-column mb-auto">
        {navLinks.map((link) => (
          <li key={link.to} className="nav-item mb-3">
            <Link
              to={link.to}
              className="nav-link text-dark d-flex align-items-center"
            >
              {link.icon}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Settings and Logout */}
      <div className="sidebar-footer">
        <button
          onClick={handleLogout}
          className="nav-link text-danger d-flex align-items-center border-0 bg-transparent w-100"
        >
          <FaSignOutAlt className="me-2" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
