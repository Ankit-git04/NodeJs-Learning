const {registeredHomes} = require('../models/store');
const Home = require('../models/store');


exports.getAddHome=(req, res, next) => {
  res.render('host/AddHome', { pageTitle: 'Add Home' });
};




  // This will store the registered homes in memory
exports.postAddHome=(req, res, next) => {
  // Here you would normally handle the form data and save it to a database
  const { homeName, location, price, imageUrl } = req.body;
  console.log(homeName);
  const newHome = new Home(homeName, location, price, imageUrl);
  newHome.save();
  res.render('host/HomeAdded', { pageTitle: 'Home Added' });
}

