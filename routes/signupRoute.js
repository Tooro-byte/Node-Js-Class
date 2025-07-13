const express = require("express");
const router = express.Router();

const signupModel = require("../models/signupModel");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const newSignUp = new signupModel(req.body);
    await newSignUp.save();
  } catch (error) {
    console.error(error);
    res.status(400).render("signup");
  }
});

module.exports = router;
