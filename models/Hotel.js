const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  roomsAvailable: Number
});

module.exports = mongoose.model('Hotel', hotelSchema);
