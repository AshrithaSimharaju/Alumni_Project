import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import contactImage from '../assets/contact.jpeg';
import './ContactForm.css';

const ContactForm = ({ receiverEmail }) => {
  const [formData, setFormData] = useState({
    sender: "", // Sender's email entered by user
    receiver: receiverEmail || "", // Receiver's email if provided
    subject: "general",
    message: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        // Reset form after submission
        setFormData({
          sender: "",
          receiver: receiverEmail || "",
          subject: "general",
          message: "",
        });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div>
      <header>
  <h1>Contact</h1>
</header>


      <main>
        <div className="content-wrapper">
          <div className="card">
            <div className="contact-img">
            <img src={contactImage} alt="Contact Us" className="contact-image" />
            </div>
            <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="sender">Your Email (Sender)</label>
                <input
                  type="email"
                  id="sender"
                  name="sender"
                  value={formData.sender}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="receiver">Receiver's Email</label>
                <input
                  type="email"
                  id="receiver"
                  name="receiver"
                  value={formData.receiver}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="general">General Inquiry</option>
                  <option value="event">Event Registration</option>
                  <option value="donation">Donation</option>
                  <option value="internship">Internship</option>
                  <option value="jobsearch">Job Search</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            <div className="btn">
              <button type="submit" className="btnc">Submit</button>
              <button type="button" onClick={handleBack} className="btnc">
              Back
            </button>
            </div>
            </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactForm;

