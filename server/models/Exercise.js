const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
