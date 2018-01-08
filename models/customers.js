var mongoose = require("mongoose");

var custSchema = new mongoose.Schema({
  name:  String,
  phone: Number,
  expiryCtr: Date,
  email: String
});

module.exports = mongoose.model('Customer', custSchema);
