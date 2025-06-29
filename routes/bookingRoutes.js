const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');

// List bookings with optional success message
router.get('/', async (req, res) => {
  const bookings = await Booking.find().populate('hotelId');
  const success = req.query.success; // "cancel" or undefined
  let message = null;

  if (success === 'cancel') {
    message = 'Hotel booking has been cancelled.';
  } else if (success === 'book') {
    message = 'Hotel booking has been successfully made.';
  }

  res.render('bookings', { bookings, message });
});

// Show booking form
router.get('/new', async (req, res) => {
  const hotels = await Hotel.find();
  res.render('bookHotel', { hotels });
});

// Handle booking submission
router.post('/new', async (req, res) => {
  const { customerName, hotelId, checkInDate, checkOutDate } = req.body;
  await Booking.create({ customerName, hotelId, checkInDate, checkOutDate });
  res.redirect('/bookings?success=book');
});

// Handle cancel booking
router.post('/:id/delete', async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.redirect('/bookings?success=cancel');
});

module.exports = router;
