const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date, 
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const JournalEntry = mongoose.model('data', journalSchema);

module.exports = JournalEntry;
