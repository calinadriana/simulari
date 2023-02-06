// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const fructSchema = new Schema({
  name: String,
  
});

module.exports = mongoose.model("Fruct", fructSchema);
