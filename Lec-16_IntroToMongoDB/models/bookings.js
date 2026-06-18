const {getDb}= require('../utils/database');
const { ObjectId } = require('mongodb');

module.exports = class Booking {
  constructor(_id) {
    this._id = _id;
  }
  async save() {
   const db = getDb();
   const existingBooking = await db.collection('bookings').findOne({ _id: this._id });
   if (existingBooking) {
     throw new Error("Home is already booked");
   }
   return db.collection('bookings').insertOne(this);
   
  }

  static async fetchAllBookings() {
    const db = getDb();
    const bookings = await db.collection('bookings').find().toArray();
    const _ids = bookings.map(booking => new ObjectId(booking._id));
    return db.collection('homes').find({ _id: { $in: _ids } }).toArray();
  }

  static RemoveFromBookings(_id) {
    const db = getDb();
    return db.collection('bookings').deleteOne({ _id:_id });
  } 
};
