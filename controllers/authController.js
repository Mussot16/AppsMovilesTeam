const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate a JWT token for the user
function generateToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Register a new user
exports.register = async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  // Generate a JWT token for the user
  const token = generateToken(newUser);

  // Return the JWT token
  res.json({ token });
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate a JWT token for the user
  const token = generateToken(user);

  // Return the JWT token
  res.json({ token });
};

// Logout a user
exports.logout = (req, res) => {
  // Clear the JWT token from the client
  req.user = null;

  // Return a response indicating that the user has been logged out successfully
  res.json({ message: 'Logout successful' });
};