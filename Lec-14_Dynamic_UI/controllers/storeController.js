const {registeredHomes} = require('../models/store');
const store = require('../models/store');
const path = require('path');
const fs = require('fs');

const bookingsPath = path.join(__dirname, '../data/bookings.json');

exports.getHome=(req, res, next) => {
    store.fetchAll((registeredHomes) => {
        res.render('store/home-list', { registeredHomes: registeredHomes });
    });
};

exports.getBookings=(req, res, next)=>{
  store.fetchAllbookings((bookings)=>{
    res.render('store/bookings', { bookings: bookings });
  });
};
 
exports.getFavourites=(req, res, next)=>{
  res.render('store/favourites');
};
