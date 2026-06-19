
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home',
        required: true
    }
});

const Bookings = mongoose.model('Bookings', bookingSchema);

module.exports = Bookings;




