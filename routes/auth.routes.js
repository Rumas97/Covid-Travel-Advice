//1. Create the routes
//2. Add them to the app.js
//3. Import the route

const UserModel = require("../models/User.model");
const bcrypt = require("bcryptjs");

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
    .then(() => {
      res.redirect("/signup-success");
    })

    .catch((err) => {
      console.log(err);
    });
});

//----GET AND POST FOR LOGIN FOR USER----//

router.get("/auth/login", (req, res, next) => {
  res.render("login-form.hbs");
});

router.post("/auth/login", (req, res, next) => {
  const { username, password } = req.body;

  UserModel.findOne({ username })
    .then((response) => {
      if (!response) {
        res.render("login-form.hbs", {
          msg: "hey, email or password seems to be wrong",
        });
      } else {
        bcrypt.compare(password, response.password).then((isMatching) => {
          if (isMatching) {
            res.redirect("/create-information");
          } else {
            res.render("login-form.hbs", {
              msg: "hey, email or password seems to be wrong",
            });
          }
        });
      }
    })

    .catch((err) => {
      console.log(err);
    });
});

//CREATED JUST TO CHECK IF THE PAGE LOOKS GOOD
router.get("/info-success", (req, res, next) => {
  res.render("info-success.hbs");
});

module.exports = router;
