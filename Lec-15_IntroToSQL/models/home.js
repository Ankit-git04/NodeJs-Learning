const db = require('../utils/database');




module.exports=class Home{
    constructor(homeid, homeName, location, price, imageUrl){
        this.homeid = homeid;
        this.homeName = homeName;
        this.location = location;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    save(){
       return db.execute('INSERT INTO homes (homeName, location, price, imageUrl) VALUES (?, ?, ?, ?)', [
            this.homeName,
            this.location,  
            this.price,
            this.imageUrl
        ]);     

       
        
    }

    static fetchAll(){
       return db.execute('SELECT * FROM homes');
    }

    static fetchById(homeid){
        return db.execute('SELECT * FROM homes WHERE homeid = ?', [homeid]);
    }

    static editHome(homeid, updatedData){
        return db.execute('UPDATE homes SET homeName = ?, location = ?, price = ?, imageUrl = ? WHERE homeid = ?', [
            updatedData.homeName,
            updatedData.location,
            updatedData.price,
            updatedData.imageUrl,
            homeid
        ]);
    }



    static DeleteHome(homeid){
        return db.execute('DELETE FROM homes WHERE homeid = ?', [homeid]);
    }

}