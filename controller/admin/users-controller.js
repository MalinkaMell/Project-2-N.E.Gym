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
router.get("/admin/users", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.user.findAll({}).then(function(result) {
      res.render("admin/users", {
        layout: "admin",
        title: "Users",
        results: result,
        user: req.user
      });
    });
  } else {
    res.redirect("/");
  }
});

//Get one
router.get("/admin/users/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.user
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(result) {
        res.render("admin/user", {
          layout: "admin",
          title: "User",
          results: result,
          user: req.user
        });
      });
  } else {
    res.redirect("/");
  }
});

//Post one
router.post("/admin/users", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.user.create(req.body).then(function(result) {
      res.send(result);
      res.redirect("/admin/users");
    });
  } else {
    res.redirect("/");
  }
});

//Update one
router.put("/admin/users/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.user
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(function(result) {
        res.render("admin/user", {
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
router.delete("/admin/users/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.user
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(result) {
        res.send(result);
        res.redirect("/admin/users");
      });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
