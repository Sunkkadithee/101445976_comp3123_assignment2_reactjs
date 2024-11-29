const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");  // Add user routes
const employeeRoutes = require("./routes/employee");  // Add employee routes

const DB_CONNECTION_STRING = "mongodb+srv://Pang:DVAgIps2oDeDLLz6@cluster0.4myr2.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority";

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error: ", err);
});

const app = express();
const SERVER_PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/user", userRoutes);  // User routes for signup, login
app.use("/api/v1/emp", employeeRoutes);  // Employee routes for CRUD operations

// Base route
app.get("/", (req, res) => {
    res.send("<h1>MongoDB + Mongoose Example</h1>");
});

// Start the server
app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});
