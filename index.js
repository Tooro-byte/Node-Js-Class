//1:  Dependencies
const express = require("express");
const path = require("path");

// Importing Routes
const studyRoutes = require("./routes/studyRoutes");
const indexRoutes = require("./routes/indexRoutes");
const chicksRoutes = require("./routes/chicksRoutes");
const farmersRoutes = require("./routes/farmersRoutes");
const salesRepRoutes = require("./routes/salesRepRoutes");

// 2: Instantiations
const app = express();
const port = 3001;

//3:  Configurations
app.set("view engine", "pug"); // Setting pug as the view Engine
app.set("views", path.join(__dirname, "views")); // Specify a folder containing frontend files

//4: Middleware
app.use("/about", (req, res, next) => {
  console.log("A new request received at " + Date.now());
  next(); //Time logging for the about route
});

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//5 Using Imported routes from the routes folder
app.use("/study", studyRoutes);
app.use("/", indexRoutes);
app.use("/", chicksRoutes);
app.use("/", farmersRoutes);
app.use("/", salesRepRoutes);

//Handling Non -existing routes.
app.use((req, res) => {
  res.status(404).send("Oops! Route not found.");
});

//6: Bootstrapping the Server
//Always put this line of code at the enf of the index.js file.
app.listen(port, () => {
  console.log(`Server has started running on Port ${port}`);
});
