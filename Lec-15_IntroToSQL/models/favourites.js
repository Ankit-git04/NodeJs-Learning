const  db = require('../utils/database');

module.exports = class favourites {
  constructor(homeid) {
    this.homeid = homeid;
  }
  save() {
      return db.execute('INSERT INTO favourites (homeid) VALUES (?)', [
        this.homeid
    ]); 
  }

  static fetchAllFavourites() {
   
    return db.execute('SELECT * FROM homes WHERE homeid IN (SELECT homeid FROM favourites)');


  }
   
  static RemoveFromFavourites(homeid) {
    return db.execute('DELETE FROM favourites WHERE homeid = ?', [homeid]);
    }




 
};
