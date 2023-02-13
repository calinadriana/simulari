// // https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ColorSchema = new Schema({
    name: String,
});

module.exports = model("colorModel", ColorSchema);
