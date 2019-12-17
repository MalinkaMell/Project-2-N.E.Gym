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

//Instructors routes

//Get all
router.get("/admin/instructors", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Instructor.findAll({}).then(function(result) {
      res.render("admin/instructors", {
        layout: "admin",
        title: "Instructors",
        results: result,
        user: req.user
      });
    });
  } else {
    res.redirect("/");
  }
});

//Get one
router.get("/admin/instructors/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Instructor.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.render("admin/instructor", {
        layout: "admin",
        title: "Instructor",
        results: result,
        user: req.user
      });
    });
  } else {
    res.redirect("/");
  }
});

//Post one
router.post("/admin/instructors", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Instructor.create(req.body).then(function(result) {
      res.send(result);
      res.redirect("/admin/instructors");
    });
  } else {
    res.redirect("/");
  }
});

//Update one
router.put("/admin/instructors/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Instructor.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.render("admin/instructor", {
        layout: "admin",
        results: result,
        user: req.user
      });
    });
  } else {
    res.redirect("/");
  }
});

//Delete one
router.delete("/admin/instructors/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Instructor.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.send(result);
      res.redirect("/admin/instructors");
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
