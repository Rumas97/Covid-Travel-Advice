const infoModel = require("../models/Info.model");
const router = require("express").Router();
//let userInfo = {};

//Custom middleware
/*
const authorize = (req, res, next) => {
  console.log("middleware");
  if (req.session.userInfo) {
    next();
  } else {
    res.redirect("login-form.hbs");
  }
};
*/

//THIS ROUTE NEEDS TO BE PROTECTED SINCE ONLY REGISTERED USERS CAN ADD INFO
router.get("/add-information", (req, res, next) => {
  res.render("add-info-form.hbs");
});

router.post("/add-information", (req, res, next) => {
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
