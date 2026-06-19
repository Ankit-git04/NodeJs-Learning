const mongoose = require('mongoose');

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

const Home = mongoose.model('Home', homeSchema);
 
 
 



module.exports = Home;








