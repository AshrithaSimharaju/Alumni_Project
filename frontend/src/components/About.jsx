import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // icons
import "./About.css";
import image1 from "../images/alumni3.jpeg";
import image2 from "../images/alumni4.jpeg";
import image3 from "../images/alumni.png";

const About = () => {
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(null); // track which notice is expanded

  // Fetch notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/public/notices", {
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch notices");
        const data = await res.json();
        setNotices(data);
      } catch (err) {
        console.error("Error fetching notices:", err);
      }
    };
    fetchNotices();
  }, []);

  return (
    <>
      {/* Sticky top section */}
      <div className="sticky-top">
        <header className="about-header">
          <h1>About Our College</h1>
        </header>

        {/* Button group */}
        <div className="button-group">
          <div className="text-nav">SELECT YOUR ROLE!</div>
          <div className="select-role">
            <Link to="/admin_auth" className="large-btn">Admin</Link>
            <Link to="/signup" className="large-btn">Alumni</Link>
            <Link to="/signup" className="large-btn">Student</Link>
          </div>
        </div>
      </div>

      <div className="content">
        <section className="section card" id="welcome">
          <h2>Welcome to Our Alumni Platform</h2>
          <p>
            Welcome to the alumni platform of Rajiv Gandhi University of
            Knowledge and Technologies. This platform is dedicated to connecting
            alumni, sharing memories, and fostering a sense of community among
            former students.
          </p>
        </section>

        <section className="section card" id="college">
          <h2>Our College</h2>
          <p>
            Rajiv Gandhi University of Knowledge and Technologies was founded in
            2013, and over the years, it has grown into one of the most prestigious
            institutions in the region.
          </p>
          <img src="basar1.jpg" alt="College" className="college-img" />
        </section>

        <section className="section card" id="values">
          <h2>Our Values</h2>
          <ul>
            <li>Academic Excellence</li>
            <li>Innovation and Critical Thinking</li>
            <li>Integrity and Responsibility</li>
            <li>Community Engagement</li>
            <li>Lifelong Learning</li>
          </ul>
        </section>

        <section className="section card" id="impact">
          <h2>Our Impact</h2>
          <p>
            Our alumni have excelled in various fields, including business, science,
            arts, and public service.
          </p>
        </section>
      </div>
      <section className="section card notices-card" id="notices">
        <h2> Latest Notices</h2>
        {notices.length === 0 ? (
          <p>No notices available</p>
        ) : (
          <>
            {notices
              .slice((page - 1) * 5, page * 5)
              .map((n) => (
                <div key={n._id} className="notice-item-card">
                  <div className="notice-header">
                    <h4>{n.title}</h4>
                    <span className="notice-time">
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                    <button
                      className="toggle-btn"
                      onClick={() =>
                        setExpanded(expanded === n._id ? null : n._id)
                      }
                    >
                      {expanded === n._id ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>

                  {/* Only show description if expanded */}
                  {expanded === n._id && <p>{n.description}</p>}
                </div>
              ))}

            {/* Pagination */}
            <div className="pagination">
              <button
                className="pagination-btn"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <button
                className="pagination-btn"
                disabled={page * 5 >= notices.length}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
      {/* First row: 2 images side-by-side */}
      <div className="alumni-photos">
        <img src={image1} alt="alumni1" />
        <img src={image2} alt="alumni2" />
      </div>

      {/* Below: single full-width image */}
      <div className="im1">
        <img src={image3} alt="alumni3" />
      </div>

      <footer>
        <p>&copy; 2024 RGUKT. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default About;
