const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Admin = require('../models/Admin');
const FormData = require('../models/formData');
const Student = require('../models/Student');
const Notice = require('../models/Notice');
const Message = require('../models/Message'); // make sure this exists
const verifyAdmin = require('../middleware/verifyAdmin');
const { getMessages, deleteMessage,getAllAdmins,verifyMessage } = require('../controllers/adminController.js');


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'your_jwt_secret_here';

// ---------------------- ADMIN SIGNUP ----------------------
router.post('/signup', async (req, res) => {
  const { name, job_id, email_id, password, qualification, work_experience, joining_date } = req.body;

  try {
    const employee = await mongoose.connection.db
      .collection('employee_details')
      .findOne({ job_id });

    if (!employee) return res.status(403).json({ message: 'You are not authorized as admin' });

    const existingAdmin = await Admin.findOne({ job_id });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      name,
      job_id,
      email_id,
      password: hashedPassword,
      qualification,
      work_experience,
      joining_date
    });

    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ---------------------- ADMIN LOGIN ----------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    console.log('Generated token:', token); // <--- Check it here
    console.log('Admin ID:', admin._id, 'Admin email:', admin.email_id);

    res.json({ token, admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------- ADD STUDENT ----------------------
router.post('/students', verifyAdmin, async (req, res) => {
  const { name, id_no, email, branch, graduation_year } = req.body;
  try {
    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Student already exists' });

    const student = new Student({ name, id_no, email, branch, graduation_year });
    await student.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ---------------------- POST NOTICE ----------------------
router.post('/notices', verifyAdmin, async (req, res) => {
  try {
    const { title, description } = req.body;
    const notice = new Notice({ title, description });
    await notice.save();
    res.status(201).json({ message: 'Notice posted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------------- GET MESSAGES ----------------------
router.get('/contact_admin', verifyAdmin, getMessages);
// GET all notices
router.get('/notices', verifyAdmin, async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 }); // latest first
    res.json(notices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


// ---------------------- VERIFY MESSAGE ----------------------

router.post('/verify-messages', verifyAdmin, verifyMessage);
// DELETE a message by _id
router.delete('/messages/:id', verifyAdmin, deleteMessage);
// Get all admin emails
router.get('/get-all', getAllAdmins);
// Delete a notice by ID
router.delete("/delete-notice/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Notice.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    console.error("Error deleting notice:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Get all notices
router.get("/public/notices", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
