const router = require("express").Router();
const userModel = require("../models/User.model");
const bcrypt = require("bcryptjs");
const uploader = require("../routes/cloudinary");

const authorize = (req, res, next) => {
  if (req.session.userInfo) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

router.post(
  "/profile",
  authorize,
  uploader.single("image"),
  (req, res, next) => {
    req.file;
    userModel
      .findByIdAndUpdate(req.session.userInfo._id, {
        profilePic: req.file.path,
      })
      .then(() => {
        res.redirect("/profile");
      })
      .catch((err) => {
        next(err);
      });
  }
);

//this route needs to be protected
router.get("/profile", authorize, (req, res, next) => {
  const { _id } = req.session.userInfo;

  userModel
    .findById(_id)
    .then((data) => {
      res.render("user-profile.hbs", { data });
    })

    .catch((err) => {
      next(err);
    });
});

//routes for editing profile

router.get("/profile/edit", authorize, (req, res, next) => {
  const { _id } = req.session.userInfo;

  userModel
    .findById(_id)
    .then((data) => {
      res.render("edit-profile.hbs", { data });
    })

    .catch((err) => {
      next(err);
    });
});

router.post("/profile/edit", authorize, (req, res, next) => {
  const { _id } = req.session.userInfo;
  const { username, email } = req.body;

  userModel
    .findByIdAndUpdate(_id, { username, email })
    .then((data) => {
      router.get("/profile");
      return userModel.findById(_id);
    })

    .then((data) => {
      res.render("user-profile.hbs", { data });
    })

    .catch((err) => {
      next(err);
    });
});

router.post("/profile/:id/delete", authorize, (req, res, next) => {
  const { id } = req.params;
  userModel
    .findByIdAndDelete(id)
    .then((data) => {
      res.redirect("/profile-deleted-correctly");
    })

    .catch((err) => {
      next(err);
    });
});

module.exports = router;
