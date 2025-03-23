import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Skip breadcrumb on landing page and auth pages
  if (location.pathname === '/' || 
      location.pathname === '/login' || 
      location.pathname === '/register') {
    return null;
  }

  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  // Generate breadcrumb items
  const getBreadcrumbItems = () => {
    let currentPath = '';
    return pathSegments.map((segment, index) => {
      currentPath += `/${segment}`;
      
      // Format the segment for display
      let displayName = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      
      // Special cases for different paths
      if (user && segment === user.userType) {
        switch (user.userType) {
          case 'company':
            displayName = 'Company Dashboard';
            break;
          case 'student':
            displayName = 'Student Dashboard';
            break;
          case 'college':
            displayName = 'College Dashboard';
            break;
          default:
            displayName = 'Dashboard';
        }
      } else {
        // Handle other common paths
        switch (segment) {
          case 'dashboard':
            return null; // Skip 'dashboard' in the path
          case 'profile':
            displayName = 'My Profile';
            break;
          case 'jobs':
            displayName = user?.userType === 'company' ? 'Posted Jobs' : 'Available Jobs';
            break;
          case 'applications':
            displayName = user?.userType === 'company' ? 'Job Applications' : 'My Applications';
            break;
          case 'students':
            displayName = 'Student Directory';
            break;
          case 'companies':
            displayName = 'Company Directory';
            break;
          case 'requests':
            displayName = 'Requests';
            break;
          case 'settings':
            displayName = 'Settings';
            break;
        }
      }

      return {
        name: displayName,
        path: currentPath,
        isLast: index === pathSegments.length - 1
      };
    }).filter(Boolean); // Remove null items
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Don't show breadcrumb if there are no valid items
  if (breadcrumbItems.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <div className="container">
        <ol className="breadcrumb m-0">
          {user && (
            <li className="breadcrumb-item">
              <Link 
                to={`/dashboard/${user.userType}`} 
                className="text-decoration-none"
              >
                Dashboard
              </Link>
            </li>
          )}
          {breadcrumbItems.map((item, index) => (
            <li 
              key={item.path} 
              className={`breadcrumb-item ${item.isLast ? 'active' : ''}`}
              aria-current={item.isLast ? 'page' : undefined}
            >
              {item.isLast ? (
                <span>{item.name}</span>
              ) : (
                <Link 
                  to={item.path} 
                  className="text-decoration-none"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
