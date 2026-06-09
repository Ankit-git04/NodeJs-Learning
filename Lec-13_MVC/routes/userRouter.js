const express = require("express");
const userRouter = express.Router();
const path = require('path');

const homesController= require('../controllers/home')

// const {registeredHomes} = require('../routes/hostRouter');

// const HomePage= path.join(__dirname, '../views/home.html');

userRouter.get('/', homesController.getHome);

exports.userRouter = userRouter;