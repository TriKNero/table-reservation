const mongoose = require('mongoose');

const TableReservationSchema = new mongoose.Schema({
  reservationDate: {
    type: Date,
    required: true,
  },
  reserved: Boolean,
  guests: [String],
});

module.exports = mongoose.model('TableReservation', TableReservationSchema);
