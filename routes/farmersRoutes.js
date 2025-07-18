const express = require("express");
const router = express.Router();

const {
  ensureAuthenticated,
  ensureManager,
} = require("../middleware/authMiddleware");

const addMyFarmers = require("../models/FarmersModel");
const User = require("../models/User");
const AddStock = require("../models/addStockModel");

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
router.get(
  "/userlist",
  // ensureAuthenticated,
  // ensureManager,
  async (req, res) => {
    try {
      let users = await User.find().sort({ $natural: -1 }); //.limit(number of people returned from db)
      res.render("usersList", { users });
    } catch (error) {
      res.status(400).send("Unable to find requested Users");
    }
  }
);

// Get a list of Chicks Added Per Day By Young For Chicks Stock Managers
router.get("/chickslist", async (req, res) => {
  try {
    let chicks = await AddStock.find().sort({ $natural: -1 }); //.limit(number of people returned from db)
    res.render("addChicksLists", { chicks });
  } catch (error) {
    res
      .status(400)
      .send("Unable to find requested List. Please Try again Later!");
  }
});

//Updating user
router.get("/updateuser/:id", async (req, res) => {
  try {
    const updateUser = await User.findOne({ _id: req.params.id });
    res.render("update-user", { user: updateUser });
  } catch (error) {
    res.status(400).send("Unable to find User in the Database");
    console.log(error.message);
  }
});

router.post("/updateuser", async (req, res) => {
  try {
    await User.findByIdAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/userlist");
  } catch (error) {
    res.status(400).send("Update Failed");
    console.log(error.message);
  }
});

//Implement Delete
router.post("/deleteuser", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.body.id });
    res.redirect("/userlist");
  } catch (error) {
    res.status(400).send("Unable to delete user");
    console.log(error.message);
  }
});

module.exports = router;
