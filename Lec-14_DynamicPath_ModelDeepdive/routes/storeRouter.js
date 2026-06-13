const express = require("express");
const storeRouter = express.Router();
const path = require('path');

const homesController= require('../controllers/storeController');

// const {registeredHomes} = require('../routes/hostRouter');

// const HomePage= path.join(__dirname, '../views/home.html');

storeRouter.get('/', homesController.getHome);

storeRouter.get('/Homedetails/:homeid', homesController.getHomeDetails);


storeRouter.get('/bookings',homesController.getBookings);
storeRouter.post('/bookings/:homeid',homesController.postBookings);
storeRouter.get('/favourites',homesController.getFavourites);
storeRouter.post('/favourites/:homeid', homesController.AddToFavourites);
storeRouter.post('/favourites/delete/:homeid', homesController.RemoveFromFavourites);

exports.storeRouter = storeRouter;