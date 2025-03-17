 // models/JournalEntry.js
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
     type: String,  // Store as string, but could also use Date type if preferred
     required: true,
   },
 });
 
 const JournalEntry = mongoose.model('data', data);
 
 module.exports = JournalEntry;
 