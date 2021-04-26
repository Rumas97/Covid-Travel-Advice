const router = require("express").Router();
const infoModel = require("../models/Info.model");

const authorize = (req, res, next) => {
  console.log("middleware");
  if (req.session.adminInfo) {
    next();
  } else {
    res.redirect("/auth/login-admin");
  }
};
//GET ROUTE FOR ADMIN VIEW
//this route need to be protected
router.get("/user-entries", authorize, (req, res, next) => {
  infoModel
    .find()
    .then((allEntries) => {
      res.render("verify-entries.hbs", { allEntries });
    })

    .catch(() => {});
});

router.post("/user-entries/:id/delete", authorize, (req, res, next) => {
  const { id } = req.params;
  infoModel
    .findByIdAndDelete(id)
    .then((data) => {
      res.redirect("/user-entries");
    })

    .catch(() => {});
});

router.get("/user-entries/:id/verify", authorize, (req, res, next) => {
  const { id } = req.params;
  infoModel
    .findById(id)
    .then((data) => {
      res.render("edit-status.hbs", { data });
    })

    .catch(() => {});
});

router.post("/user-entries/:id/verify", authorize, (req, res, next) => {
  const { id } = req.params;

  infoModel
    .findByIdAndUpdate(id, { status: "verified" })
    .then((data) => {
      res.redirect("/user-entries");
    })

    .catch(() => {});
});

module.exports = router;
