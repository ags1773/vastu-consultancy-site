var mongoose = require("mongoose");

var custSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  phone: Number,
  email: String
});

module.exports = mongoose.model('Customer', custSchema);
