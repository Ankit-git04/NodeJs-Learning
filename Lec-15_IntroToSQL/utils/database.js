 const mysql = require('mysql2');

 const pool=mysql.createPool({
    host:'localhost',
    user: 'username',
    password: 'Passsword of your Database',
    database: 'databaseName',

 }) ;

 const promisePool=pool.promise();

 module.exports=promisePool;
