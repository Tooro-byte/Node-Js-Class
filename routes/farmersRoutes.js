const express = require("express");
const router = express.Router();

const addMyFarmers = require("../models/FarmersModel");

router.get("/addFarmer", (req, res) => {
  res.render("farmers");
});

// Add a post route
router.post("/addFarmer", (req, res) => {
  console.log(req.body);
  const newFarmer = new addMyFarmers(req.body);
  newFarmer.save();
});

module.exports = router;
