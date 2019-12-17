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

//Categories routes

//Get all
router.get("/admin/categories", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Category.findAll({}).then(function(result) {
      res.render("admin/categories", {
        layout: "admin",
        title: "Classes categories",
        results: result,
        user: req.user
      });
    });
  } else {
    res.redirect("/");
  }
});

//Get one
router.get("/admin/categories/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Category.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.render("admin/category", {
        layout: "admin",
        title: result.name,
        results: result,
        user: req.user
      });
    });
  } else {
    res.redirect("/");
  }
});

//Post one
router.post("/admin/categories", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Category.create(req.body).then(function(result) {
      res.json(result);
      res.redirect("/admin/categories");
    });
  } else {
    res.redirect("/");
  }
});

//Update one
router.put("/admin/categories/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Category.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.render("admin/category", {
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
router.delete("/admin/categories/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Category.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.send(result);
      res.redirect("/admin/categories");
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
