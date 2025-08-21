
const express = require('express');
const Contact = require('../models/Contact');
const Profiles = require('../models/Profiles');

const router = express.Router();

// POST route to handle contact form submission
router.post('/', async (req, res) => {
  const { sender, receiver, subject, message } = req.body;

  // Validation
  if (!sender || !receiver || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Create a new contact message
    const newMessage = new Contact({
      sender,
      receiver,
      subject,
      message,
      timestamp: new Date(),
    });

    const savedMessage = await newMessage.save();
    res.status(201).json({ message: 'Message successfully sent!', contact: savedMessage });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Failed to send the message. Please try again later.' });
  }
});

// GET route to fetch notifications by receiver email
router.get('/', async (req, res) => {
  const { receiver } = req.query;

  if (!receiver) {
    return res.status(400).json({ message: 'Receiver email is required.' });
  }

  try {
    const notifications = await Contact.find({ receiver });

    if (!notifications.length) {
      return res.status(404).json({ message: 'No notifications found.' });
    }

    // Populate sender details from Profiles
    const notificationsWithSenderDetails = await Promise.all(
      notifications.map(async (notification) => {
        const senderProfile = await Profiles.findOne({ email: notification.sender });
        return {
          ...notification._doc,
          senderDetails: senderProfile
            ? {
                fullName: senderProfile.fullName,
                profilePicture: senderProfile.profilePicture,
                email: senderProfile.email,
              }
            : null,
        };
      })
    );

    res.status(200).json(notificationsWithSenderDetails);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

module.exports = router;
