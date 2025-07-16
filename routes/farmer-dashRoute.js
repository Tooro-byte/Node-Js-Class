const express = require("express");
const router = express.Router();

router.get("/farmerDashBoard", (req, res) => {
  res.render("farmer-dash-board", {
    farmerName: req.user?.name || "Farmer",
    requests: [],
  });
});

router.post("/farmerDashBoard", async (req, res) => {
  try {
  } catch (error) {}
});
module.exports = router;
