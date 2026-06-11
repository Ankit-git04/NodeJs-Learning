const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathutils");

module.exports = class favourites {
  constructor(homeid) {
    this.homeid = homeid;
  }
  save() {
    favourites.fetchAllFavourites((favourites) => {
      favourites.push(this);
      console.log(favourites);
      const filePath = path.join(rootDir, "data", "favourites.json");
      fs.writeFile(filePath, JSON.stringify(favourites), (err) => {
        if (err) {
          console.error("Error saving favourite:", err);
        } else {
          console.log("Favourite saved successfully!");
        }
      });
    });
  }

  static fetchAllFavourites(callback) {
    const filePath = path.join(rootDir, "data", "favourites.json");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error("Error reading favourites:", err);
        return callback([]);
      }
      try {
        const favourites = JSON.parse(data || "[]");
        const favouriteHomesWithDetails = favourites.map((favourite) => {
          const homeDataPath = path.join(rootDir, "data", "homes.json");
          const homeData = fs.readFileSync(homeDataPath);
          const homes = JSON.parse(homeData || "[]");
          const home = homes.find((h) => h.homeid === favourite.homeid) || {};

          return {
            ...favourite,
            ...home,
          };
        });
        callback(favouriteHomesWithDetails);
      } catch (error) {
        console.error("Invalid JSON:", error);
        callback([]);
      } 
    });
  }
};
