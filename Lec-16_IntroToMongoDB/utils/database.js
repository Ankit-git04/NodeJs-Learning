const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const mongo_url = 
'mongodb+srv://anky_04:mongodb%40123@airbnb.mvprmaz.mongodb.net/airbnb?retryWrites=true&w=majority ';

let _db;

const mongoClient = (callback)=>{
      MongoClient.connect(mongo_url).then((client)=>{

        
        _db = client.db('airbnb');
        callback();
      })
      .catch((err)=>{
        console.log("Error connecting to MongoDB:", err);
      })  

}

const getDb = ()=>{
    if(!_db){
        throw new Error("Database not initialized");
    }
    return _db;
}

exports.mongoClient = mongoClient;
exports.getDb = getDb;