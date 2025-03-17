const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();


router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });


    const hashedPassword = await bcrypt.hash(password, 10);
    
    
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

  
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in signup", error: error.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

 
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error in login", error: error.message });
  }
});

module.exports = router;
