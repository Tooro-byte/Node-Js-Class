const express = require("express");
const router = express.Router();

const chickStock = require("../models/chickRequestModel");
const chickRequest = require("../models/chickRequestModel");
const User = require("../models/User");
const {
  ensureAuthenticated,
  ensureManager,
} = require("../middleware/authMiddleware");
// shall import chick feeds model here!


//Managers Route
router.get("/managerDashBoard", async (req, res) => {
  try {
  const pendingRequests = await chickRequest.countDocuments({status: "pending"})
   const approvedRequests = await chickRequest.countDocuments({status: "approved"})
    const dispatchedRequests = await chickRequest.countDocuments({status: "dispatched"})
    const totalNumOfFarmers = await User.countDocuments({role: "farmer"})
  const users = await User.find();
  const farmers = await User.find({role: "farmer"})
  const stock =  await chickStock.find();
  const requests = await chickRequest.find().populate("user", "fullname");
  const chickSales = await chickRequest.aggregate([
    {$match:{status:{$in:["approved", "dispatched"]}}},
    {$group:{_id:null, totalNumChicks: {$sum: "$numChicks"},
    totalChickSales: {$sum: "$totalCost"}

    // If only quantity is captured but the unit price is known (1,650)
    //totalChickSales:{$sum: {$multiply: ["$numChicks", 1650]}}
  }}
  ])
    res.render("manager-dash-board", {
    users, 
    farmers,
    stock, 
    requests,
    chickSales:chickSales[0], 
    pendingRequests, approvedRequests, dispatchedRequests, totalNumOfFarmers
    });
  } catch (error) {}
});

module.exports = router;
