const MongoClient = require('mongodb').MongoClient;
const { connect, database, user, pwd } = require('../config/config').mongo;

let connection = {};

MongoClient.connect(`mongodb://${user}:${pwd}@${connect}/${database}`)
    .then(db => {
        console.log('Connection to MongoDb is successful.');
        connection = db;
    })
    .catch(err => Promise.reject(err))

module.exports = connection;

