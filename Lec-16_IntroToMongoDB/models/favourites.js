const {getDb} = require('../utils/database');
const { ObjectId } = require('mongodb');

module.exports = class favourites {
  constructor(_id) {
    this._id = _id;
  }
  async save() {
      const db= getDb();
      const _id= await db.collection('favourites').findOne({ _id: this._id });
      if(_id){
        throw new Error("Home already in favourites");
      }
      else{
      return db.collection('favourites').insertOne(this);
      }
  }

  static async fetchAllFavourites() {
    const db = getDb();

    const favourites = await db.collection('favourites').find().toArray();

    const favouriteIds = favourites.map(
    fav => new ObjectId(fav._id)
);

    return db.collection('homes')
        .find({ _id: { $in: favouriteIds } })
        .toArray();
}
   
  static RemoveFromFavourites(_id) {
    const db = getDb();
    return db.collection('favourites').deleteOne({ _id: _id });
  }

 


 
};
