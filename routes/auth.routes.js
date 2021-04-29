//1. Create the routes
//2. Add them to the app.js
//3. Import the route

const UserModel = require("../models/User.model");
const AdminModel = require("../models/Admin.model");
const bcrypt = require("bcryptjs");
const { response } = require("express");

const router = require("express").Router();

//----GET AND POST FOR SIGNUP FOR USER ----//

router.get("/auth/signup", (req, res, next) => {
  res.render("signup-form.hbs");
});

router.post("/auth/signup", (req, res, next) => {
  const { username, password, email } = req.body;
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  UserModel.create({ username, password: hash, email })
    .then((response) => {
      req.app.locals.isUserLoggedIn = true;
      req.session.userInfo = response;
      res.redirect("/signup-success");
    })

    .catch((err) => {
      next(err);
    });
});

//Display signup success page

router.get("/signup-success", (req, res, next) => {
  res.render("signup-success.hbs");
});

//----GET AND POST FOR LOGIN FOR USER----//

router.get("/auth/login", (req, res, next) => {
  res.render("login-form.hbs");
});

router.post("/auth/login", (req, res, next) => {
  const { username, password } = req.body;

  UserModel.findOne({ username })

    .then((response) => {
      console.log(`Response:${response}`);
      if (!response) {
        res.render("login-form.hbs", {
          msg: "hey, email or password seems to be wrong",
        });
      } else {
        bcrypt.compare(password, response.password).then((isMatching) => {
          if (isMatching) {
            req.app.locals.isUserLoggedIn = true;
            req.session.userInfo = response;
            res.redirect("/add-information");
          } else {
            res.render("login-form.hbs", {
              msg: "hey, email or password seems to be wrong",
            });
          }
        });
      }
    })

    .catch((err) => {
      next(err);
    });
});

//---GET AND POST ROUTES FOR ADMIN LOGIN--//

router.get("/auth/login-admin", (req, res, next) => {
  res.render("login-form-admin.hbs");
});

router.post("/auth/login-admin", (req, res, next) => {
  const { username, password } = req.body;

  AdminModel.findOne({ username })
    .then((response) => {
      if (!response) {
        res.render("login-form-admin.hbs", {
          msg: "hey, email or password seems to be wrong",
        });
      } else {
        bcrypt.compare(password, response.password).then((isMatching) => {
          if (isMatching) {
            req.app.locals.isAdminLoggedIn = true;
            req.session.adminInfo = response;
            res.redirect("/user-entries");
          } else {
            res.render("login-form-admin.hbs", {
              msg: "hey, email or password seems to be wrong",
            });
          }
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/logout", (req, res, next) => {
  req.app.locals.isUserLoggedIn = false;

  req.session.destroy();
  res.redirect("/");
});

router.get("/logout-admin", (req, res, next) => {
  req.app.locals.isAdminLoggedIn = false;

  req.session.destroy();
  res.redirect("/");
});

//GET ROUTE FOR SHOWING THE MAIN PAGE

router.get("/main", (req, res, next) => {
  res.render("main-page.hbs");
});

module.exports = router;
