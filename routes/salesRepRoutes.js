const express = require("express");
const router = express.Router();

router.get("/addSalesRep", (req, res) => {
  res.render("register-sales-rep");
});

module.exports = router;
