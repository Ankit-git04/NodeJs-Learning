const mongoose = require('mongoose');
const favourites = require('./favourites');
const Bookings = require('./bookings');


const homeSchema = new mongoose.Schema({
    homeName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },  
   homeImage: {
        type: String
    },
     hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }   

}); 

homeSchema.post('findOneAndDelete', async function(doc) {
    if (!doc) return;

    const User = mongoose.model('User');
    const Booking = mongoose.model('Booking');

    // remove from favourites
    await User.updateMany(
        {},
        {
            $pull: {
                favourites: doc._id
            }
        }
    );

    // remove all bookings related to this home
    await Booking.deleteMany({ homeId: doc._id });
});

const Home = mongoose.model('Home', homeSchema);
 
 
 



module.exports = Home;








