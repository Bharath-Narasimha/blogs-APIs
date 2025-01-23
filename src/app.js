const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB(); // Call the database connection function

const app = express();

// Middleware setup
app.use(express.json());  // Use only express.json() to parse incoming JSON
app.use(cors());

// Import routes
const authRoutes = require('./routes/authRoutes');
const verifyRouter = require('./routes/verifyRoutes');
const blogRoutes = require('./routes/blogRoutes');  // Import blog routes

// Use routes
app.use('/api/auth', authRoutes);  // Register the auth routes
app.use('/verify', verifyRouter);  // Register the verification route
app.use('/api/blogs', blogRoutes);  // Register the blog routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
