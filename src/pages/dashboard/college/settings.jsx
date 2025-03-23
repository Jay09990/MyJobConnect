"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { 
    Gear, 
    PencilSquare, 
    Building, 
    Envelope, 
    Telephone, 
    GeoAlt, 
    FileEarmarkText, 
    Bell,
    ShieldLock
} from "react-bootstrap-icons";

export default function CollegeSettings() {
    const [showSaveAlert, setShowSaveAlert] = useState(false);
    const [collegeData, setCollegeData] = useState({
        name: "SGH Institute of Technology",
        email: "admin@sgh.edu",
        phone: "+91 98765 43210",
        address: "123 College Road, Tech Park, Bangalore - 560001",
        notifications: true,
        twoFactorAuth: false
    });

    const handleSave = () => {
        setShowSaveAlert(true);
        setTimeout(() => setShowSaveAlert(false), 3000);
    };

    return (
        <div className="d-flex">
            <div className="flex-grow-1 bg-light min-vh-100">
                <Container className="py-4">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="mb-0">
                            <Gear className="me-2" />
                            Settings
                        </h4>
                    </div>

                    {/* Save Alert */}
                    {showSaveAlert && (
                        <Alert variant="success" className="mb-4">
                            Settings saved successfully!
                        </Alert>
                    )}

                    <Row>
                        {/* Profile Section */}
                        <Col md={4}>
                            <Card className="shadow-sm mb-4">
                                <Card.Body className="text-center">
                                    <div className="position-relative d-inline-block mb-3">
                                        <div 
                                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                                            style={{ width: "120px", height: "120px", fontSize: "3rem" }}
                                        >
                                            {collegeData.name.charAt(0)}
                                        </div>
                                        <Button 
                                            variant="light" 
                                            size="sm" 
                                            className="position-absolute rounded-circle shadow-sm"
                                            style={{ right: "0", bottom: "0", padding: "8px" }}
                                        >
                                            <PencilSquare />
                                        </Button>
                                    </div>
                                    <h5 className="fw-bold mb-1">{collegeData.name}</h5>
                                    <p className="text-muted small mb-0">College Administrator</p>
                                </Card.Body>
                            </Card>

                            {/* Quick Settings */}
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <h6 className="fw-bold mb-3">Quick Settings</h6>
                                    <Form>
                                        <Form.Check 
                                            type="switch"
                                            id="notifications"
                                            label="Email Notifications"
                                            checked={collegeData.notifications}
                                            className="mb-3"
                                        />
                                        <Form.Check 
                                            type="switch"
                                            id="twoFactor"
                                            label="Two-Factor Authentication"
                                            checked={collegeData.twoFactorAuth}
                                        />
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Settings Forms */}
                        <Col md={8}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <h6 className="fw-bold mb-4">College Information</h6>
                                    <Form>
                                        <Row>
                                            <Col md={12} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-muted">
                                                        <Building className="me-2" />
                                                        College Name
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        defaultValue={collegeData.name}
                                                        className="bg-light"
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-muted">
                                                        <Envelope className="me-2" />
                                                        Email Address
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="email"
                                                        defaultValue={collegeData.email}
                                                        className="bg-light"
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-muted">
                                                        <Telephone className="me-2" />
                                                        Phone Number
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="tel"
                                                        defaultValue={collegeData.phone}
                                                        className="bg-light"
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={12} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-muted">
                                                        <GeoAlt className="me-2" />
                                                        Address
                                                    </Form.Label>
                                                    <Form.Control 
                                                        as="textarea"
                                                        rows={2}
                                                        defaultValue={collegeData.address}
                                                        className="bg-light"
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={12} className="mb-4">
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-muted">
                                                        <FileEarmarkText className="me-2" />
                                                        College Documents
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="file"
                                                        className="bg-light"
                                                        accept=".pdf,.doc,.docx"
                                                    />
                                                    <Form.Text className="text-muted">
                                                        Upload college registration documents, accreditation certificates, etc.
                                                    </Form.Text>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <div className="d-flex justify-content-between">
                                            <Button variant="light">
                                                Cancel
                                            </Button>
                                            <Button 
                                                variant="primary"
                                                onClick={handleSave}
                                            >
                                                Save Changes
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>

                            {/* Security Settings */}
                            <Card className="shadow-sm mt-4">
                                <Card.Body>
                                    <h6 className="fw-bold mb-4">
                                        <ShieldLock className="me-2" />
                                        Security Settings
                                    </h6>
                                    <Form>
                                        <Row>
                                            <Col md={6} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-muted">
                                                        Current Password
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="password"
                                                        className="bg-light"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-muted">
                                                        New Password
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="password"
                                                        className="bg-light"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} className="mb-4">
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-muted">
                                                        Confirm New Password
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="password"
                                                        className="bg-light"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button variant="primary">
                                            Update Password
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
