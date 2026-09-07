const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
// 1. Force the internal container port to match your Docker Compose setup (3000)
const PORT = 3000; 
const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:aa1234@mongo:27017/mydatabase?authSource=admin';

app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from your React frontend
  credentials: true
}));
app.use(express.json());

// MongoDB connection mapping logic
mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB inside Docker Network!'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); 
  });

// 2. Simple Schema structure for database persistence layers
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Baseline health check endpoint logic
app.get('/', (req, res) => {
  res.json({ status: "Backend is running flawlessly!", database: "Connected" });
});

// 3. ADDED: GET endpoint to fetch existing users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. ADDED: POST endpoint to create new users
app.post('/users', async (req, res) => {
  try {
    const newUser = new User({ name: req.body.name });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. ADDED: DELETE endpoint to clear users
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running smoothly on port ${PORT}`);
});
