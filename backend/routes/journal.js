const express = require("express");
const JournalEntry = require("../models/JournalEntry");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, content, date } = req.body;

    const newEntry = new JournalEntry({
      userId: req.user.id, 
      title,
      content,
      date,
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: "Failed to save journal entry" });
  }
});


router.get("/entries", authMiddleware, async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.user.id });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch journal entries" });
  }
});


router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const entry = await JournalEntry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!entry) return res.status(404).json({ error: "Entry not found" });

    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ error: "Failed to update entry" });
  }
});


router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const entry = await JournalEntry.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!entry) return res.status(404).json({ error: "Entry not found" });

    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete entry" });
  }
});

module.exports = router;

