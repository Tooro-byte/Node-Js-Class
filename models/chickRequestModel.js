const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: true,
  },
  farmerNIN: {
    type: String,
    required: true,
    unique: true,
  },
  farmerType: {
    type: String,
    required: true,
  },
  chickType: {
    type: String,
    required: true,
  },
  numChicks: {
    type: Number,
    required: true,
  },
  requestDate: {
    type: Date,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("requestYourChicks", requestSchema);
