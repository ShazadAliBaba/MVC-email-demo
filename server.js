// Import modules
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

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

// Set up body parser; middleware of our web app
app.use(bodyParser.urlencoded({ extended: false }));

// Set up dotenv; injects key into process.env
const dotenv = require("dotenv");
dotenv.config({ path: "./config/keys.env" });

// Load controllers to load our modules
const generalController = require("./controllers/general");
// Set up a default route, but the URL path will be defined by our controller
app.use("/", generalController);

// Start listening (port 8080 defined in .env file); reads the value of API key variable
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Web server is up and running on port ${PORT}`);
});
