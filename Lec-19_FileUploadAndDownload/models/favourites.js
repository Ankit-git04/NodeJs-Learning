
const { ObjectId } = require('mongodb');

const mongoose = require('mongoose');
const favouriteSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Home',
        required: true
    }
});

const favourites = mongoose.model('favourites', favouriteSchema);

module.exports = favourites;



