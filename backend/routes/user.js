const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { body, validationResult } = require("express-validator");

// Signup route
router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Invalid Email address."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should at least have 6 characters"),
  ],
  async (req, res) => {
    const { username, email, password, createdAt, updatedAt } = req.body;
    try {
      // Check if username exists
      const existingUsername = await userModel.findOne({ username });
      if (existingUsername) {
        return res.status(400).send({ message: "Username already exists." });
      }

      // Check if email exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email address already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
        createdAt,
        updatedAt,
      });
      await newUser.save();

      // Respond with success
      return res
        .status(201)
        .json({
          message: "User created successfully.",
          username: newUser.username,
        });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Login route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email address."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should at least have 6 characters"),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find the user by email
      const user = await userModel.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "User with this email not found!" });
      }

      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Password is incorrect!" });
      }

      // Create a JWT token with username
      const userToken = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Respond with the success message and token
      return res.status(200).json({
        message: "Login Successful.",
        token: userToken,
        username: user.username,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
