const {registeredHomes} = require('../models/home');
const Home = require('../models/home');
const Bookings= require('../models/bookings');
const favourites = require('../models/favourites');


exports.getHome=(req, res, next) => {
    Home.fetchAll().then(([rows, fieldData]) => {
        res.render('store/home-list', { registeredHomes: rows });
    }).catch(err => {
        console.error('Error fetching homes:', err);      
    }); 
};

exports.getHomeDetails=(req, res, next) => {
    const homeid = req.params.homeid;
    Home.fetchById(homeid).then(([rows, fieldData]) => {
        if (rows.length === 0) {
            return res.status(404).render('404', { pageTitle: 'Home Not Found' });
        }
        res.render('store/homeDetails', { home: rows[0] });
    }).catch(err => {
        console.error('Error fetching home details:', err);
        res.status(500).render('500', { pageTitle: 'Internal Server Error' });
    });
};

exports.getBookings=(req, res, next) => {
  Bookings.fetchAllBookings().then(([rows, fieldData]) => {
    console.log(rows);
    res.render('store/bookings', { bookings: rows });
  }).catch(err => {
    console.error('Error fetching bookings:', err);
    res.status(500).render('500', { pageTitle: 'Internal Server Error' });
  });
};

exports.postBookings=(req, res, next) => {
    const homeid = req.params.homeid;
     const NewBookedHome = new Bookings(homeid);
     NewBookedHome.save().then(() => {
        res.redirect('/bookings');
     }).catch(err => {
           if(err.code === 'ER_DUP_ENTRY') {
            return res.send('Home is already booked.');
        }
        console.error('Error booking home:', err);
        res.status(500).render('500', { pageTitle: 'Internal Server Error' });
        
     });
 
};

exports.getFavourites=(req, res, next) => {
    favourites.fetchAllFavourites().then(([rows, fieldData]) => {
        console.log(rows);
        res.render('store/favourites', { favouriteHomes: rows });
    }).catch(err => {
        console.error('Error fetching favourite homes:', err);
        res.status(500).render('500', { pageTitle: 'Internal Server Error' });
    });
   
};  

exports.AddToFavourites = (req, res, next) => {
    const homeid = req.params.homeid;

    const NewFavouriteHome = new favourites(homeid);

    NewFavouriteHome.save()
        .then(() => {
            res.redirect('/favourites');
        })
        .catch(err => {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.send('Home is already marked as favourite.');
            }

            console.error(err);
            res.status(500).render('500');
        });
};
    
    

exports.RemoveFromFavourites=(req, res, next) => {
    const homeid = req.params.homeid;
   favourites.RemoveFromFavourites(homeid).then(() => {
        res.redirect('/favourites');
    }).catch(err => {
        console.error('Error removing from favourites:', err);
        res.status(500).render('500', { pageTitle: 'Internal Server Error' });
    });
};      
