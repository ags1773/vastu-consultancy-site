var mongoose = require("mongoose");

var custSchema = new mongoose.Schema({
  name: {type: [String], index: true},
  phone: Number,
  email: String
});

custSchema.index({ name: "text" });

module.exports = mongoose.model('Customer', custSchema);
