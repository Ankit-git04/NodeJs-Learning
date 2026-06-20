const {registeredHomes} = require('../models/home');
const Home = require('../models/home');
const Bookings= require('../models/bookings');
const favourites = require('../models/favourites');


exports.getAddHome=(req, res, next) => {
    

  res.render('host/AddHome', { pageTitle: 'Add Home' , isLoggedIn: req.isLoggedIn});
};


exports.getHostHome=(req, res, next) => {
    Home.find().then((homes) => {
        res.render('host/host-home-list', { registeredHomes: homes, pageTitle: 'Host Home List' , isLoggedIn: req.isLoggedIn});
    } 
  ).catch(err => {
        console.error('Error fetching homes:', err);      
    }) ;
};
  
exports.getEditHome=(req, res, next) => {
  const _id = req.params._id;
  Home.findById(_id).then((home) => {
    if (!home) {
        return res.status(404).render('404', { pageTitle: 'Home Not Found' });
    } 
    res.render('host/EditHome', { home: home, pageTitle: 'Edit Home', isLoggedIn: req.isLoggedIn });
  }).catch(err => {
    console.error('Error fetching home details:', err);
    res.status(500).render('500', { pageTitle: 'Internal Server Error' });
  });
};

exports.postEditHome=(req, res, next) => {
  const _id = req.params._id;
  // Here you would normally handle the form data and update the home in the database
    Home.findByIdAndUpdate(_id, req.body, { new: true }).then(() => {
        res.redirect('/host');
    }).catch(err => {
        console.error('Error updating home:', err);
        res.status(500).render('500', { pageTitle: 'Internal Server Error',isLoggedIn: isLoggedIn });
    } );
};

exports.postDeleteHome = (req, res, next) => {
  const _id = req.params._id;
console.log("Deleting:", req.params._id);
 Home.findByIdAndDelete(_id).then(() => {
      res.redirect('/host');
  }).catch(err => {
    console.error('Error deleting home:', err);
    res.status(500).render('500', { pageTitle: 'Internal Server Error', isLoggedIn: req.isLoggedIn });
  });
};





  // This will store the registered homes in memory
exports.postAddHome=(req, res, next) => {
  // Here you would normally handle the form data and save it to a database
  const { homeName, location, price, imageUrl } = req.body;
  //  const _id= Math.random().toString(); // Generate a random ID for the home
  console.log(homeName);
  const newHome = new Home( { homeName, location, price, imageUrl } );
  newHome.save().then(() => {
    console.log('Home saved successfully!');
    res.render('host/HomeAdded', { pageTitle: 'Home Added', isLoggedIn: req.isLoggedIn }); 
  }).catch(err => {
    console.error('Error saving home:', err);
    res.status(500).render('500', { pageTitle: 'Internal Server Error', isLoggedIn: req.isLoggedIn });
  });

  
}
