const express = require('express');
const Workout = require('../models/Workout');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log("No token provided");
    return res.status(403).json({ message: 'Token not provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Unauthorized attempt", err.message);
      return res.status(401).json({ message: 'Unauthorized', error: err.message });
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
    console.log("Error fetching workouts", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Log a new workout for the user
router.post('/', verifyToken, async (req, res) => {
  console.log("Attempting to log workout", req.body);
  try {
    const { date, exercises } = req.body;
    if (!req.userId) {
      console.log("User ID not found in request");
      return res.status(400).json({ message: 'User ID is required' });
    }
    const newWorkout = new Workout({
      userId: req.userId,
      workoutId: mongoose.Types.ObjectId(), // Generate a new ObjectId, or ensure it's passed in.
      date,
      exercises: exercises.map(ex => ({
        name: ex.name,
        sets: ex.sets.map(set => ({
          reps: set.reps,
          weight: set.weight
        }))
      }))
    });
    await newWorkout.save();
    console.log("Workout logged successfully");
    res.status(201).json({ message: 'Workout logged successfully' });
  } catch (error) {
    console.log("Error logging workout", error.message);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
