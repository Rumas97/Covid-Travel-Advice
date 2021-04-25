const infoModel = require("../models/Info.model");
const router = require("express").Router();
const session = require("express-sessions");

//Custom middleware

const authorize = (req, res, next) => {
  console.log("middleware");
  if (req.session.userInfo) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

//THIS ROUTE NEEDS TO BE PROTECTED SINCE ONLY REGISTERED USERS CAN ADD INFO
router.get("/add-information", authorize, (req, res, next) => {
  const { username } = req.session.userInfo;
  res.render("add-info-form.hbs", { username });
});

router.post("/add-information", authorize, (req, res, next) => {
  const {
    travellingTo,
    travellingFrom,
    quarantine,
    experience,
    covidTest,
  } = req.body;
  infoModel
    .create({ travellingTo, travellingFrom, quarantine, experience, covidTest })
    .then(() => {
      res.redirect("/entry-success");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
