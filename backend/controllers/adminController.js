const Admin = require('../models/Admin.js');
const Notice = require('../models/Notice.js');
const Student = require('../models/Student.js');        // for verification
const ContactAdmin = require('../models/Contact_admin.js'); // messages collection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const { sendEmail } = require('../utils/sendEmail.js');

// ================= Admin Login =================
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= Alumni Notifications =================
const getAlumniNotifications = async (req, res) => {
  try {
    const alumniList = await Alumni.find({ invitationStatus: "pending" });
    res.json(alumniList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= Approve/Reject Invitation =================
const approveInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'approved' or 'rejected'
    const alumni = await Alumni.findByIdAndUpdate(id, { invitationStatus: action }, { new: true });

    await sendEmail(alumni.email, `Invitation ${action}`, `Your invitation has been ${action} by admin.`);
    res.json({ message: `Invitation ${action}`, alumni });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= Post Notice =================
const postNotice = async (req, res) => {
  try {
    const { title, content } = req.body;
    const notice = new Notice({ title, content, postedBy: req.admin.id });
    await notice.save();
    res.json({ message: "Notice posted", notice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= Send Message to Alumni =================
const sendMessageToAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const alumni = await Alumni.findById(id);
    alumni.messages.push({ sender: "admin", message });
    await alumni.save();

    await sendEmail(alumni.email, "Message from Admin", message);
    res.json({ message: "Message sent", alumni });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= Get Messages from ContactAdmin =================
// GET /api/admin/contact_admin
const getMessages = async (req, res) => {
  try {
    if (!req.admin) return res.status(401).json({ message: 'Admin not found in request' });

    const adminEmail = req.admin.email_id.toLowerCase().trim(); // normalize
    console.log('Fetching messages for admin email:', adminEmail);

    const messages = await ContactAdmin.find({
      email_admin: { $regex: new RegExp(`^${adminEmail}$`, 'i') } // case-insensitive
    }).sort({ createdAt: -1 });

    console.log('Messages found:', messages.length);
    res.json(messages);
  } catch (err) {
    console.error('Error in getMessages:', err);
    res.status(500).json({ error: err.message });
  }
};


// ================= Delete Message =================
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const msg = await ContactAdmin.findByIdAndDelete(id);
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyMessage = async (req, res) => {
  try {
    let { email_id } = req.body; // received from frontend
    if (!email_id) {
      return res.status(400).json({
        authorized: false,
        message: 'No email provided.'
      });
    }

    email_id = String(email_id).toLowerCase().trim();

    // Find student by email
    const student = await Student.findOne({ email: email_id });

    if (!student) {
      // Not found → delete messages from this sender
      await ContactAdmin.deleteMany({ sender_email: email_id });
      return res.json({
        authorized: false,
        message: 'Not authorized: email not found in students. Message(s) deleted.'
      });
    }

    // Student exists → authorized
    return res.json({
      authorized: true,
      message: 'Authorized sender.'
    });
  } catch (err) {
    console.error('Verify Message Error:', err);
    return res.status(500).json({
      authorized: false,
      message: 'Server error verifying sender.'
    });
  }
};



// ================= Export All Functions =================
module.exports = {
  adminLogin,
  getAlumniNotifications,
  approveInvitation,
  postNotice,
  sendMessageToAlumni,
  getMessages,
  deleteMessage,
  getAllAdmins,
  verifyMessage
};
