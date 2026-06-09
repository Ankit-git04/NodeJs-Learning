const express= require('express');
const hostRouter = express.Router(); 
const path = require('path'); 
const rootDir = require('../utils/pathutils'); 

const homesController= require('../controllers/home')

hostRouter.get('/add-home',  homesController.getAddHome);

 
hostRouter.post('/add-home', homesController.postAddHome);

exports.hostRouter = hostRouter;
