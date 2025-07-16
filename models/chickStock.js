const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    unique: true,
  },
 age: {
    type: Number,
    required: true,
  },
  num_chicks: {
    type: Number,
    required: true,
  },
  stock_date: {
    type: Date,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Stock", stockSchema);
