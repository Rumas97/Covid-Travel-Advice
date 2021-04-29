const infoModel = require("../models/Info.model");
const router = require("express").Router();
const session = require("express-sessions");
const world = require("../public/js/countries.geo");

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
  let mapCountry = world.features.map((elem, index) => {
    return elem.properties.name;
  });
  res.render("add-info-form.hbs", { username, mapCountry });
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
      next(err);
    });
});

//Display entry information

router.get("/entry-success", (req, res, next) => {
  res.render("info-success.hbs");
});

//Trying to display the status routes

router.get("/travel-restrictions/:travellingTo", (req, res, next) => {
  const { travellingTo } = req.params;
  infoModel
    .find({ travellingTo })
    .populate("userId")
    .then((allEntries) => {
      let clonedAllEntries = JSON.parse(JSON.stringify(allEntries));
      for (let i = 0; i < clonedAllEntries.length; i++) {
        let newDate = new Date(clonedAllEntries[i].currentDate);
        clonedAllEntries[i].currentDate = newDate.toDateString();
      }
      if (allEntries.length == 0) {
        res.render("no-info.hbs");
      } else {
        res.render("country-info.hbs", { allEntries: clonedAllEntries });
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
