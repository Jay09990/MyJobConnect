import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import homePageImage from '../../assets/UI/home_page_image.png';

const HeroSection = () => {
  const navigate = useNavigate();
  
  // Helper function to reset button active state
  const resetActiveState = (e) => e.target.blur();

  return (
    <section className="container-lg py-5">
      <div className="row align-items-center">
        {/* Right Image */}
        <div className="col-md-6 order-md-2 d-flex justify-content-center">
          <img
            src={homePageImage}
            alt="Hero Section Illustration"
            className="img-fluid"
            style={{ maxWidth: "90%", height: "auto" }}
          />
        </div>

        {/* Left Content */}
        <div className="col-md-6 order-md-1 text-center text-md-start mt-4 mt-md-0">
          <h1 className="fw-bold fs-1 fs-md-5">
            Connect, Collaborate, and Find Your Dream Career
          </h1>
          <p className="text-muted fs-5 fs-md-5">
            JobConnect bridges the gap between students, colleges, and companies,
            creating a seamless ecosystem for job opportunities and collaborations.
          </p>

          <div className="d-flex flex-column flex-md-row gap-3 mt-4 justify-content-center justify-content-md-start">
            <button
              className="btn btn-primary btn-lg"
              onMouseUp={resetActiveState}
              onTouchEnd={resetActiveState}
              onClick={() => navigate('/register')}
            >
              Get Started
            </button>

            <button
              className="btn btn-outline-primary btn-lg"
              onMouseUp={resetActiveState}
              onTouchEnd={resetActiveState}
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
