const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureFarmer,
} = require("../middleware/authMiddleware");
const Stock = require("../models/chickStock");
const requestYourChicks = require("../models/chickRequestModel");

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
router.get(
  "/chickRequest",
  ensureAuthenticated,
  ensureFarmer,
  async (req, res) => {
    try {
      const requests = await requestYourChicks.find({ //  returns requests from the db for a particular user
        user: req.session.user._id, //captures the currently login user
      });
      const isStarter = requests.length === 0;
      console.log("These are my requests so far", requests);
      res.render("chick-request", { isStarter });
    } catch (error) {
      console.error(error.message);
      res.redirect("/farmerDashBoard");
    }
  }
);

router.post("/chickRequest", async (req, res) => {
  try {
    const {
      farmerType,
      chickType,
      numChicks,
      unitPrice,
      totalCost,
      requestDate,
      comments,
    } = req.body;
    const userId = req.session.user._id;
    const newRequest = new requestYourChicks({
      farmerType,
      chickType,
      numChicks,
      unitPrice,
      totalCost,
      requestDate,
      comments,
      user: userId,
    });
    await newRequest.save();
  } catch (error) {
    res.status(400).render("chick-request"); //redirect to feeds request route.
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
