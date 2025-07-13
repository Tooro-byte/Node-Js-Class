const express = require("express");
const router = express.Router();

const loginModel = require("../models/loginModel");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const newLogin = new loginModel(req.body);
    await newLogin.save();
  } catch (error) {
    console.error(error);
    res.status(400).render("login");
  }
});

module.exports = router;
