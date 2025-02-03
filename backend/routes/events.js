import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// Route to fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events); // Send the fetched events
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events', error });
  }
});

// Route to create an event
router.post('/', async (req, res) => {  // Fixed to handle POST at '/api/events'
  try {
    const { title, description, date } = req.body;
    const newEvent = new Event({
      title,
      description,
      date,
      createdBy: 'Admin', // You can replace 'Admin' with dynamic user info
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Failed to create event', error });
  }
});

export default router;
