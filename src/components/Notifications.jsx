
// import React, { useState, useEffect } from "react";
// import './Notifications.css';

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
 

//   // Fetch notifications from the backend
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/contact");
//         if (response.ok) {
//           const data = await response.json();
//           setNotifications(data); // Set the notifications data
//         } else {
//           alert("Failed to fetch notifications");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         alert("An error occurred while fetching notifications");
//       }
//     };

//     fetchNotifications();
//   }, []);

//   return (
//     <div>
      
//       <div className="notification-list">
//       <h2>Notifications:</h2>
//         {notifications.length > 0 ? (         
//           notifications.map((notification) => (
//             <div key={notification._id} className="notification-card">
//               <p><strong>Sender:</strong> {notification.sender}</p>
//               <p><strong>Subject:</strong> {notification.subject}</p>
//               <p><strong>Message:</strong> {notification.message}</p>
//               <p><strong>Received at:</strong> {new Date(notification.timestamp).toLocaleString()}</p>
//             </div>
//           ))
//         ) : (
//           <p>No notifications found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Notifications;




// import React, { useState, useEffect } from "react";
// import './Notifications.css';

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     console.log("Fetching notifications...");
//     const fetchNotifications = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/contact");
//         if (response.ok) {
//           const data = await response.json();
//           console.log("Notifications data:", data);
//           setNotifications(data); // Set the notifications data
//         } else {
//           alert("Failed to fetch notifications");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         alert("An error occurred while fetching notifications");
//       }
//     };
  
//     fetchNotifications();
//   }, []);
  
//   return (
//     <div>
//       <div className="notification-list">
//         <h2>Notifications:</h2>
//         {notifications.length > 0 ? (
//           notifications.map((notification) => (
//             <div key={notification._id} className="notification-card">
//               <div className="notification-header">
//                 {notification.senderDetails ? (
//                   <>
//                     <img
//                       src={`http://localhost:5000${notification.senderDetails.profilePicture}`}
//                       alt="Profile"
//                       className="profile-picture"
//                     />
//                     <p><strong>{notification.senderDetails.name}</strong></p>
//                     <p>{notification.senderDetails.email}</p>
//                   </>
//                 ) : (
//                   <p><strong>Sender information not found</strong></p>
//                 )}
//               </div>
//               <p><strong>Subject:</strong> {notification.subject}</p>
//               <p><strong>Message:</strong> {notification.message}</p>
//               <p><strong>Received at:</strong> {new Date(notification.timestamp).toLocaleString()}</p>
//             </div>
//           ))
//         ) : (
//           <p>No notifications found</p>
//         )}
//       </div>
//     </div>
//   );
// };





import React, { useState, useEffect } from "react";
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null); // To track errors
  const userEmail = localStorage.getItem("userEmail"); // Get the user email from localStorage

  useEffect(() => {
    console.log("Fetching notifications...");
    const fetchNotifications = async () => {
      try {
        if (!userEmail) {
          setError("User is not logged in.");
          return;
        }
        
        const response = await fetch(`http://localhost:5000/api/contact?receiver=${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Notifications data:", data);
          if (data.length === 0) {
            setError("No notifications found.");
          } else {
            setNotifications(data); // Set the notifications data
          }
        } else {
          setError("No Notifications to you.");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("An error occurred while fetching notifications.");
      }
    };

    fetchNotifications();
  }, [userEmail]); // Re-run the effect when the userEmail changes

  if (error) {
    return <p className="error-message">{error}</p>; // Show error message if any
  }

  return (
    <div>
      <div className="notification-list">
        <h2>Notifications:</h2>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification._id} className="notification-card">
              <div className="notification-header">
                {notification.senderDetails ? (
                    <div className="img-info">
                    <img
                      src={`http://localhost:5000${notification.senderDetails.profilePicture}`}
                      alt="Profile"
                      className="profile-picture"
                    />
                    
                    <p><strong>{notification.senderDetails.fullName}</strong></p>
                   
                    {/* <p>{notification.senderDetails.email}</p> */}
                    </div>
                ) : (
                  <p><strong>Sender information not found</strong></p>
                )}
              <p><strong>Email:</strong> {notification.sender}</p>
              <p><strong>Subject:</strong> {notification.subject}</p>
              {/* <p><strong>Message:</strong> {notification.message}</p> */}
              <p><strong>Received at:</strong> {new Date(notification.timestamp).toLocaleString()}</p><br></br>
            </div>  
            <div className="desc">
                          <p><strong>Message:</strong> {notification.message}</p>
              </div>
            </div>

          ))
        ) : (
          <p>No notifications found</p>
        )}
      </div>
    </div>
  );
};
export default Notifications;
