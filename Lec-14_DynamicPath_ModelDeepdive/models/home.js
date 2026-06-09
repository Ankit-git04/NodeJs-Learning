const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathutils');








module.exports=class Home{
    constructor(homeid, homeName, location, price, imageUrl){
        this.homeid = homeid;
        this.homeName = homeName;
        this.location = location;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    save(){
        // Here you would normally handle the form data and save it to a database
        Home.fetchAll((registeredHomes) => {
            registeredHomes.push(this);
            console.log(registeredHomes);
            const filePath = path.join(rootDir, 'data', 'homes.json');
            fs.writeFile(filePath, JSON.stringify(registeredHomes), (err) => {
                if (err) {
                    console.error('Error saving home:', err);
                } else {
                    console.log('Home saved successfully!');
                }
            });
        });

        
    }

    static fetchAll(callback){
        const filePath = path.join(rootDir, 'data', 'homes.json');
        fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading homes:', err);
            return callback([]);
        }
         
        try {
            const homes = JSON.parse(data || '[]');
            callback(homes);
        } catch (error) {
            console.error('Invalid JSON:', error);
            callback([]);
        }
    });

       
    }



}
