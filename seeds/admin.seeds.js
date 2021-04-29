require("../db");

const admins = [
  {
    username: "Raquel",
    email: "raquel@gmail.com",
    password: "$2y$12$n7BZJVfcX4EJVjOv/Y/tnO8vJncz9Ga.gsvQpxy4ohpdURfrFsCQa",
  },
  {
    username: "Rutul",
    email: "rutul@gmail.com",
    password: "$2y$12$x1I6dRWFt3g4Q4noTvaV5Oknjv1molp/bGHN16lESryPqYnL7NeH2 ",
  },
];

const mongoose = require("mongoose");
const AdminModel = require("../models/Admin.model");

AdminModel.create(admins)
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    next(err);
  });
