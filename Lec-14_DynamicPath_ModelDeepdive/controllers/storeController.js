const {registeredHomes} = require('../models/home');
const Home = require('../models/home');
const Bookings= require('../models/bookings');


exports.getHome=(req, res, next) => {
    Home.fetchAll((registeredHomes) => {
        res.render('store/home-list', { registeredHomes: registeredHomes });
    });
};

exports.getBookings=(req, res, next) => {
  Bookings.fetchAllBookings((bookings) => {
    console.log(bookings);
    res.render('store/bookings', { bookings: bookings });
  });
};

exports.postBookings=(req, res, next) => {
    const homeid = req.params.homeid;
     const NewBookedHome = new Bookings(homeid);
     NewBookedHome.save();
        res.redirect('/bookings');
 
};

exports.getFavourites=(req, res, next) => {
    res.render('store/favourites', { pageTitle: 'Your Favourites' });
};  
