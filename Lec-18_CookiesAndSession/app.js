
require('dotenv').config();

const express = require("express");
const path = require('path');
const session=require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();




const {storeRouter} = require('./routes/storeRouter');
const {hostRouter} = require('./routes/hostRouter');
const {authRouter}= require('./routes/authRouter');
const rootDir = require('./utils/pathutils');
const {mongoClient} = require('./utils/database');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(rootDir, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
});

app.use(session({
  secret: 'airbnb_secret_key',
  resave: false,
  saveUninitialized: false,
  // 1 hour
  store: store
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((req,res,next)=>{
  console.log('Cookies:', req.get('Cookie'));
  req.isLoggedIn = req.session.isLoggedIn || false;
  console.log('isLoggedIn:', req.isLoggedIn);
  next();
});

app.use('/host',(req,res,next)=>{
  if(req.isLoggedIn) {
    next();
  } else {
   return res.redirect('/auth/login');
  }
});

app.use( storeRouter);
app.use('/auth',authRouter);
app.use('/host', hostRouter);


app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

// Sample data for listings and bookings  




const port = 3000;

mongoClient(()=>{
  
  app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
})


