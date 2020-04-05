const mongoose = require("mongoose")

module.exports = Message = mongoose.model('Message',{
  name : String,
  message : String
});