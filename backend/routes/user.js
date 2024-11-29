const express = require("express");
const router = express.Router();
const User = require("../models/User");  // Assuming you have a User model

// User Signup
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const newUser = new User({
            username,
            email,
            password,  // Store the password as plain text (not recommended for real-world apps)
            created_at: new Date(),
            updated_at: new Date()
        });
        
        const savedUser = await newUser.save();
        res.status(201).json({
            message: "User created successfully.",
            user_id: savedUser._id
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Error creating user.",
            error: err.message
        });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }
        
        // Check password (no hashing)
        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid email or password." });
        }
        
        res.status(200).json({ message: "Login successful." });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Error logging in.",
            error: err.message
        });
    }
});

module.exports = router;
