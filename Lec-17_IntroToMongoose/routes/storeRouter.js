const express = require("express");
const storeRouter = express.Router();
const path = require('path');

const homesController= require('../controllers/storeController');



storeRouter.get('/', homesController.getHome);

storeRouter.get('/Homedetails/:_id', homesController.getHomeDetails);


storeRouter.get('/bookings',homesController.getBookings);
storeRouter.post('/bookings/:_id',homesController.postBookings);
storeRouter.get('/favourites',homesController.getFavourites);
storeRouter.post('/favourites/:_id', homesController.AddToFavourites);
storeRouter.post('/favourites/delete/:_id', homesController.RemoveFromFavourites);

exports.storeRouter = storeRouter;