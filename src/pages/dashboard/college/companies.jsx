"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Table, Card } from "react-bootstrap";
import { Building, Search, Briefcase } from "react-bootstrap-icons";

export default function CollegeCompanies() {
  const [searchTerm, setSearchTerm] = useState("");
  const companies = [
    { id: 1, name: "Tech Solutions Inc.", role: "Software Engineer", logo: "T" },
    { id: 2, name: "Data Analytics Co.", role: "Data Scientist", logo: "D" },
    { id: 3, name: "Cloud Systems", role: "Cloud Engineer", logo: "C" },
    { id: 4, name: "AI Research Lab", role: "ML Engineer", logo: "A" },
    { id: 5, name: "Web Services Ltd.", role: "Full Stack Developer", logo: "W" }
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex">
      {/* Main Content */}
      <div className="flex-grow-1 bg-light">
        <Container className="py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">
              <Building className="me-2" />
              Companies
            </h4>
            <Button variant="primary">
              <Briefcase className="me-2" />
              Add New Company
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
                    placeholder="Search by company name or role..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border-0 shadow-none"
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          {/* Companies List */}
          <Card className="shadow-sm">
            <Card.Body className="p-0">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0">Company</th>
                    <th className="border-0">Role</th>
                    <th className="border-0 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map(company => (
                    <tr key={company.id}>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div 
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                            style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}
                          >
                            {company.logo}
                          </div>
                          <div>
                            <div className="fw-bold">{company.name}</div>
                            <small className="text-muted">ID: {company.id}</small>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        <span className="badge bg-light text-dark">
                          {company.role}
                        </span>
                      </td>
                      <td className="align-middle text-end">
                        <Button variant="outline-primary" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {filteredCompanies.length === 0 && (
                <div className="text-center py-4 text-muted">
                  No companies found matching your search.
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}
