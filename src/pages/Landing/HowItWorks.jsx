import React from 'react';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
    const navigate = useNavigate();

    return (
        <section className="container py-5">
            <h2 className="text-center fw-bold mb-4">How It Works</h2>
            <p className="text-center mb-5">A simple process to connect students, colleges, and companies.</p>

            <div className="row text-center">
                {/* Step 1 */}
                <div className="col-md-4">
                    <div className="card border-2">
                        <div className="card-body  d-flex flex-column align-items-center">
                            <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                                style={{ width: "60px", height: "60px" }}><h3 className="fw-bold">1</h3></div>
                            <h5 className="mt-3">Create an Account</h5>
                            <p>Register as a student, company, or college to access the platform.</p>
                        </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="col-md-4">
                    <div className="card border-2">
                        <div className="card-body d-flex flex-column align-items-center">
                            <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                                style={{ width: "60px", height: "60px" }}><h3 className="fw-bold">2</h3></div>
                            <h5 className="mt-3">Complete Your Profile</h5>
                            <p>Fill your details, skills, and preferences to enhance visibility.</p>
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="col-md-4">
                    <div className="card border-2">
                        <div className="card-body  d-flex flex-column align-items-center">
                            <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                                style={{ width: "60px", height: "60px" }}><h3 className="fw-bold">3</h3></div>
                            <h5 className="mt-3">Connect and Collaborate</h5>
                            <p>Apply for jobs, post listings, or manage student opportunities.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center mt-5">
                <button 
                    className="btn btn-primary btn-lg me-3"
                    onClick={() => navigate('/register')}
                >
                    Create an Account
                </button>
                <button 
                    className="btn btn-outline-primary btn-lg"
                    onClick={() => navigate('/login')}
                >
                    Sign In
                </button>
            </div>
        </section>
    );
};

export default HowItWorks;
