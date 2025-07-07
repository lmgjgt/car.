import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: 'User already exists' });

    const user = await User.create({ username, email, password });
    res.json({ token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ token: generateToken(user._id) });
    } else {
      res.status(401).json({ msg: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
