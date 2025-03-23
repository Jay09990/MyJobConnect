import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Correct imports (Ensure all images are in the right path)
import StudentsIcon from "../../assets/UI/college.svg";
import CompanyIcon from "../../assets/UI/Company.svg";
import CollegeIcon from "../../assets/UI/tick_mark.svg";
import TickMark from "../../assets/UI/tick_mark.svg";

const PlatformFeatures = () => {
  const features = [
    {
      icon: StudentsIcon,
      title: "Students",
      description: "Find job opportunities, internships, and enhance your skills.",
      bulletPoints: [
        "Access to exclusive job listings",
        "Track application status",
        "Build a professional profile",
      ],
    },
    {
      icon: CompanyIcon,
      title: "Company",
      description: "Connect with talented students and find the right candidates.",
      bulletPoints: [
        "Post job opportunities",
        "Find skilled candidates",
        "Engage with academic institutions",
      ],
    },
    {
      icon: CollegeIcon,
      title: "College",
      description: "Bridge the gap between industry and academia for better collaboration.",
      bulletPoints: [
        "Collaborate with industry leaders",
        "Facilitate student placements",
        "Offer real-world exposure",
      ],
    },
  ];

  return (
    <section className="container my-5">
      <h2 className="text-center fw-bold">Platform Features</h2>
      <p className="text-center">
        Discover how JobConnect helps students, companies, and colleges collaborate effectively.
      </p>

      <div className="row text-center mt-4">
        {features.map((feature, index) => (
          <div key={index} className="col-md-4 mb-4">
            {/* Feature Icon */}
            <img src={feature.icon} alt={feature.title} className="mb-3" width="80" />

            {/* Feature Title */}
            <h4>{feature.title}</h4>

            {/* Feature Description */}
            <p>{feature.description}</p>

            {/* Bullet Points */}
            <div>
              {feature.bulletPoints.map((point, idx) => (
                <div key={idx} className="d-flex align-items-center gap-2">
                  <img src={TickMark} alt="Tick" width="20" />
                  <p className="mb-1">{point}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlatformFeatures;
