const express = require("express");
const router = express.Router();

const chickStock = require("../models/ChicksModel");
const Stock = require("../models/chickStock");
const requestYourChicks = require("../models/chickRequestModel");
const AddStock = require("../models/addStockModel");

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

router.get("/addstock", (req, res) => {
  res.render("chickStock");
});
// A post route to send Data to the Data Base.

router.post("/addstock", async (req, res) => {
  try {
    console.log(req.body);
    const newStock = new Stock(req.body);
    await newStock.save();
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
  } catch (error) {
    res.status(400).render("chick-request");
  }
});

// Add Chick Stock Routes Found right Here!
router.get("/add", (req, res) => {
  res.render("add-stock");
});

router.post("/add", async (req, res) => {
  try {
    const addNewChicks = new AddStock(req.body);
    await addNewChicks.save();
  } catch (error) {
    res.status(400).render("add-stock");
  }
});

module.exports = router;
// req- Handles incoming data such as form data or query params, i.e req.body
// res- An object of methods for sending data back to th user. i.e res.send, res.render, res.sendFile etc.
