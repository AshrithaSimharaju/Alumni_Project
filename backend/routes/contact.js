// import express from "express";
// import Contact from "../models/Contact.js";
// import Profiles from '../models/Profiles.js' // Import the schema

// const router = express.Router();

// // POST route to handle contact form submission
// router.post("/", async (req, res) => {
//   const { sender, receiver, subject, message } = req.body;

//   // Validation
//   if (!sender || !receiver || !subject || !message) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   try {
//     // Create a new contact message
//     const newMessage = new Contact({
//       sender,
//       receiver,
//       subject,
//       message,
//       timestamp: new Date(),
//     });

//     // Save the message to the database
//     await newMessage.save();
//     res.status(201).json({ message: "Message successfully sent!" });
//   } catch (error) {
//     console.error("Error saving message:", error);
//     res.status(500).json({ message: "Failed to send the message. Please try again later." });
//   }
// });

// router.get("/", async (req, res) => {
//     try {
//       const notifications = await Contact.find().sort({ timestamp: -1 }); // Sort by most recent
//       res.status(200).json(notifications);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//       res.status(500).json({ message: "Failed to fetch notifications." });
//     }
//   });

// export default router;



import express from "express";
import Contact from "../models/Contact.js";
import Profiles from '../models/Profiles.js' // Import the schema

const router = express.Router();

// POST route to handle contact form submission
router.post("/", async (req, res) => {
  const { sender, receiver, subject, message } = req.body;

  // Validation
  if (!sender || !receiver || !subject || !message) {
    return res.status(400).json({ message: "All fields are required." });
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

    // Save the message to the database
    await newMessage.save();
    res.status(201).json({ message: "Message successfully sent!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ message: "Failed to send the message. Please try again later." });
  }
});


router.get('/', async (req, res) => {
  const { receiver } = req.query; // Get receiver email from query parameters

  if (!receiver) {
    return res.status(400).json({ message: "Receiver email is required." });
  }

  try {
    // Fetch notifications where the receiver is the logged-in user's email
    const notifications = await Contact.find({ receiver });

    if (notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found.' });
    }

    // Add sender details (username, image) from the Profiles collection
    const notificationsWithSenderDetails = await Promise.all(
      notifications.map(async (notification) => {
        const senderProfile = await Profiles.findOne({ email: notification.sender });
        return {
          ...notification._doc,
          senderDetails: senderProfile || null,
        };
      })
    );

    res.status(200).json(notificationsWithSenderDetails);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});
export default router;