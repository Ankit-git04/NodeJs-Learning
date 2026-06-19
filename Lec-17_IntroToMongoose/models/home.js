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

  await favourites.deleteMany({ _id: doc._id });
  await Bookings.deleteMany({ _id: doc._id });
});

const Home = mongoose.model('Home', homeSchema);
 
 
 



module.exports = Home;








