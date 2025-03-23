import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import Sidebar from '../../../components/Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const { user, updateProfile, updateProfilePicture, updateResume, updateSkills } = useAuth();
  
  // Keep track of both displayed and form data
  const [displayData, setDisplayData] = useState({
    name: user?.name || '',
    role: user?.role || '',
    college: user?.college || '',
    skills: user?.skills || [''],
    profileImage: user?.profilePicture || null,
    resume: user?.resume || null
  });

  const [formData, setFormData] = useState({
    name: user?.name || '',
    role: user?.role || '',
    college: user?.college || '',
    skills: user?.skills || [''],
    profileImage: user?.profilePicture || null,
    resume: user?.resume || null
  });

  // Update display data when user data changes
  useEffect(() => {
    if (user) {
      setDisplayData({
        name: user.name || '',
        role: user.role || '',
        college: user.college || '',
        skills: user.skills || [''],
        profileImage: user.profilePicture || null,
        resume: user.resume || null
      });
    }
  }, [user]);

  const handleAddSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const updatedUser = await updateProfilePicture(file);
        // Only update display data after successful save
        setDisplayData(prev => ({
          ...prev,
          profileImage: updatedUser.profilePicture
        }));
        setFormData(prev => ({
          ...prev,
          profileImage: updatedUser.profilePicture
        }));
      } catch (error) {
        console.error('Failed to update profile picture:', error);
        alert('Failed to update profile picture. Please try again.');
      }
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const updatedUser = await updateResume(file);
        // Only update display data after successful save
        setDisplayData(prev => ({
          ...prev,
          resume: updatedUser.resume
        }));
        setFormData(prev => ({
          ...prev,
          resume: updatedUser.resume
        }));
      } catch (error) {
        console.error('Failed to update resume:', error);
        alert('Failed to update resume. Please try again.');
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Filter out empty skills
      const filteredSkills = formData.skills.filter(skill => skill.trim());
      
      // Update all profile data
      const updatedUser = await updateProfile({
        name: formData.name,
        role: formData.role,
        college: formData.college
      });
      
      // Update skills separately
      await updateSkills(filteredSkills);

      // Only update display data after successful save
      setDisplayData({
        ...formData,
        skills: filteredSkills
      });

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
      
      // Reset form data to display data on error
      setFormData({...displayData});
    }
  };

  const handleCancel = () => {
    // Reset form data to display data
    setFormData({...displayData});
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Container className="py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Profile</h2>
            <div>
              <Button variant="outline-secondary" className="me-2" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            </div>
          </div>

          <Row className="justify-content-center mb-4">
            <Col xs={12} md={6} className="text-center">
              <div className="position-relative d-inline-block">
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                  style={{
                    width: '200px',
                    height: '200px',
                    overflow: 'hidden'
                  }}
                >
                  {displayData.profileImage ? (
                    <img
                      src={displayData.profileImage}
                      alt="Profile"
                      className="w-100 h-100 object-fit-cover"
                    />
                  ) : (
                    <div className="text-secondary">No Image</div>
                  )}
                </div>
                <label
                  htmlFor="profile-image"
                  className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2 cursor-pointer"
                  style={{ cursor: 'pointer' }}
                >
                  <FaEdit />
                </label>
                <input
                  type="file"
                  id="profile-image"
                  className="d-none"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Resume</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                />
                {displayData.resume && (
                  <div className="mt-2">
                    <a href={displayData.resume} target="_blank" rel="noopener noreferrer" className="text-primary">
                      View Current Resume
                    </a>
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Skills</Form.Label>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="d-flex mb-2">
                    <Form.Control
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      placeholder="Enter skill"
                    />
                    {index === formData.skills.length - 1 && (
                      <Button
                        variant="outline-primary"
                        className="ms-2"
                        onClick={handleAddSkill}
                      >
                        +
                      </Button>
                    )}
                  </div>
                ))}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your role"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>College</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your college"
                  value={formData.college}
                  onChange={(e) => handleInputChange('college', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Profile;
