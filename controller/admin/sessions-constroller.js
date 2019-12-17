const express = require("express");
const passport = require("passport");
const router = express.Router();
const db = require("../../models");
const flash = require("connect-flash");
const session = require("express-session");
const moment = require("moment");

const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "config/token.json";

// Load client secrets from a local file.

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  // eslint-disable-next-line camelcase
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    // eslint-disable-next-line camelcase
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      return getAccessToken(oAuth2Client, callback);
    }
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return console.error("Error retrieving access token", err);
      }
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) {
          return console.error(err);
        }
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

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
router.get("/admin/sessions", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    let classes;
    db.Class.findAll({}).then(function(result) {
      classes = result;
    });
    let instr;
    db.Instructor.findAll({}).then(function(result) {
      instr = result;
    });
    db.Session.findAll({
      include: [db.Instructor, db.Class]
    }).then(function(result) {
      res.render("admin/sessions", {
        layout: "admin",
        title: "Sessions",
        results: result,
        classes: classes,
        instructor: instr,
        user: req.user
      });
    });
  } else {
    res.redirect("/");
  }
});

//Get one
router.get("/admin/sessions/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    let classes;
    let inst;
    db.Class.findAll({}).then(function(result) {
      classes = result;
    });
    db.Instructor.findAll({}).then(function(result) {
      inst = result;
    });
    db.Session.findOne({
      include: [db.Class, db.Instructor],
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.render("admin/session", {
        layout: "admin",
        title: result.Class.name,
        results: result,
        classes: classes,
        instructor: inst,
        user: req.user
      });
    });
  } else {
    res.redirect("/");
  }
});

//Post one
router.post("/admin/sessions", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Session.create(req.body).then(function(result) {
      //res.json(result);
      res.redirect("/admin/sessions");
    });

    fs.readFile("config/credentials.json", (err, content) => {
      if (err) {
        return console.log("Error loading client secret file:", err);
      }
      // Authorize a client with credentials, then call the Google Calendar API.
      //authorize(JSON.parse(content), listEvents);
      authorize(JSON.parse(content), insertEvents);
    });
    function insertEvents(auth) {
      const calendar = google.calendar({ version: "v3", auth });
      var newevent = {
        summary: req.body.ClassId,
        location: "92 W Vaughn Ave Gilbert, AZ 85233",
        description: "Class!",
        start: {
          dateTime: moment(req.body.date, "YYYY/MM/DD hh:mm A")
            .utcOffset("-07:00")
            .format(),
          timeZone: "America/Phoenix"
        },
        end: {
          dateTime: moment(req.body.date, "YYYY/MM/DD hh:mm A")
            .utcOffset("-07:00")
            .add(1, "hour")
            .format(),
          timeZone: "America/Phoenix"
        }
      };
      console.log("=====================================================");

      console.log(newevent.start.dateTime);

      console.log("=====================================================");

      calendar.events.insert(
        {
          auth: auth,
          calendarId: "primary",
          resource: newevent
        },
        function(err, event) {
          if (err) {
            console.log(
              "There was an error contacting the Calendar service: " + err
            );
            return;
          }
        }
      );
    }
  } else {
    res.redirect("/");
  }
});

//Update one
router.put("/admin/sessions/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Session.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.render("admin/session", {
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
router.delete("/admin/sessions/:id", function(req, res) {
  if (req.user && req.user.memberLvl >= 4) {
    db.Session.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
      res.redirect("/admin/sessions");
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
