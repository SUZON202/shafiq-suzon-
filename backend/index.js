console.log(">>> RUNNING FILE VERSION: TEST-123 <<<");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Atlas কানেকশন (এখন এটি সিকিউর করা হয়েছে)
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ==========================================
// ১. User Schema & API
// ==========================================
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, default: 'user' },
  status: String,
  avatar: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// সব ইউজার দেখার রাউট
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ইউজারের ইমেইল দিয়ে তার রোল (Role) বের করার রাউট
app.get('/users/email/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// ইউজারের রোল আপডেট করার রাউট
app.patch('/users/role/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { role } = req.body;
    
    // ডাটাবেসে ইউজারের রোল আপডেট করা হচ্ছে
    const result = await User.findByIdAndUpdate(
      id, 
      { role: role }, 
      { new: true }
    );
    
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({ success: true, message: `Role updated to ${role}`, user: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to update role" });
  }
});

// ইউজার ডিলিট করার রাউট
app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "User not found" });
    res.json({ deletedCount: 1, success: true, message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// ==========================================
// ২. Contact Message Schema & API
// ==========================================
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const ContactMessage = mongoose.model('ContactMessage', contactSchema);

app.post('/contact', async (req, res) => {
  try {
    const newMessage = new ContactMessage(req.body);
    await newMessage.save();
    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.get('/contact-messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

app.delete('/contact-messages/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ContactMessage.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "Message not found" });
    res.json({ deletedCount: 1, success: true, message: "Message deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
});

// ==========================================
// ৩. Project Schema & API
// ==========================================
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  liveLink: String,
  githubLink: String
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

// নতুন প্রজেক্ট অ্যাড করার রাউট
app.post('/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const result = await newProject.save();
    res.status(201).json({ success: true, message: "Project added successfully!", project: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to add project" });
  }
});

// সব প্রজেক্ট দেখার রাউট
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// প্রজেক্ট ডিলিট করার রাউট
app.delete('/projects/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Project.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "Project not found" });
    res.json({ deletedCount: 1, success: true, message: "Project deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// ==========================================
// Default Route & Server Start
// ==========================================
app.get('/', (req, res) => {
  res.send("Shafiq Suzon Portfolio Backend is Running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});