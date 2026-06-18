const {getDb} = require('../utils/database');
const { ObjectId } = require('mongodb');




module.exports=class Home{
 
    constructor( homeName, location, price, imageUrl){
      
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

    static fetchById(_id){
        const db = getDb();
        return db.collection('homes').findOne({ _id: new ObjectId(_id) });
    }

    static editHome(_id, updatedData){
        const db = getDb();
        return db.collection('homes').updateOne({ _id: new ObjectId(_id) }, { $set: updatedData });
    }



    static DeleteHome(_id){
        const db = getDb();
        return db.collection('homes').deleteOne({ _id: new ObjectId(_id) });
    }

}