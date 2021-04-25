const router = require("express").Router();
const infoModel = require("../models/Info.model");

//GET ROUTE FOR ADMIN VIEW
//this route need to be protected
router.get("/user-entries", (req, res, next) => {
  infoModel
    .find()
    .then((allEntries) => {
      res.render("verify-entries.hbs", { allEntries });
    })

    .catch(() => {});
});

router.post("/user-entries/:id/delete", (req, res, next) => {
  const { id } = req.params;
  infoModel
    .findByIdAndDelete(id)
    .then((data) => {
      res.redirect("/user-entries");
    })

    .catch(() => {});
});

router.post("/user-entries/:id/verify", (req, res, next) => {
  const { id } = req.params;

  infoModel
    .findByIdAndUpdate(id)
    .then(() => {
      if (status.enum === "pending") {
      }
    })

    .catch(() => {});
});

//1. Change status to a default value "pending"
//2. Country-info.hbs we display data.status
//3. We have a button in verify-entries, we have an edit button
//4. As admins, editing the status from "pending" to "verified"

module.exports = router;
