const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// Show registration form with optional success message
router.get('/register', (req, res) => {
  const success = req.query.success;
  res.render('registerHotel', { success });
});

router.post('/register', async (req, res) => {
  const { name, location, roomsAvailable } = req.body;
  await Hotel.create({ name, location, roomsAvailable });
  res.redirect('/hotels/register?success=register');
});

router.get('/list', async (req, res) => {
  const hotels = await Hotel.find();
  const success = req.query.success; // ✅ get success from query params
  res.render('hotelList', { hotels, success }); // ✅ pass success to the view
});

router.post('/:id/delete', async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.id);
  res.redirect('/hotels/list?success=unregister');
});

module.exports = router;
