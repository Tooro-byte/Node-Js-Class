const express = require("express");
const router = express.Router();

router.get("/addChicks", (req, res) => {
  res.render("chicks");
});

module.exports = router;
