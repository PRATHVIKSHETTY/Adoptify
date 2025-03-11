require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Import Models
const Adoption = require("./models/adoption");
const Pet = require("./models/Pet");
const Donation = require("./models/Donation");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve images from the 'image' folder
app.use('/image', express.static(path.join(__dirname, 'image')));

// Ensure MongoDB URI is set
if (!process.env.MONGO_URI) {
  console.error("MongoDB URI is missing in the environment variables.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

/**
 *  Route: Add a New Pet
 *  Method: POST
 *  Endpoint: /pets
 */
app.post("/pets", async (req, res) => {
  try {
    const { name, gender, age, size, description, traits, image } = req.body;

    // Validate required fields
    if (!name || !gender || !age || !size || !description || !traits || !image) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newPet = new Pet({
      name,
      gender,
      age,
      size,
      description,
      traits,  // Ensure traits is an array
      image
    });

    await newPet.save();

    res.status(201).json({ message: "Pet added successfully!", petId: newPet._id });
  } catch (error) {
    console.error("🔥 Error adding pet:", error);
    res.status(500).json({ message: "Server error while adding pet.", error: error.message });
  }
});

/**
 *  Route: Fetch Pets
 *  Method: GET
 *  Endpoint: /pets
 */
app.get("/pets", async (req, res) => {
  const { name } = req.query;
  try {
    const pets = name ? await Pet.find({ name }) : await Pet.find();
    if (pets.length > 0) {
      res.json(pets);
    } else {
      res.status(404).json({ message: "No pets found" });
    }
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ message: "Error fetching pets" });
  }
});

/**
 *  Route: Submit Adoption Form
 *  Method: POST
 *  Endpoint: /submit-form
 */
app.post("/submit-form", async (req, res) => {
  try {
    const newAdoption = new Adoption(req.body);
    await newAdoption.save();
    res.status(201).send("Form submitted successfully");
  } catch (error) {
    console.error("Error saving adoption form:", error);
    res.status(500).send("Server error");
  }
});

/**
 *  Route: Submit Donation
 *  Method: POST
 *  Endpoint: /donate
 */
app.post("/donate", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, amount, paymentMethod, anonymous, taxExemption } = req.body;
    
    // Validation of required fields
    if (!firstName || !email || !phone || !amount || !paymentMethod) {
      return res.status(400).json({ message: "Required fields missing!" });
    }

    const newDonation = new Donation({
      firstName,
      lastName,
      email,
      phone,
      amount,
      paymentMethod,
      anonymous: anonymous || false,
      taxExemption: taxExemption || "no",
    });

    await newDonation.save();
    res.status(201).json({ message: "Donation successful!" });
  } catch (error) {
    console.error("Error processing donation:", error);
    res.status(500).json({ message: "Error processing donation", error: error.message });
  }
});

/**
 *  Route: Fetch All Donations (For Admin)
 *  Method: GET
 *  Endpoint: /donations
 */
app.get("/donations", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ message: "Error fetching donations" });
  }
});

/**
 *  Route: Fetch All Adoption Requests (For Admin)
 *  Method: GET
 *  Endpoint: /adoptions
 */
app.get("/adoptions", async (req, res) => {
  try {
    const adoptions = await Adoption.find().sort({ createdAt: -1 });
    res.json(adoptions);
  } catch (error) {
    console.error("Error fetching adoption requests:", error);
    res.status(500).json({ message: "Error fetching adoption requests" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
