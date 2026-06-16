const express = require("express");
const app = express();
const path = require('path');

const {storeRouter} = require('./routes/storeRouter');
const {hostRouter} = require('./routes/hostRouter');
const rootDir = require('./utils/pathutils');
const {mongoClient} = require('./utils/database');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(rootDir, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');



app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use( storeRouter);
app.use('/host', hostRouter);


app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

// Sample data for listings and bookings  




const port = 3000;

mongoClient((client)=>{
  console.log("Connected to MongoDB successfully!");
  app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
})


