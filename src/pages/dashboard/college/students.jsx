"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Table, Button, Card, Badge } from "react-bootstrap";
import { MortarboardFill, Search, PersonPlusFill, ThreeDotsVertical } from "react-bootstrap-icons";

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const students = [
    { 
      id: 1,
      name: "John Doe",
      avatar: "J",
      degree: "B.Tech",
      year: "4th Year",
      status: "Placed",
      company: "Tech Corp"
    },
    { 
      id: 2,
      name: "Alice Smith",
      avatar: "A",
      degree: "M.Tech",
      year: "2nd Year",
      status: "Interviewing",
      company: "Data Inc"
    },
    { 
      id: 3,
      name: "Bob Wilson",
      avatar: "B",
      degree: "B.Tech",
      year: "3rd Year",
      status: "Available",
      company: null
    },
    { 
      id: 4,
      name: "Emma Davis",
      avatar: "E",
      degree: "MCA",
      year: "Final Year",
      status: "Placed",
      company: "Cloud Systems"
    }
  ];

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const getStatusBadge = (status) => {
    const variants = {
      'Placed': 'success',
      'Interviewing': 'warning',
      'Available': 'info'
    };
    return variants[status] || 'secondary';
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex">
      {/* Main Content */}
      <div className="flex-grow-1 bg-light">
        <Container className="py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">
              <MortarboardFill className="me-2" />
              Students
            </h4>
            <Button variant="primary">
              <PersonPlusFill className="me-2" />
              Add Student
            </Button>
          </div>

          {/* Search Bar */}
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Form>
                <Form.Group className="d-flex align-items-center">
                  <Search className="text-muted me-2" />
                  <Form.Control
                    type="text"
                    placeholder="Search by name, degree, or status..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border-0 shadow-none"
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          {/* Students Table */}
          <Card className="shadow-sm">
            <Card.Body className="p-0">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0">Student</th>
                    <th className="border-0">Degree</th>
                    <th className="border-0">Year</th>
                    <th className="border-0">Status</th>
                    <th className="border-0 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div 
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                            style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}
                          >
                            {student.avatar}
                          </div>
                          <div>
                            <div className="fw-bold">{student.name}</div>
                            <small className="text-muted">
                              {student.company ? `@ ${student.company}` : 'No company yet'}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">{student.degree}</td>
                      <td className="align-middle">{student.year}</td>
                      <td className="align-middle">
                        <Badge bg={getStatusBadge(student.status)} className="rounded-pill">
                          {student.status}
                        </Badge>
                      </td>
                      <td className="align-middle text-end">
                        <Button variant="link" className="text-muted p-0">
                          <ThreeDotsVertical />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {filteredStudents.length === 0 && (
                <div className="text-center py-4 text-muted">
                  No students found matching your search.
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}
