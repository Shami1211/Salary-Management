const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LecturerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  module: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  salary: {
    type: String,
  },
  bonus: {
    type: String,
  },
  total: {
    type: String,
  },
});

module.exports = mongoose.model("LecturerSalary", LecturerSchema);
