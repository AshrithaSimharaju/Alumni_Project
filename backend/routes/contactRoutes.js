const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact_admin');

// GET all admin messages
router.get('/contact_admin', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST contact message
router.post('/contact_admin', async (req, res) => {
  try {
    const { sender, receiver, subject, message } = req.body;

    if (!sender || !receiver || !message) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    const newMessage = new Contact({
      sender_email: sender,
      email_admin: receiver,
      subject,
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
