const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const { connect } = require('./connect');
const app = express();

// Middleware
app.use(express.json());

// Import routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    // Connect to MongoDB Atlas using Mongoose
    await connect();
    console.log(`Server started on port ${PORT}`);
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error);
    process.exit(1);
  }
});