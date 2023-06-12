const mongoose = require('mongoose');
require('dotenv').config();

const scoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 999999,
  },
}, {
  collection: 'score',
  database: 'minesweeper',
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
