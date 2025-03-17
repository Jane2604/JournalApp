const express = require("express");
const JournalEntry = require("../models/JournalEntry");
const authMiddleware = require("../middleware/auth"); 

const router = express.Router();
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, content, date } = req.body;
    if (!title || !content || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newEntry = new JournalEntry({
      title,
      content,
      date: new Date(date), 
      userId: req.userId, 
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error adding journal entry:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;