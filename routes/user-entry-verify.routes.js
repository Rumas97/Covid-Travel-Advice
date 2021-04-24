const router = require("express").Router();

//GET ROUTE FOR ADMIN VIEW

router.get("/user-entries", (req, res, next) => {
  res.render("verify-entries.hbs");
});
module.exports = router;
