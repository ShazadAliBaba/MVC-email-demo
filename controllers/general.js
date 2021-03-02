// Handles homepages, contact pages, etc. by creating routes
const express = require("express");
const router = express.Router();

// Create route to our homepage
router.get("/", (req, res) => {
  res.render("general/home", {
    title: "Home Page",
  });
});

// Browser gets the requested view
router.get("/contact-us", (req, res) => {
  res.render("general/contactUs", {
    title: "contact Us",
  });
});
// Receives the post back from our contact form
router.post("/contact-us", (req, res) => {
  console.log(req.body);
  //res.send(req.body);

  // long way
  //const firstName = req.body.firstName;
  //const firstName = req.body.firstName;
  //const (...)

  // short way (destructuring)
  // Contains all of the different properties that are submitted
  const { firstName, lastName, email, message } = req.body;

  // Server-side validation
  let validationResults = {};
  let passedValidation = true;
  if (typeof firstName !== "string" || firstName === "") {
    validationResults.firstName = "You must specify a first name.";
    passedValidation = false;
  } else if (firstName.length < 2) {
    validationResults.firstName =
      "The first name must be at least 2 characters.";
    passedValidation = false;
  }
  if (passedValidation) {
    // Send a mail message with SendGrid
    const sgMail = require("@sendgrid/mail");

    // We will protect our API key in an .env file; process.env.<KEY VARIABLE>
    //sgMail.setApiKey("<key>"); // Not safe
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

    /* An object that contains to/from email address, subject, and a body of the message 
    that will get processed to submitter in HTML format */
    const msg = {
      to: "shazadio@hotmail.com",
      from: "sali273@myseneca.ca",
      subject: "Contact Us Form Submission",
      html: `Visitor's Full Name: ${firstName} ${lastName}<br />
              Visitor's Email Address: ${email}<br />
              Visitor's message: ${message}<br />`,
    };
    // Asynchronously sends the email message and returns a promise (confirmation)
    sgMail
      .send(msg)
      .then(() => {
        res.send("Success");
      })
      .catch((err) => {
        console.log(`Error ${err}`);
        res.send("Error");
      });

    // Returning the page by rendering it
    res.send("Success");
  } else {
    res.render("general/contactUs", {
      title: "contact Us",
      // Passing this object as a message to the view
      validationResults: validationResults,
      // Passing the value to our contact handlebars to retain the value
      values: req.body,
    });
  }
});

// Exports our router/controller
module.exports = router;
