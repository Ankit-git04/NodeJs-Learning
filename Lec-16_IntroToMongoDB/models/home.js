const {getDb} = require('../utils/database');





module.exports=class Home{
 
    constructor(homeid, homeName, location, price, imageUrl){
        this.homeid = homeid;
        this.homeName = homeName;
        this.location = location;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    save(){
        const db = getDb();
       return db.collection('homes').insertOne(this);
        
    }

    static fetchAll(){
       const db = getDb();
       return db.collection('homes').find().toArray();
    }

    static fetchById(homeid){
        const db = getDb();
        return db.collection('homes').findOne({ homeid: homeid });
    }

    static editHome(homeid, updatedData){
        const db = getDb();
        return db.collection('homes').updateOne({ homeid: homeid }, { $set: updatedData });
    }



    static DeleteHome(homeid){
        const db = getDb();
        return db.collection('homes').deleteOne({ homeid: homeid });
    }

}