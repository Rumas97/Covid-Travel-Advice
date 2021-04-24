const infoModel = require("../models/Info.model");
const router = require("express").Router();

//THIS ROUTE NEEDS TO BE PROTECTED SINCE ONLY REGISTERED USERS CAN ADD INFO
router.get("/add-information", (req, res, next) => {
  res.render("add-info-form.hbs");
});

module.exports = router;
