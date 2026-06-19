const {registeredHomes} = require('../models/home');
const Home = require('../models/home');
const Bookings= require('../models/bookings');
const favourites = require('../models/favourites');


exports.getHome=(req, res, next) => {
    Home.find().then((homes) => {
        res.render('store/home-list', { registeredHomes: homes, pageTitle: 'Home List' });
    }).catch(err => {
        console.error('Error fetching homes:', err);      
    }); 
};

exports.getHomeDetails=(req, res, next) => {
    const _id = req.params._id;
    Home.findById(_id).then((home) => {
        if (!home) {
            return res.status(404).render('404', { pageTitle: 'Home Not Found' });
        }
        res.render('store/homeDetails', { home: home, pageTitle: 'Home Details' });
    }).catch(err => {
        console.error('Error fetching home details:', err);
        res.status(500).render('500', { pageTitle: 'Internal Server Error' });
    });
};

exports.getBookings = (req, res, next) => {
  Bookings.find()
    .then((bookings) => {

      const ids = bookings.map(booking => booking._id);

      return Home.find({
        _id: { $in: ids }
      });

    })
    .then((bookedHomes) => {
      res.render('store/bookings', {
        bookings: bookedHomes,
        pageTitle: 'Bookings'
      });
    })
    .catch(err => {
      console.error('Error fetching bookings:', err);
      res.status(500).render('500', {
        pageTitle: 'Internal Server Error'
      });
    });
};

exports.postBookings=(req, res, next) => {
    const _id = req.params._id;
     const NewBookedHome = new Bookings( {_id});
     NewBookedHome.save().then(() => {
        res.redirect('/bookings');
     }).catch(err => {
           if(err.message === 'Home is already booked') {
            return res.send('Home is already booked.');
        }
        console.error('Error booking home:', err);
        res.status(500).render('500', { pageTitle: 'Internal Server Error' });
        
     });
 
};

exports.getFavourites = (req, res, next) => {
    favourites.find()
        .then((favouriteHomesIds) => {

            const ids = favouriteHomesIds.map(fav => fav._id);

            return Home.find({
                _id: { $in: ids }
            });
        })
        .then((favouriteHomes) => {
            res.render('store/favourites', {
                favouriteHomes,
                pageTitle: 'Favourites'
            });
        })
        .catch(err => {
            console.error('Error fetching favourite homes:', err);
            res.status(500).render('500', {
                pageTitle: 'Internal Server Error'
            });
        });
};

exports.AddToFavourites = (req, res, next) => {
    const _id = req.params._id;

    const NewFavouriteHome = new favourites({_id});

    NewFavouriteHome.save()
        .then(() => {
            res.redirect('/favourites');
        })
        .catch(err => {
            if (err.message === 'Home already in favourites') {
                return res.send('Home is already marked as favourite.');
            }

            console.error(err);
            res.status(500).render('500');
        });
};
    
    

exports.RemoveFromFavourites=(req, res, next) => {
    const _id = req.params._id;
   favourites.findByIdAndDelete(_id).then(() => {
        res.redirect('/favourites');
    }).catch(err => {
        console.error('Error removing from favourites:', err);
        res.status(500).render('500', { pageTitle: 'Internal Server Error' });
    });
};      
