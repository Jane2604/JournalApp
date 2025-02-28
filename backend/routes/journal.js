const express = require("express");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
router.get("/", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to your journal, ${req.user.email}!` });
});

module.exports = router;
