const infoModel = require("../models/Info.model");
const router = require("express").Router();
const session = require("express-sessions");

//Custom middleware

const authorize = (req, res, next) => {
  console.log("middleware");
  if (req.session.userInfo) {
    next();
  } else {
    res.redirect("/main");
  }
};

//THIS ROUTE NEEDS TO BE PROTECTED SINCE ONLY REGISTERED USERS CAN ADD INFO
router.get("/add-information", authorize, (req, res, next) => {
  const { username } = req.session.userInfo;
  res.render("add-info-form.hbs", { username });
});

router.post("/add-information", authorize, (req, res, next) => {
  const { _id } = req.session.userInfo;
  const {
    travellingTo,
    travellingFrom,
    quarantine,
    experience,
    covidTest,
    currentDate,
  } = req.body;
  infoModel
    .create({
      userId: _id,
      travellingTo,
      travellingFrom,
      quarantine,
      experience,
      covidTest,
      currentDate,
    })
    .then(() => {
      res.redirect("/entry-success");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Display entry information

router.get("/entry-success", (req, res, next) => {
  res.render("info-success.hbs");
});

//Trying to display the status routes

router.get("/travel-restrictions/:travellingTo", (req, res, next) => {
  const { travellingTo } = req.params;
  console.log(travellingTo);
  infoModel
    .find({ travellingTo })
    .populate("userId")
    .then((allEntries) => {
      console.log(allEntries);
      res.render("country-info.hbs", { allEntries });
    });
});

module.exports = router;
