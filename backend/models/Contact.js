
const mongoose=require("mongoose");

const ContactSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // Email of the sender
  receiver: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', ContactSchema);
module.exports=Contact;

