require("../db");

const admins = [
  { username: "Raquel", email: "raquel@gmail.com", password: raquel123 },
  { username: "Rutul", email: "rutul@gmail.com", password: rutul123 },
];

const mongoose = require("mongoose");
const AdminModel = require("../models/Admin.model");

AdminModel.create(admins)
  .then(() => {
    console.log("seeds working");
    mongoose.connection.close();
  })
  .catch(() => {});
