"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Table, Card, Badge } from "react-bootstrap";
import { Bell, Search, CheckLg, XLg, Clock } from "react-bootstrap-icons";

export default function CollegeRequests() {
    const [searchTerm, setSearchTerm] = useState("");
    const requests = [
      { 
        id: 1,
        companyName: "Tech Solutions Inc.",
        companyLogo: "T",
        role: "Software Engineer",
        salary: "$120,000",
        status: "Pending",
        deadline: "2025-04-15"
      },
      { 
        id: 2,
        companyName: "Data Analytics Co.",
        companyLogo: "D",
        role: "Data Scientist",
        salary: "$110,000",
        status: "Pending",
        deadline: "2025-04-10"
      },
      { 
        id: 3,
        companyName: "Cloud Systems",
        companyLogo: "C",
        role: "Cloud Engineer",
        salary: "$115,000",
        status: "Pending",
        deadline: "2025-04-20"
      }
    ];
  
    const handleSearch = (e) => setSearchTerm(e.target.value);

    const filteredRequests = requests.filter(request =>
      request.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getDaysUntilDeadline = (deadline) => {
      const today = new Date();
      const deadlineDate = new Date(deadline);
      const diffTime = deadlineDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

  return (
    <div className="d-flex">
      {/* Main Content */}
      <div className="flex-grow-1 bg-light">
        <Container className="py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">
              <Bell className="me-2" />
              Pending Requests
            </h4>
            <Badge bg="primary" pill>
              {requests.length} New
            </Badge>
          </div>

          {/* Search Bar */}
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Form>
                <Form.Group className="d-flex align-items-center">
                  <Search className="text-muted me-2" />
                  <Form.Control
                    type="text"
                    placeholder="Search by company or role..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border-0 shadow-none"
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          {/* Requests Table */}
          <Card className="shadow-sm">
            <Card.Body className="p-0">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0">Company</th>
                    <th className="border-0">Role</th>
                    <th className="border-0">Salary</th>
                    <th className="border-0">Deadline</th>
                    <th className="border-0 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div 
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                            style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}
                          >
                            {request.companyLogo}
                          </div>
                          <div className="fw-bold">{request.companyName}</div>
                        </div>
                      </td>
                      <td className="align-middle">{request.role}</td>
                      <td className="align-middle">
                        <span className="fw-bold text-success">
                          {request.salary}
                        </span>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <Clock className="text-muted me-2" />
                          <div>
                            <div className="small text-muted mb-0">
                              {request.deadline}
                            </div>
                            <div className="small fw-bold text-danger">
                              {getDaysUntilDeadline(request.deadline)} days left
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle text-end">
                        <Button 
                          variant="success" 
                          size="sm" 
                          className="me-2"
                          title="Accept Request"
                        >
                          <CheckLg />
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          title="Reject Request"
                        >
                          <XLg />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {filteredRequests.length === 0 && (
                <div className="text-center py-4 text-muted">
                  No requests found matching your search.
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}
