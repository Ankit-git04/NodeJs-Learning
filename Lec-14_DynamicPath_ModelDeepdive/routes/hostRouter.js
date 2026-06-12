const express= require('express');
const hostRouter = express.Router(); 
const path = require('path'); 
const rootDir = require('../utils/pathutils'); 

const hostController= require('../controllers/hostController');

hostRouter.get('/', hostController.getHostHome);

hostRouter.get('/add-home',  hostController.getAddHome);
hostRouter.post('/add-home', hostController.postAddHome);

hostRouter.get('/edit-home/:homeid', hostController.getEditHome);
hostRouter.post('/edit-home/:homeid', hostController.postEditHome);
hostRouter.post('/delete-home/:homeid', hostController.postDeleteHome);

exports.hostRouter = hostRouter;
