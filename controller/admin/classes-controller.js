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

//Classes routes

//Get all
router.get("/admin/classes", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    let cats; //need it in order to create new classes, so i have my seect with lkist of cats
    db.Category.findAll({}).then(function(result) {
      cats = result;
    });

    db.Class.findAll({ include: [db.Category] }).then(function(result) {
      res.render("admin/classes", {
        layout: "admin",
        title: "Classes",
        results: result,
        categories: cats,
        user: req.user
      });
    });
  } else {
    res.redirect("/");
  }
});

//Get one
router.get("/admin/classes/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    let cats;
    db.Category.findAll({}).then(function(result) {
      cats = result;
    });

    db.Class.findOne({
      include: [db.Category],
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.render("admin/class", {
        layout: "admin",
        title: result.name,
        results: result,
        categories: cats,
        user: req.user
      });
    });
  } else {
    res.redirect("/");
  }
});

//Post one
router.post("/admin/classes", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Class.create(req.body).then(function(result) {
      res.json(result);
      res.redirect("/admin/classes");
    });
  } else {
    res.redirect("/");
  }
});

//Update one
router.put("/admin/classes/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Class.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.render("admin/class", {
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
router.delete("/admin/classes/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Class.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
      res.redirect("/admin/classes");
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
