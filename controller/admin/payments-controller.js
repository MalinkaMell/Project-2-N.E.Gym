/* eslint-disable prettier/prettier */
const express = require("express");
const passport = require("passport");
const router = express.Router();
const db = require("../../models");
const flash = require("connect-flash");
const session = require("express-session");

// Flash
router.use(
  session({
    cookie: { maxAge: 3600000 },
    secret: "wootwoot"
  })
);
router.use(flash());

// Passport
require("../../config/passport")(passport);
router.use(passport.initialize());
router.use(passport.session());

//Payments routes
router.get("/admin/payments", function(req, res) {
  if (req.user) {
    db.Payment.findAll({}).then(function(result) {
      res.render("admin/payments", {
        layout: "admin",
        title: "Payments",
        results: result,
        user: req.user
      });
    });
  } else {
    res.redirect("/login");
  }
});


router.get("/admin/payments/:id", function(req, res) {
  if (req.user) {
    db.Payment.findOne({ where: { id: req.params.id} }).then(function(result) {
      res.render("admin/payment", {
        layout: "admin",
        title: "Payment",
        results: result,
        user: req.user
      });
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
