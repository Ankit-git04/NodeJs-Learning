const {getDb} = require('../utils/database');

module.exports = class favourites {
  constructor(homeid) {
    this.homeid = homeid;
  }
  async save() {
      const db= getDb();
      const homeid= await db.collection('favourites').findOne({ homeid: this.homeid });
      if(homeid){
        throw new Error("Home already in favourites");
      }
      else{
      return db.collection('favourites').insertOne(this);
      }
  }

  static async fetchAllFavourites() {
    const db = getDb();

    const favourites = await db.collection('favourites').find().toArray();

    const homeIds = favourites.map(fav => fav.homeid);

    return db.collection('homes').find({ homeid: { $in: homeIds } }).toArray();
}
   
  static RemoveFromFavourites(homeid) {
    const db = getDb();
    return db.collection('favourites').deleteOne({ homeid: homeid });
  }




 
};
