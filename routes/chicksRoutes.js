const express = require("express");
const router = express.Router();

const chickStock = require("../models/ChicksModel");
const Stock = require("../models/chickStock");
const requestYourChicks = require("../models/chickRequestModel");

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
// Chick Request Route
router.get("/chickRequest", (req, res) => {
  res.render("chick-request");
});

router.post("/chickRequest", async (req, res) => {
  try {
    const newRequest = new requestYourChicks(req.body);
    await newRequest.save();
    alert(`Congratulations, Your REquest has been Submitted Successfully
      Please Wait for an official Call fro Young For Chicks For the Delivery Date.
      `);
  } catch (error) {
    res.status(400).render("chick-request");
  }
});
module.exports = router;

// req- Handles incoming data such as form data or query params, i.e req.body
// res- An object of methods for sending data back to th user. i.e res.send, res.render, res.sendFile etc.
