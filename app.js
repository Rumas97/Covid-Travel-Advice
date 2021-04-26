// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// default value for title local
const projectName = "covid-travel-advice";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with Ironlauncher`;

// Creating the sessions
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // in milliseconds
    },
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGODB_URI || "mongodb://localhost/covid-travel-advice",
      ttl: 24 * 60 * 60, // 1 day => in seconds
    }),
  })
);

app.use(function (req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const infoRoutes = require("./routes/covid-info.routes");
app.use("/", infoRoutes);

const adminRoutes = require("./routes/user-entry-verify.routes");
app.use("/", adminRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/", profileRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
