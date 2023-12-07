const mongoose = require('mongoose');

const dbURI = 'mongodb://root:example@127.0.0.1:27017/Reservation?replicaSet=rs0&authSource=admin';

async function connectToDatabase() {
  try {
    await mongoose.connect(dbURI, {
      authSource: 'admin',
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
require('../models/table-reservation');

module.exports = { connectToDatabase };
