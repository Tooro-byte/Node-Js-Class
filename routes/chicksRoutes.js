const express = require("express");
const router = express.Router();

router.get("/addChicks", (req, res) => {
  res.render("chicks");
});

router.post("/addChicks", (req, res) => {
  console.log(req.body);
});


module.exports = router;
