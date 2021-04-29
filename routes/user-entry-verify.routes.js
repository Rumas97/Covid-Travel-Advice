const router = require("express").Router();
const infoModel = require("../models/Info.model");

const authorize = (req, res, next) => {
  if (req.session.adminInfo) {
    next();
  } else {
    res.redirect("/auth/login-admin");
  }
};

//GET ROUTE FOR ADMIN VIEW
//this route needs to be protected
router.get("/user-entries", authorize, (req, res, next) => {
  infoModel
    .find()
    .then((allEntries) => {
      res.render("verify-entries.hbs", { allEntries });
    })

    .catch((err) => {
      next(err);
    });
});

router.post("/user-entries/:id/delete", authorize, (req, res, next) => {
  const { id } = req.params;
  infoModel
    .findByIdAndDelete(id)
    .then((data) => {
      res.redirect("/user-entries");
    })

    .catch((err) => {
      next(err);
    });
});

router.get("/user-entries/:id/verify", authorize, (req, res, next) => {
  const { id } = req.params;
  infoModel
    .findById(id)
    .then((data) => {
      res.render("edit-status.hbs", { data });
    })

    .catch((err) => {
      next(err);
    });
});

router.post("/user-entries/:id/verify", authorize, (req, res, next) => {
  const { id } = req.params;

  infoModel
    .findByIdAndUpdate(id, { status: "verified" })
    .then((data) => {
      res.redirect("/user-entries");
    })

    .catch((err) => {
      next(err);
    });
});

module.exports = router;
