const {registeredHomes} = require('../models/home');
const Home = require('../models/home');


exports.getAddHome=(req, res, next) => {
  res.render('AddHome', { pageTitle: 'Add Home' });
};


exports.getHome=(req, res, next) => {
    Home.fetchAll((registeredHomes) => {
        res.render('home', { registeredHomes: registeredHomes });
    });
};

  // This will store the registered homes in memory
exports.postAddHome=(req, res, next) => {
  // Here you would normally handle the form data and save it to a database
  const { homeName, location, price, imageUrl } = req.body;
  console.log(homeName);
  const newHome = new Home(homeName, location, price, imageUrl);
  newHome.save();
  res.render('HomeAdded', { pageTitle: 'Home Added' });
}
