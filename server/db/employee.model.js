// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  // colors: {
  //   type: String,
  //   default: ""
  // },
  colors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Colors" }],
  //present: { type: Boolean, default: false },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
