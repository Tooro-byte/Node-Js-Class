//5: Routes
//route.METHOD(PATH/endpoint, HANDLER/CALLBACK)=> This is a structure of a route

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
res.send("Welcome To My Home Page.");
});

//About Page Route
router.get("/about", (req, res) => {
  res.send("Nice to have you here brother!");
});

router.post("/postabout", (req, res) => {
  res.send("Got a POST request");
});

router.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});

router.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});
router.patch("/about", (req, res) => {
  res.send("Node Mon has come on board now. No Need to re run the server");
});

//get profile from database using the username
// Path Parameters and Path Strings
router.get("/profile/:username", (req, res) => {
  res.send("This is a path Parameter" + " " + req.params.username);
});

router.get("/queryparams", (req, res) => {
  res.send(
    "My query params are: " + req.query.class + " and " + req.query.cohort
  );
});

//Understanding How to Serve HTML Files on the Web Browser Using a route

//...............Chick Route.............
router.get("/chicks", (req, res) => {
  res.sendFile(__dirname + "./views/chicks.html");
});

//...............Farmers Route.............
router.get("/farmers", (req, res) => {
  res.sendFile(__dirname + "/farmers.html");
});

//...............Sales Representative Route......
router.get("/sales", (req, res) => {
  res.sendFile(__dirname + "/sales.html");
});

module.exports = router;
