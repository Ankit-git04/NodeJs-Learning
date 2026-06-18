const {registeredHomes} = require('../models/home');
const Home = require('../models/home');
const Bookings= require('../models/bookings');
const favourites = require('../models/favourites');


exports.getAddHome=(req, res, next) => {
  res.render('host/AddHome', { pageTitle: 'Add Home' });
};


exports.getHostHome=(req, res, next) => {
    Home.fetchAll().then((homes) => {
        res.render('host/host-home-list', { registeredHomes: homes, pageTitle: 'Host Home List' });
    } 
  ).catch(err => {
        console.error('Error fetching homes:', err);      
    }) ;
};
  
exports.getEditHome=(req, res, next) => {
  const _id = req.params._id;
  Home.fetchById(_id).then((home) => {
    if (!home) {
        return res.status(404).render('404', { pageTitle: 'Home Not Found' });
    } 
    res.render('host/EditHome', { home: home, pageTitle: 'Edit Home' });
  }).catch(err => {
    console.error('Error fetching home details:', err);
    res.status(500).render('500', { pageTitle: 'Internal Server Error' });
  });
};

exports.postEditHome=(req, res, next) => {
  const _id = req.params._id;
  // Here you would normally handle the form data and update the home in the database
    Home.editHome(_id, req.body).then(() => {
        res.redirect('/host');
    }).catch(err => {
        console.error('Error updating home:', err);
        res.status(500).render('500', { pageTitle: 'Internal Server Error' });
    } );
};

exports.postDeleteHome = (req, res, next) => {
  const _id = req.params._id;
console.log("Deleting:", req.params._id);
 Home.DeleteHome(_id)
  .then(() => favourites.RemoveFromFavourites(_id))
  .then(() => Bookings.RemoveFromBookings(_id))
  .then(() => {
      res.redirect('/host');
  }).catch(err => {
    console.error('Error deleting home:', err);
    res.status(500).render('500', { pageTitle: 'Internal Server Error' });
  });
};





  // This will store the registered homes in memory
exports.postAddHome=(req, res, next) => {
  // Here you would normally handle the form data and save it to a database
  const { homeName, location, price, imageUrl } = req.body;
  //  const _id= Math.random().toString(); // Generate a random ID for the home
  console.log(homeName);
  const newHome = new Home( homeName, location, price, imageUrl);
  newHome.save().then(() => {
    console.log('Home saved successfully!');
    res.render('host/HomeAdded', { pageTitle: 'Home Added' }); 
  }).catch(err => {
    console.error('Error saving home:', err);
    res.status(500).render('500', { pageTitle: 'Internal Server Error' });
  });

  
}
