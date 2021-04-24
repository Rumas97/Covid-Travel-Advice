const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const adminSchema = new Schema({
  username: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },
  password: String,
  email: String,
});

const Admin = model("Admin", adminSchema);

module.exports = Admin;
