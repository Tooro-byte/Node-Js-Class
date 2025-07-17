const express = require("express");
const router = express.Router();

const addMyFarmers = require("../models/FarmersModel");
const User = require("../models/User");

router.get("/addFarmer", (req, res) => {
  res.render("farmers");
});

// Add a post route
router.post("/addFarmer", (req, res) => {
  console.log(req.body);
  const newFarmer = new addMyFarmers(req.body);
  newFarmer.save();
});

//Get List of Users from the data base
router.get("/userlist", async (req, res) => {
  try {
    let users = await User.find().sort({ $natural: -1 });
    res.render("usersList", { users });
  } catch (error) {
    res.status(400).send("Unable to find requested Users");
  }
});

module.exports = router;
