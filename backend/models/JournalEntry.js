const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const JournalEntry = mongoose.model("JournalEntry", journalSchema); // Fix this line

module.exports = JournalEntry;

 

 