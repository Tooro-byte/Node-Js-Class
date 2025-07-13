const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: true,
  },
  farmerAge: {
    type: Number,
    required: true,
  },
  farmerTel: {
    type: Number,
    required: true,
  },
  farmerAddress: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("addMyFarmers", farmerSchema);
