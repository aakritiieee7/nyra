const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8000; // Your updated backend port

// CORS configuration (should be very early in middleware stack)
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers to be sent
    credentials: true // Allow cookies/authorization headers to be sent
}));
app.use(express.json()); // Enable parsing of JSON data in request bodieccs

// Temporary CORS test route (can be removed after troubleshooting)
app.get('/test-cors', (req, res) => {
    res.status(200).json({ message: 'CORS test successful!' });
});

// Database Connection
mongoose.connect('mongodb://localhost:27017/packedright')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// --- MongoDB Schemas and Models ---

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
const User = mongoose.model('User', UserSchema);

// Scan History Schema
const ScanHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  material: { type: String, required: true },
  score: { type: String, required: true },
  confidence: { type: Number, required: true },
  imagePath: { type: String }
});
const ScanHistory = mongoose.model('ScanHistory', ScanHistorySchema);

// JWT Secret Key
const JWT_SECRET = 'your_super_secret_jwt_key_here';

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- API Endpoints ---

// User Registration Route
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Username or email already exists.' });
    }
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration.', error: error.message });
  }
});

// User Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Logged in successfully!', token, userId: user._id, username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.', error: error.message });
  }
});

// --- Mock Data (can be removed once AI model is integrated) ---
const staticMaterialData = {
    plastic: {
      eco_score: "C",
      grade: "C",
      layers: 1,
      recyclability: 0.5,
      note: "Widespread use but poor degradation.",
      disposal: "Recycle if local facility accepts.",
      impact: "500 kg of plastic avoided per 1000 users/year",
      suggestion: "Try switching to paper or reusable alternatives."
    },
    paper: {
      eco_score: "A",
      grade: "A",
      layers: 1,
      recyclability: 0.85,
      note: "Easily biodegradable and recyclable.",
      disposal: "Dry waste bin or compost if clean.",
      impact: "Excellent choice- minimal impact",
      suggestion: "Keep using sustainable packaging!"
    },
    glass: {
      eco_score: "B",
      grade: "B",
      layers: 1,
      recyclability: 0.9,
      note: "Highly recyclable but energy-intensive.",
      disposal: "Recycle separately.",
      impact: "Energy-intensive but reusable",
      suggestion: "Reuse glass jars and bottles"
    },
    cardboard: {
      eco_score: "A",
      grade: "A",
      layers: 1,
      recyclability: 0.8,
      note: "Biodegradable and compostable.",
      disposal: "Compost or recycle clean cardboard.",
      impact: "Minimal packaging footprint",
      suggestion: "Use recycled cardboard variants"
    },
    metal: {
      eco_score: "B",
      grade: "B",
      layers: 1,
      recyclability: 0.8,
      note: "Good recyclability, durable.",
      disposal: "Recycle in dry waste.",
      impact: "High mining impact- recycle always",
      suggestion: "Choose aluminum over steel if possible"
    }
};

const materialDistribution = {
    labels: ['Plastic', 'Paper', 'Glass', 'Metal'],
    values: [40, 30, 20, 10],
    colors: ['#ef4444', '#22c55e', '#a855f7', '#f97316'],
};

// --- Protected Routes (Require Authentication) ---

// API endpoint for image upload and analysis
app.post('/api/scan', authenticateToken, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  // Simulate AI prediction
  const materials = ["plastic", "paper", "glass", "cardboard", "metal"];
  const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
  const confidence = Math.floor(Math.random() * (99 - 70 + 1)) + 70;

  const extraInfo = staticMaterialData[randomMaterial];

  const result = {
    material: randomMaterial.charAt(0).toUpperCase() + randomMaterial.slice(1),
    confidence: confidence,
    score: extraInfo?.eco_score || "C",
    summary: extraInfo?.note || "No info available.",
    recommendations: [extraInfo?.suggestion || "Try alternatives."],
    recyclability: extraInfo?.recyclability,
    disposal: extraInfo?.disposal,
    impact: extraInfo?.impact,
  };

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Save scan history to database for the authenticated user
  try {
    console.log('Attempting to save scan for userId:', req.user.id); // ✅ Log added
    const newScan = new ScanHistory({
      userId: req.user.id,
      date: new Date(),
      material: result.material,
      score: result.score,
      confidence: result.confidence,
      imagePath: req.file.path
    });
    await newScan.save();
    console.log('Scan successfully saved to DB for userId:', req.user.id); // ✅ Log added
  } catch (dbError) {
    console.error('Error saving scan history to database:', dbError);
  }

  res.json(result);
});

// API endpoint for fetching user-specific scan history
app.get('/api/scan-history', authenticateToken, async (req, res) => {
  try {
    console.log('Attempting to fetch scan history for userId:', req.user.id); // ✅ Log added
    const history = await ScanHistory.find({ userId: req.user.id }).sort({ date: -1 });
    console.log('Fetched history from DB:', history); // ✅ Log added
    // Format the history for the frontend
    const formattedHistory = history.map(item => ({
      id: item._id.toString(),
      date: item.date.toISOString(),
      material: item.material,
      score: item.score,
      confidence: item.confidence
    }));
    res.json(formattedHistory);
  } catch (error) {
    console.error('Error fetching scan history:', error);
    res.status(500).json({ message: 'Error fetching scan history.', error: error.message });
  }
});

// API endpoint for material distribution
app.get('/api/material-distribution', async (req, res) => {
  res.json({ data: materialDistribution });
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});