import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './About.css';
import image1 from '../images/alumni3.jpeg';
import image2 from '../images/alumni4.jpeg';
import image3 from '../images/alumni.png';

const About = () => {
  return (
    <div>
     <header className="about-header">
  <h1>About Our College</h1>
</header>

      <div className="content">
        <section className="section" id="welcome">
          <h2>Welcome to Our Alumni Platform</h2>
          <p>
            Welcome to the alumni platform of Rajiv Gandhi University of
            Knowledge and Technologies. This platform is dedicated to connecting
            alumni, sharing memories, and fostering a sense of community among
            former students. Whether you're looking to reconnect with old friends
            or support future generations, our platform is here to help.
          </p>
        </section>

        <section className="section" id="college">
          <h2>Our College</h2>
          <p>
            Rajiv Gandhi University of Knowledge and Technologies was founded in
            2013, and over the years, it has grown into one of the most prestigious
            institutions in the region. With a strong emphasis on academic excellence,
            innovation, and holistic development, we have produced graduates who are
            leaders in their respective fields.
          </p>
          <img src="basar1.jpg" alt="College Image" />
        </section>

        <section className="section" id="values">
          <h2>Our Values</h2>
          <p>
            At RGUKT-B, we believe in fostering an environment of respect, inclusivity,
            and creativity. Our core values include:
          </p>
          <ul>
            <li>Academic Excellence</li>
            <li>Innovation and Critical Thinking</li>
            <li>Integrity and Responsibility</li>
            <li>Community Engagement</li>
            <li>Lifelong Learning</li>
          </ul>
        </section>

        <section className="section" id="impact">
          <h2>Our Impact</h2>
          <p>
            Throughout its history, RGUKT has made significant contributions to the
            academic and professional landscape. Our alumni have excelled in various
            fields, including business, science, arts, and public service. The legacy of
            our college continues to grow, with alumni making an impact around the world.
          </p>
        </section>

        <section className="section" id="contact">
          <h2>Stay Connected</h2>
          <p>
            We encourage all alumni to stay connected with the college and with each
            other. Through this platform, you can update your profile, participate in
            events, and contribute to the college’s growth by mentoring students and
            supporting initiatives that benefit the community.
          </p>
          <Link to="/signup" className="btn">
            Join Us
          </Link>
        </section>
      </div>
      <main className="image-section">
      <div className="alumni-photos">
          <div className="im">
            <img src={image1} alt={'image1'} />
          </div>
          <div className="im">
            <img src={image2} alt={'image2'} />
          </div>
      </div>
      </main>
      <div className="im1">
            <img src={image3} alt={'image3'} />
          </div>
      <footer>
        <p>&copy; 2024 RGUKT. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default About;
