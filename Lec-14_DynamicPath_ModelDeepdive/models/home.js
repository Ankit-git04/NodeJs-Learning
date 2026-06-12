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

    static fetchById(homeid, callback){
        const filePath = path.join(rootDir, 'data', 'homes.json');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error('Error reading homes:', err);
                return callback(null);
            }
             
            try {
                const homes = JSON.parse(data || '[]');
                const home = homes.find(h => h.homeid === homeid);
                callback(home || null);
            } catch (error) {
                console.error('Invalid JSON:', error);
                callback(null);
            }
        });
    }

    static editHome(homeid, updatedData, callback){
        const filePath = path.join(rootDir, 'data', 'homes.json');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error('Error reading homes:', err);
                return callback(false);
            }   
            try {
                const homes = JSON.parse(data || '[]');
                const homeIndex = homes.findIndex(h => h.homeid === homeid);    
                if (homeIndex === -1) {
                    return callback(false);
                }   
                homes[homeIndex] = { ...homes[homeIndex], ...updatedData };
                fs.writeFile(filePath, JSON.stringify(homes), (err) => {
                    if (err) {
                        console.error('Error updating home:', err);
                        return callback(false);
                    }   
                    callback(true);
                });
            } catch (error) {
                console.error('Invalid JSON:', error);
                callback(false);
            }
        });
    }



    static DeleteHome(homeid, callback){
        const filePath = path.join(rootDir, 'data', 'homes.json');  
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error('Error reading homes:', err);
                return callback(false);
            }       
            try {
                const homes = JSON.parse(data || '[]');
                const updatedHomes = homes.filter(h => h.homeid !== homeid);    
                fs.writeFile(filePath, JSON.stringify(updatedHomes), (err) => {
                    if (err) {
                        console.error('Error deleting home:', err);
                        return callback(false);
                    }
                    callback(true);
                });
            } catch (error) {
                console.error('Invalid JSON:', error);
                callback(false);
            }
        });
    }

}