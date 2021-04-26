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
}); //NOT SURE HOW TO DO THE VERIFY IN A DIFFERENT WAY

/*router.post("/user-entries/:id/verify", (req, res, next) => {
  const { id } = req.params;

  infoModel
    .findByIdAndUpdate(id)
    .then(() => {
      if (status.enum === "pending") {
      }
    })

    .catch(() => {});
}); */

router.get("/user-entries/:id/verify", (req, res, next) => {
  const { id } = req.params;
  infoModel
    .findById(id)
    .then((data) => {
      res.render("edit-status.hbs", { data });
    })

    .catch(() => {});
});

router.post("/user-entries/:id/verify", (req, res, next) => {
  const { id } = req.params;

  infoModel
    .findByIdAndUpdate(id, { status: "verified" })
    .then((data) => {
      res.redirect("/user-entries");
    })

    .catch(() => {});
});

//1. Change status to a default value "pending"
//2. Country-info.hbs we display data.status
//3. We have a button in verify-entries, we have an edit button
//4. As admins, editing the status from "pending" to "verified"

module.exports = router;
