// Handles homepages, contact pages, etc. by creating routes
const express = require("express");
const router = express.Router();

// Create route to our homepage
router.get("/", (req, res) => {
  res.render("general/home", {
    title: "Home Page",
  });
});

// Exports our router/controller
module.exports = router;
