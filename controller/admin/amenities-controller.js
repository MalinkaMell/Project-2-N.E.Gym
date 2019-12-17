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

//Amenities routes

//Get all
router.get("/admin/amenities", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Amenities.findAll({}).then(function(result) {
      res.render("admin/amenities", {
        layout: "admin",
        title: "Amenities",
        results: result,
        user: req.user
      });
    });
  } else {
    res.redirect("/");
  }
});

//Get one
router.get("/admin/amenities/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Amenities.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.render("admin/amenity", {
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
router.post("/admin/amenities", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Amenities.create(req.body).then(function(result) {
      res.send(result);
      res.redirect("/admin/amenities");
    });
  } else {
    res.redirect("/");
  }
});

//Update one
router.put("/admin/amenities/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Amenities.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.render("admin/amenity", {
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
router.delete("/admin/amenities/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Amenities.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.send(result);
      res.redirect("/admin/amenities");
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
