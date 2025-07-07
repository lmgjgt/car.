import express from 'express';
import ServiceRequest from '../models/ServiceRequest.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { service, details } = req.body;
  try {
    const newRequest = await ServiceRequest.create({
      user: req.user._id,
      service,
      details,
      payment: 'cod'
    });
    res.json(newRequest);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ user: req.user._id });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
