// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AddEvent = () => {
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate();

//   // Fetch events when the component mounts
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/events');
//         setEvents(response.data);
//       } catch (err) {
//         console.error('Error fetching events:', err);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const handleAddEvent = () => {
//     navigate('/LoginAdm'); // Redirect to login page
//   };
//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <div>
//       <h1>Events</h1>
//       <ul>
//         {events.map((event) => (
//           <li key={event._id}>
//             <h2>{event.title}</h2>
//             <p>{event.description}</p>
//             <p>Date: {new Date(event.date).toLocaleDateString()}</p>
//           </li>
//         ))}
//       </ul>
//       <div className="event-button">
//       <button onClick={handleAddEvent}>Add Event</button>
//       <button type="button" onClick={handleBack} style={{ marginTop: "10px" }}>
//               Back
//             </button>
//             </div>
//     </div>
//   );
// };

// export default AddEvent;

















import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddEvent.css'; // Make sure to import the CSS file

const AddEvent = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = () => {
    navigate('/LoginAdm'); // Redirect to login page
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    
    <div className="add-event-container">
      <h1>Events</h1>
  <div className="add">   <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul></div>
      <div className="event-button">
        <button onClick={handleAddEvent}>Add Event</button>
        <button type="button" onClick={handleBack} style={{ marginTop: "10px" }}>
          Back
        </button>
      </div>
    </div>
  );
};

export default AddEvent;
