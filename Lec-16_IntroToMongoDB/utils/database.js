const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
require('dotenv').config();

const mongo_url = process.env.MONGODB_URL;

let _db;
   console.log("Mongo URL:", mongo_url);
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