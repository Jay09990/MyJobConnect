/**
 * Post Job Modal Component
 * 
 * Allows companies to create and post new job listings.
 * Features:
 * - Job details form
 * - Validation
 * - Preview functionality
 */

import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import './PostJob.css';

const PostJob = ({ isOpen, onClose, onSubmit }) => {
  const [jobData, setJobData] = useState({
    title: '',
    department: '',
    type: 'Full-time',
    location: '',
    salary: '',
    description: '',
    requirements: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(jobData);
    setJobData({
      title: '',
      department: '',
      type: 'Full-time',
      location: '',
      salary: '',
      description: '',
      requirements: ''
    });
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Post New Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={jobData.department}
              onChange={handleChange}
              placeholder="Enter department"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Job Type</Form.Label>
            <Form.Select
              name="type"
              value={jobData.type}
              onChange={handleChange}
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              placeholder="Enter job location"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Salary Range</Form.Label>
            <Form.Control
              type="text"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              placeholder="Enter salary range"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Job Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={jobData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter job description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Requirements</Form.Label>
            <Form.Control
              as="textarea"
              name="requirements"
              value={jobData.requirements}
              onChange={handleChange}
              rows={4}
              placeholder="Enter job requirements"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Post Job
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostJob;
