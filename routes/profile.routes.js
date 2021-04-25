const router = require("express").Router();
const userModel = require("../models/User.model");
//const { authorize } = require("/covid-info.routes"); TRY TO EXPORT AUTHORIZE CUSTOM MIDDLEWARE
const bcrypt = require("bcryptjs");
//router.use("/", authorize);

const authorize = (req, res, next) => {
  console.log("middleware");
  if (req.session.userInfo) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

//this route needs to be protected
router.get("/profile/:id", authorize, (req, res, next) => {
  const { id } = req.params;

  userModel
    .findById(id)
    .then((data) => {
      res.render("user-profile.hbs", { data });
    })

    .catch(() => {});
});

//routes for editing profile

router.get("/profile/:id/edit", authorize, (req, res, next) => {
  const { id } = req.params;

  userModel
    .findById(id)
    .then((data) => {
      res.render("edit-profile.hbs", { data });
    })

    .catch(() => {});
});

router.post("/profile/:id/edit", authorize, (req, res, next) => {
  const { id } = req.params;
  const { username, email } = req.body;

  userModel
    .findByIdAndUpdate(id, { username, email })
    .then((data) => {
      console.log(" profile its working");
      router.get("/profile/:id");
      return userModel.findById(id).then((data) => {
        res.render("user-profile.hbs", { data });
      });

      //.catch(() => {});
    })

    .catch(() => {});
});

router.post("/profile/:id/delete", authorize, (req, res, next) => {
  const { id } = req.params;
  userModel
    .findByIdAndDelete(id)
    .then((data) => {
      res.redirect("/profile-deleted-correctly");
    })

    .catch(() => {});
});

module.exports = router;
