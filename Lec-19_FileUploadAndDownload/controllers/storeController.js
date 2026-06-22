const {registeredHomes} = require('../models/home');
const Home = require('../models/home');

const User = require('../models/User');


exports.getHome=(req, res, next) => {
    Home.find().then((homes) => {
        res.render('store/home-list', { registeredHomes: homes, pageTitle: 'Home List', isLoggedIn: req.isLoggedIn,user: req.user });
    }).catch(err => {
        console.error('Error fetching homes:', err);      
    }); 
};

exports.getHomeDetails=(req, res, next) => {
    const _id = req.params._id;
    Home.findById(_id).then((home) => {
        if (!home) {
            return res.status(404).render('404', { pageTitle: 'Home Not Found', isLoggedIn: req.isLoggedIn });
        }
        res.render('store/homeDetails', { home: home, pageTitle: 'Home Details', isLoggedIn: req.isLoggedIn });
    }).catch(err => {
        console.error('Error fetching home details:', err);
        res.status(500).render('500', { pageTitle: 'Internal Server Error', isLoggedIn: req.isLoggedIn });
    });
};

exports.getBookings = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).render('401', { pageTitle: 'Unauthorized', isLoggedIn: req.isLoggedIn });
  }

  User.findById(user._id)
    .populate('bookings')
    .then((user) => {
      res.render('store/bookings', {
        bookings: user.bookings,
        pageTitle: 'Bookings',
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch(err => {
      console.error('Error fetching bookings:', err);
      res.status(500).render('500', {
        pageTitle: 'Internal Server Error',
        isLoggedIn: req.isLoggedIn
      });
    });
};

exports.postBookings=(req, res, next) => {
    const _id = req.params._id;
    const user=req.user;
    if (!user) {
        return res.status(401).render('401', { pageTitle: 'Unauthorized', isLoggedIn: req.isLoggedIn });
    }
    if (user.bookings.includes(_id)) {
        return res.send('You have already booked this home.');
    }
    user.bookings.push(_id);
    user.save().then(() => {
        res.redirect('/bookings');
    }).catch(err => {
        console.error('Error adding to bookings:', err);
        res.status(500).render('500', { pageTitle: 'Internal Server Error', isLoggedIn: req.isLoggedIn });
    });
   
};

exports.getFavourites = (req, res, next) => {
    User.findById(req.user._id)
        .populate('favourites')
        .then((user) => {
            res.render('store/favourites', {
                favouriteHomes: user.favourites,
                pageTitle: 'Favourites', 
                isLoggedIn: req.isLoggedIn
            });
        })
        .catch(err => {
            console.error('Error fetching favourite homes:', err);
            res.status(500).render('500', {
                pageTitle: 'Internal Server Error'
                , isLoggedIn: req.isLoggedIn
            });
        });
};

exports.AddToFavourites = (req, res, next) => {
    const _id = req.params._id;
    const user=req.user;
    if (!user) {
        return res.status(401).render('401', { pageTitle: 'Unauthorized', isLoggedIn: req.isLoggedIn });
    }
        if (user.favourites.includes(_id)) {
            return res.send('Home is already marked as favourite.');
        }

    
    user.favourites.push(_id);
    user.save().then(() => {
        res.redirect('/favourites');
    }).catch(err => {
        console.error('Error adding to favourites:', err);
        res.status(500).render('500', { pageTitle: 'Internal Server Error', isLoggedIn: req.isLoggedIn });
    });
    
};
    
    

exports.RemoveFromFavourites=(req, res, next) => {
    const _id = req.params._id;
    const user=req.user;
    if (!user) {
        return res.status(401).render('401', { pageTitle: 'Unauthorized', isLoggedIn: req.isLoggedIn });
    }
    user.favourites.pull(_id);
    user.save().then(() => {
        res.redirect('/favourites');
    }).catch(err => {
        console.error('Error removing from favourites:', err);
        res.status(500).render('500', { pageTitle: 'Internal Server Error', isLoggedIn: req.isLoggedIn });
    });
};      
