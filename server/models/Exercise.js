const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: String,
  sets: [{
    reps: Number,
    weight: Number
  }]
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = {
  Exercise,        // Export the model
  exerciseSchema   // Export the schema
};
