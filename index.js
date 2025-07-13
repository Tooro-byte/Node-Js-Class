//1a:  Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

//1b: Importing Routes
const studyRoutes = require("./routes/studyRoutes");
const indexRoutes = require("./routes/indexRoutes");
const chicksRoutes = require("./routes/chicksRoutes");
const farmersRoutes = require("./routes/farmersRoutes");
const salesRepRoutes = require("./routes/salesRepRoutes");
const loginInfoRoute = require("./routes/loginRoute");
const signupInfoRoute = require("./routes/signupRoute");

// 2: Instantiations
const app = express();
const port = 3001;

//3:  Configurations
mongoose.connect(process.env.DATABASE);
mongoose.connection
  .once("open", () => {
    console.log(`Mongoose Connection Open on ${port} Enjoy Coding`);
  })
  .on("error", (error) => {
    console.error(`Connection error: ${error.message}`);
  });

app.set("view engine", "pug"); // Setting pug as the view Engine
// app.set("views", path.join(__dirname, "views")); // Specify a folder containing frontend files
app.use(express.static("views")); // Collect pug files from the views folder.

//4a: Middleware
app.use("/about", (req, res, next) => {
  console.log("A new request received at " + Date.now());
  next(); //Time logging for the about route
});
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//4b: Using Imported routes from the routes folder
app.use("/study", studyRoutes);
app.use("/", indexRoutes);
app.use("/", chicksRoutes);
app.use("/", farmersRoutes);
app.use("/", salesRepRoutes);
app.use("/", loginInfoRoute);
app.use("/", signupInfoRoute);

//Handling Non -existing routes.
app.use((req, res) => {
  res.status(404).send("Oops! Route not found.");
});

//6: Bootstrapping the Server
//Always put this line of code at the enf of the index.js file.
app.listen(port, () => {
  console.log(`Server has started running on Port ${port}`);
});
