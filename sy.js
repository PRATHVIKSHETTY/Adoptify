require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Define a Schema
const adoptionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
  dob: String,
  address: String,
  native: String,
  reason: String,
  petName: String,
  petName: String, // Added animalName field
  familyStatus: String,
});

 
// Handle form submission
app.post("/submit-form", async (req, res) => {
  try {
    const newAdoption = new Adoption(req.body);
    await newAdoption.save();
    res.status(201).send("Form submitted successfully");
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).send("Server error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
