import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (credentials) => {
    try {
      // TODO: Replace with actual API call
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: credentials.email,
        userType: credentials.userType,
        // User type specific data
        ...(credentials.userType === 'company' && { 
          companyName: credentials.companyName 
        }),
        ...(credentials.userType === 'college' && { 
          collegeName: credentials.college 
        }),
        ...(credentials.userType === 'student' && {
          name: credentials.name || credentials.email.split('@')[0],
          college: credentials.college,
          role: '',
          education: '',
          skills: [],
          experience: '',
          resume: null,
          applications: [],
          profilePicture: null
        })
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Update user profile data
  const updateProfile = async (updates) => {
    try {
      const updatedUser = {
        ...user,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  // Update profile picture
  const updateProfilePicture = async (pictureFile) => {
    try {
      const pictureUrl = URL.createObjectURL(pictureFile);
      return await updateProfile({ profilePicture: pictureUrl });
    } catch (error) {
      console.error('Profile picture update error:', error);
      throw error;
    }
  };

  // Update resume
  const updateResume = async (resumeFile) => {
    try {
      const resumeUrl = URL.createObjectURL(resumeFile);
      return await updateProfile({ resume: resumeUrl });
    } catch (error) {
      console.error('Resume update error:', error);
      throw error;
    }
  };

  // Update skills
  const updateSkills = async (skills) => {
    try {
      return await updateProfile({ skills });
    } catch (error) {
      console.error('Skills update error:', error);
      throw error;
    }
  };

  // Add job application
  const addJobApplication = async (application) => {
    try {
      const applications = [...(user.applications || []), application];
      return await updateProfile({ applications });
    } catch (error) {
      console.error('Application tracking error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      updateProfile,
      updateProfilePicture,
      updateResume,
      updateSkills,
      addJobApplication
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
