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
    imageUrl: {
        type: String,
    }   

}); 

homeSchema.post('findOneAndDelete', async function(doc) {
    if (!doc) return;

    const User = mongoose.model('user');

    await User.updateMany(
        {},
        {
            $pull: {
                favourites: doc._id,
                bookings: doc._id
            }
        }
    );
});

const Home = mongoose.model('Home', homeSchema);
 
 
 



module.exports = Home;








