
import React, { useEffect } from "react";
import { useNavigate, Link,Outlet } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleGetStarted = () => {
    navigate("/about");
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <p className="logo-text">Alumni Association Platform</p>
        </div>
      </div>

      {/* Background + Content */}
      <div className="college-info">
        {/* Quotation Card on Right */}
        <div className="college-text">
          <p>
            "Welcome back to the place where your journey began. The Alumni
            Association of Rajiv Gandhi University Of Knowledge Technologies is
            a community of achievers, innovators, and dreamers. Here,
            connections are made, memories are cherished, and legacies are
            built. Join us as we continue to shape the future together."
          </p>
        </div>

        {/* Middle Button at Bottom */}
        <div className="center-button">
          <button onClick={handleGetStarted}>Get Started</button>
        </div>
      </div>
     <Outlet />
    </div>
  );
}

export default Home;
