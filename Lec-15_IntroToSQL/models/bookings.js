const db = require('../utils/database');

module.exports = class Booking {
  constructor(homeid) {
    this.homeid = homeid;
  }
  save() {
    return db.execute('INSERT INTO bookings (homeid) VALUES (?)', [
      this.homeid
    ]);
  }

  static fetchAllBookings() {
    return db.execute('SELECT * FROM homes WHERE homeid IN (SELECT homeid FROM bookings)' );
  }
};
