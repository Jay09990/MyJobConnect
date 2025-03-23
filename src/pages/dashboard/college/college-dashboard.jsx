"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { House, Mortarboard, Building, Bell, Gear, BoxArrowRight } from "react-bootstrap-icons";

export default function CollegeDashboard() {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="d-flex flex-column bg-light p-3" style={{ width: "250px", minHeight: "calc(100vh - 56px)" }}>
        <ul className="nav flex-column flex-grow-1 text-start">
          <li className="nav-item mb-2">
            <a href="/dashboard/college/students" className="nav-link text-dark">
              <Mortarboard className="me-2" /> Students
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/dashboard/college/companies" className="nav-link text-dark">
              <Building className="me-2" /> Companies
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/dashboard/college/requests" className="nav-link text-dark">
              <Bell className="me-2" /> Requests
            </a>
          </li>
        </ul>
        <div className="mt-auto">
          <ul className="nav flex-column text-start">
            <li className="nav-item mb-2">
              <a href="/dashboard/college/settings" className="nav-link text-dark">
                <Gear className="me-2" /> Settings
              </a>
            </li>
            <li className="nav-item">
              <a href="/logout" className="nav-link text-danger">
                <BoxArrowRight className="me-2" /> Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 bg-light">
        <Container className="py-4">
          <h4 className="mb-4">College Dashboard</h4>
          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <Mortarboard className="text-primary" style={{ width: "2rem", height: "2rem" }} />
                  </div>
                  <h5 className="fw-bold mb-2">Total Students</h5>
                  <h3 className="mb-0">1,505</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <Building className="text-primary" style={{ width: "2rem", height: "2rem" }} />
                  </div>
                  <h5 className="fw-bold mb-2">Total Companies</h5>
                  <h3 className="mb-0">42</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <Bell className="text-primary" style={{ width: "2rem", height: "2rem" }} />
                  </div>
                  <h5 className="fw-bold mb-2">New Requests</h5>
                  <h3 className="mb-0">5</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Activity Section */}
          <div className="mt-4">
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="fw-bold mb-3">Recent Activity</h5>
                <div className="text-muted small">No recent activity</div>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    </div>
  );
}
