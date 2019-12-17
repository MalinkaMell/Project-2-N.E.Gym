const express = require("express");
const passport = require("passport");
const router = express.Router();
const db = require("../models");
const flash = require("connect-flash");
const session = require("express-session");
const nodemailer = require("nodemailer");

// Flash
router.use(
  session({
    cookie: { maxAge: 3600000 },
    secret: "wootwoot"
  })
);
router.use(flash());

// Passport
require("../config/passport")(passport);
router.use(passport.initialize());
router.use(passport.session());

//Amenities routes

//Homepage
router.get("/", function(req, res) {
  let amenities;
  let inst;
  let classes;
  db.Amenities.findAll({}).then(function(result) {
    amenities = result;
  });
  db.Class.findAll({}).then(function(result) {
    classes = result;
  });
  db.Instructor.findAll({})
    .then(function(result) {
      inst = result;
    })
    .then(function(result) {
      console.log(result);
      res.render("index", {
        layout: "main",
        title1: "Welcome to N.E. Gym",
        title2: "Ammenities",
        title3: "Instructors",
        title4: "Classes",
        inst: inst,
        am: amenities,
        classes: classes,
        user: req.user
      });
    });
});

//Get about
router.get("/about", function(req, res) {
  res.render("common", {
    title: "About N.E. Gym",
    text:
      "Spicy jalapeno bacon ipsum dolor amet beef salami turducken shankle chicken sirloin corned beef leberkas biltong pork loin fatback. Short ribs burgdoggen beef ribs tongue beef chicken landjaeger salami pastrami sausage biltong filet mignon tri-tip porchetta. Tongue porchetta prosciutto, short ribs jowl picanha boudin tail. Pastrami doner frankfurter drumstick meatball picanha ham bacon.",
    user: req.user
  });
});

//Trial
router.get("/trial", function(req, res) {
  res.render("trial", {
    title: "Get Your Free One Day Pass",
    text: "We will send you Free One Day Pass to your email",
    user: req.user
  });
});

router.post("/send", function(req, res) {
  //gmail way
  /* const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: process.env.email,
      pass: process.env.appPwd //app pwd
    }
  }); */

  const smtpTransport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "abbey.dickinson@ethereal.email",
      pass: "cvAXRaN4MqcDYvug3Z"
    }
  });

  const mailOptions = {
    to: req.body.email,
    subject: "Your Free One Day Pass Is Here!",
    text: `Hello, ${req.body.fname} ${req.body.lname}! 
    This is your One Dat Pass!Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  };

  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      res.render("common", {
        title: "Something went wrong :(",
        text: error
      });
    } else {
      console.log(`Message sent: ${response.messageId}`);
      res.render("common", {
        title: "We sent you free class pass",
        text: "Please, check your email"
      });
    }
  });
});

//Get classes
router.get("/classes", function(req, res) {
  db.Class.findAll({ include: [db.Category] }).then(function(result) {
    res.render("classes", {
      layout: "main",
      title: "Classes",
      results: result,
      user: req.user
    });
  });
});

//Get instructors
router.get("/instructors", function(req, res) {
  db.Instructor.findAll({ include: [db.Session] }).then(function(result) {
    //res.send(result);
    res.render("instructors", {
      layout: "main",
      title: "Instructors",
      results: result,
      user: req.user
    });
  });
});

//Get instructors
router.get("/account", function(req, res) {
  if (req.user) {
    db.user
      .findOne({
        where: {
          id: req.user.id
        }
      })
      .then(function(result) {
        //res.send(result);
        res.render("account", {
          layout: "main",
          title: "Your Account",
          results: result,
          user: req.user
        });
      });
  } else {
    res.redirect("/login");
  }
});

//Update one
router.put("/account", function(req, res) {
  if (req.user) {
    db.user
      .update(
        {
          fName: req.body.fName,
          lName: req.body.lName,
          email: req.body.email
        },
        {
          where: {
            id: req.body.id
          }
        }
      )
      .then(function(result) {
        res.render("account", {
          layout: "main",
          results: result,
          user: req.user
        });
      });
  } else {
    res.redirect("/");
  }
});

//Memberships
router.get("/memberships", function(req, res) {
  res.render("memberships", {
    title: "Memberships",
    user: req.user
  });
});

//Calendar
router.get("/calendar", function(req, res) {
  res.render("calendar", {
    title: "Calendar",
    user: req.user
  });
});

module.exports = router;
