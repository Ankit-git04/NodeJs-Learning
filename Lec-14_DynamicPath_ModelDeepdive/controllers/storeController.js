const {registeredHomes} = require('../models/home');
const Home = require('../models/home');
const Bookings= require('../models/bookings');
const favourites = require('../models/favourites');


exports.getHome=(req, res, next) => {
    Home.fetchAll((registeredHomes) => {
        res.render('store/home-list', { registeredHomes: registeredHomes });
    });
};

exports.getHomeDetails=(req, res, next) => {
    const homeid = req.params.homeid;
    Home.fetchById(homeid, (home) => {
        if (!home) {
            return res.status(404).render('404', { pageTitle: 'Home Not Found' });
        }
        res.render('store/homeDetails', { home: home });
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
    favourites.fetchAllFavourites((favouriteHomes) => {
        console.log(favouriteHomes);
        res.render('store/favourites', { favouriteHomes: favouriteHomes });
    });
   
};  

exports.AddToFavourites=(req, res, next) => {
    const homeid = req.params.homeid;       
    const NewFavouriteHome = new favourites(homeid);
    NewFavouriteHome.save();
    
    res.redirect('/favourites');
};
