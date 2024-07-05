const express = require('express');
const Workout = require('../models/Workout');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create workout
router.post('/', protect, async (req, res) => {
  const { date, exercises } = req.body;

  try {
    const workout = new Workout({
      user: req.user._id,
      date,
      exercises,
    });

    const createdWorkout = await workout.save();
    res.status(201).json(createdWorkout);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all workouts for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
