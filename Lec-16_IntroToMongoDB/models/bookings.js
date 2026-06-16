const {getDb}= require('../utils/database');

module.exports = class Booking {
  constructor(homeid) {
    this.homeid = homeid;
  }
  async save() {
   const db = getDb();
   const existingBooking = await db.collection('bookings').findOne({ homeid: this.homeid });
   if (existingBooking) {
     throw new Error("Home is already booked");
   }
   return db.collection('bookings').insertOne(this);
   
  }

  static async fetchAllBookings() {
    const db = getDb();
    const bookings = await db.collection('bookings').find().toArray();
    const homeIds = bookings.map(booking => booking.homeid);
    return db.collection('homes').find({ homeid: { $in: homeIds } }).toArray();
  }
};
