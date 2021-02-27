// Import modules
const express = require("express");
const exphbs = require("express-handlebars");

// Create install of an app
const app = express();

// Set up Handlebars
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", ".hbs");

// Load controllers to load our modules
const generalController = require("./controllers/general");
// Set up a default route, but the URL path will be defined by our controller
app.use("/", generalController);

// Start listening (8080 optional here)
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Web server is up and running on port ${PORT}`);
});
