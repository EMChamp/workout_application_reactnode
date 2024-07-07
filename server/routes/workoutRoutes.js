const express = require('express');
const Workout = require('../models/Workout');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Get workouts for a specific user
router.get('/', verifyToken, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.userId });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Log a new workout for the user
router.post('/', verifyToken, async (req, res) => {
  try {
    const { date, exercises } = req.body;
    const newWorkout = new Workout({
      user: req.userId,
      date, 
      exercises,
    });
    await newWorkout.save();
    res.status(201).json({ message: 'Workout logged successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
