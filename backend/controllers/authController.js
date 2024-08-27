import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'hasini1234'; 

export const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Validate input
      if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required.' });
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists.' });
  
      // Create new user
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      console.error('Error in register controller:', error);
      res.status(500).json({ message: 'Server error occurred.' });
    }
  };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
