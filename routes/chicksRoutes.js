const express = require("express");
const router = express.Router();

const chickStock = require("../models/ChicksModel");
const Stock = require("../models/chickStock");

router.get("/addChicks", (req, res) => {
  res.render("chicks");
});
// A post route to send Data to the Data Base.

router.post("/addChicks", async (req, res) => {
  try {
    console.log(req.body);
    const newStock = new chickStock(req.body);
    await newStock.save();
  } catch (error) {
    console.error(error);
    res.status(400).render("chicks");
  }
});

router.get("/addStock", (req, res) => {
  res.render("chickStock");
});
// A post route to send Data to the Data Base.

router.post("/addStock", async (req, res) => {
  try {
    console.log(req.body);
    const newRequest = new Stock(req.body);
    await newRequest.save();
  } catch (error) {
    console.error(error);
    res.status(400).render("chickStock");
  }
});

module.exports = router;

// req- Handles incoming data such as form data or query params, i.e req.body
// res- An object of methods for sending data back to th user. i.e res.send, res.render, res.sendFile etc.
