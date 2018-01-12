var mongoose = require("mongoose");

var custSchema = new mongoose.Schema({
  name:  String,
  phone: String,
  expiryCtr: Date,
  email: String
});

module.exports = mongoose.model('Trash', custSchema);
