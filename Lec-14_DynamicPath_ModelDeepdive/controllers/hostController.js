const {registeredHomes} = require('../models/home');
const Home = require('../models/home');


exports.getAddHome=(req, res, next) => {
  res.render('host/AddHome', { pageTitle: 'Add Home' });
};


exports.getHome=(req, res, next) => {
    Home.fetchAll((registeredHomes) => {
        res.render('host/host-home-list', { registeredHomes: registeredHomes });
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
