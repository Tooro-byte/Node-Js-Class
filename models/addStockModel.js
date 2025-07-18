const mongoose = require("mongoose");

const addSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  stock_date: {
    type: Date,
    required: true,
  },
  comments: {
    type: String,
    require: true,
  },
  staff_name: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("AddStock", addSchema);
