const mongoose = require("mongoose");
const { Schema } = mongoose;

const EquipSchema = new Schema({
  name: String,
  type: String,
  amount: Number,
});

module.exports = mongoose.model("EquipSchema", EquipSchema);
