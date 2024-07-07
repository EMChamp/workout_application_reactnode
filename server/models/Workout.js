const mongoose = require('mongoose');
const { exerciseSchema } = require('./Exercise'); // Adjust the path as necessary

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workoutId: { type: String, required: true },
  date: Date,
  exercises: [exerciseSchema]
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
