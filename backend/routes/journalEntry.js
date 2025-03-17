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
    type: String,  
    required: true,
  },
});

const JournalEntry = mongoose.model('JournalEntry', journalSchema);

module.exports = JournalEntry;
