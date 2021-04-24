const { Schema, model } = require("mongoose");

const infoModelSchema = new Schema({
  travellingTo: String,
  travellingFrom: String,
  quarantine: String,
  experience: String,

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  currentDate: {
    type: Date,
    // default: Date.now,
  },

  covidTest: {
    type: String,
    enum: ["PCR", "AntiGen", "RT-LAMP", "TMA"],
  },

  status: {
    type: String,
    enum: ["verified", "pending"],
  },
});

const infoModel = model("InfoModel", infoModelSchema);

module.exports = infoModel;
