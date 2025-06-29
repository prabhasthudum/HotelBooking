const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: String,
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel'
  },
  checkInDate: Date,
  checkOutDate: Date
});

module.exports = mongoose.model('Booking', bookingSchema);
