const mongoose = require("mongoose");

const chickSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  telephone: {
    type: Number,
    required: true,
  },
  num_chicks: {
    type: Number,
    required: true,
  },
  request_date: {
    type: Date,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("chickStock", chickSchema);
