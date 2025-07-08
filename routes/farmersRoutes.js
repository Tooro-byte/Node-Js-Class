const express = require("express");
const router = express.Router();

router.get("/addFarmer", (req, res) => {
  res.render("farmers");
});

module.exports = router;
