const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathutils");

module.exports = class Booking {
  constructor(homeid) {
    this.homeid = homeid;
  }
  save() {
    Booking.fetchAllBookings((bookings) => {
      bookings.push(this);
      console.log(bookings);
      const filePath = path.join(rootDir, "data", "bookings.json");
      fs.writeFile(filePath, JSON.stringify(bookings), (err) => {
        if (err) {
          console.error("Error saving booking:", err);
        } else {
          console.log("Booking saved successfully!");
        }
      });
    });
  }

  static fetchAllBookings(callback) {
    const filePath = path.join(rootDir, "data", "bookings.json");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error("Error reading bookings:", err);
        return callback([]);
      }
      try {
        const bookings = JSON.parse(data || "[]");
        const bookedHomeWithDetails = bookings.map((booking) => {
          const homeDataPath = path.join(rootDir, "data", "homes.json");
          const homeData = fs.readFileSync(homeDataPath);
          const homes = JSON.parse(homeData || "[]");
          const home = homes.find((h) => h.homeid === booking.homeid) || {};    

          return {
            ...booking,
            ...home,
          };
        });
        callback(bookedHomeWithDetails);
      } catch (error) {
        console.error("Invalid JSON:", error);
        callback([]);
      }
    });
  }
};
