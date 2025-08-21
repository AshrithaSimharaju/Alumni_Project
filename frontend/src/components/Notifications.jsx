import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [adminEmails, setAdminEmails] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]); // Track expanded notifications
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userEmail) {
          setError("User is not logged in.");
          return;
        }

        // Fetch notifications for logged-in user
        const notifRes = await fetch(`http://localhost:5000/api/contact?receiver=${userEmail}`);
        if (!notifRes.ok) throw new Error("Failed to fetch notifications");
        const notifData = await notifRes.json();
        setNotifications(Array.isArray(notifData) ? notifData : []);

        // Fetch all admin emails
        const adminRes = await fetch("http://localhost:5000/api/admin/get-all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!adminRes.ok) throw new Error("Failed to fetch admin emails");
        const adminData = await adminRes.json();
        const emails = adminData.map(admin => admin.email_id.toLowerCase().trim());
        setAdminEmails(emails);

      } catch (err) {
        console.error(err);
        setError(err.message || "Error fetching data.");
      }
    };

    fetchData();
  }, [userEmail, token]);

  const handleSendReply = (notification) => {
    const senderEmail = (notification.sender || notification.admin_email || '').toLowerCase().trim();
    if (!senderEmail) return alert("No sender email found.");

    if (adminEmails.includes(senderEmail)) {
      navigate("/contact_admin", { state: { receiverEmail: senderEmail } });
    } else {
      navigate("/contact", { state: { receiverEmail: senderEmail } });
    }
  };

  const toggleExpand = (id) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
    );
  };

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="notification-list">
      <h2>Notifications:</h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => {
          const isExpanded = expandedIds.includes(notification._id);
          return (
            <div key={notification._id} className="notification-card">
              <div className="notification-header">
                <p><strong>From:</strong> {notification.sender || notification.admin_email}</p>
                <p><strong>Subject:</strong> {notification.subject || "No subject"}</p>
                <button 
                  className="toggle-arrow" 
                  onClick={() => toggleExpand(notification._id)}
                >
                  {isExpanded ? "⬆" : "⬇"}
                </button>
              </div>

              {isExpanded && (
                <div className="notification-message">
                  <p><strong>Received at:</strong> {new Date(notification.timestamp).toLocaleString()}</p>
                  <p><strong>Message:</strong> {notification.message || "No message"}</p>
                  <button className="btn-reply" onClick={() => handleSendReply(notification)}>
                    Send Reply
                  </button>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No notifications found</p>
      )}
    </div>
  );
};

export default Notifications;
