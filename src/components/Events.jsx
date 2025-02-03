import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventForm = () => {
  const [eventData, setEventData] = useState({ title: '', description: '', date: '' });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/events', eventData);
      if (response.status === 201) {
        alert('Event added successfully!');
        navigate('/addevent'); 
        // navigate('/event');
      }
    } catch (error) {
      console.error('Failed to add event:', error);
      alert('Error adding event');
    }
  };

  return (
    <div>
      <h1>Add New Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Event Title"
          value={eventData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={eventData.description}
          onChange={handleChange}
          required
        />
        <input
          name="date"
          type="date"
          value={eventData.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default EventForm;



