const express = require("express");
const storeRouter = express.Router();
const path = require('path');

const homesController= require('../controllers/storeController');

// const {registeredHomes} = require('../routes/hostRouter');

// const HomePage= path.join(__dirname, '../views/home.html');

storeRouter.get('/', homesController.getHome);

storeRouter.get('/bookings',homesController.getBookings);
storeRouter.get('/favourites',homesController.getFavourites);
exports.storeRouter = storeRouter;