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
  },

  covidTest: {
    type: String,
    enum: ["PCR", "AntiGen", "RT-LAMP", "TMA"],
  },

  status: {
    type: String,
    default: "pending",
  },
});

const infoModel = model("InfoModel", infoModelSchema);

module.exports = infoModel;
