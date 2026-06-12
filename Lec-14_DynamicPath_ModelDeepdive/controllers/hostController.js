const {registeredHomes} = require('../models/home');
const Home = require('../models/home');


exports.getAddHome=(req, res, next) => {
  res.render('host/AddHome', { pageTitle: 'Add Home' });
};


exports.getHostHome=(req, res, next) => {
    Home.fetchAll((registeredHomes) => {
        res.render('host/host-home-list', { registeredHomes: registeredHomes });
    });
};
  
exports.getEditHome=(req, res, next) => {
  const homeid = req.params.homeid;
  Home.fetchById(homeid, (home) => {
    if (!home) {
      return res.status(404).render('404', { pageTitle: 'Home Not Found' });
    }
    res.render('host/EditHome', { home: home, pageTitle: 'Edit Home' });
  });
};

exports.postEditHome=(req, res, next) => {
  const homeid = req.params.homeid;
  // Here you would normally handle the form data and update the home in the database
    Home.editHome(homeid, req.body, (success) => {
    if (!success) {
        console.error("Failed to update home");
        return res.status(500).send("Failed to update home");
    }

    res.redirect('/host');
});
};

exports.postDeleteHome = (req, res, next) => {
  const homeid = req.params.homeid;

  Home.DeleteHome(homeid, (success) => {
    if (!success) {
      console.error("Failed to delete home");
      return res.status(500).send("Failed to delete home");
    }

    res.redirect('/host');
  });
};





  // This will store the registered homes in memory
exports.postAddHome=(req, res, next) => {
  // Here you would normally handle the form data and save it to a database
  const { homeName, location, price, imageUrl } = req.body;
   const homeid= Math.random().toString(); // Generate a random ID for the home
  console.log(homeName);
  const newHome = new Home(homeid, homeName, location, price, imageUrl);
  newHome.save();
  res.render('host/HomeAdded', { pageTitle: 'Home Added' }); 
}
