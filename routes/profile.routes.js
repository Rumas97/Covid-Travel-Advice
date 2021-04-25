const router = require("express").Router();
const userModel = require("../models/User.model");
const bcrypt = require("bcryptjs");

//this route needs to be protected
router.get("/profile/:id", (req, res, next) => {
  const { id } = req.params;

  userModel
    .findById(id)
    .then((data) => {
      res.render("user-profile.hbs", { data });
    })

    .catch(() => {});
});

//routes for editing profile

router.get("/profile/:id/edit", (req, res, next) => {
  const { id } = req.params;

  userModel
    .findById(id)
    .then((data) => {
      res.render("edit-profile.hbs", { data });
    })

    .catch(() => {});
});

router.post("/profile/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { username, email } = req.body;

  userModel
    .findByIdAndUpdate(id, { username, email })
    .then((data) => {
      res.redirect("/profile"), { data };
    })

    .catch(() => {});
});

module.exports = router;
