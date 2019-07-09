const MongoClient = require('mongodb').MongoClient; 
const url = 'mongodb://localhost:27017';
const dbName = 'coe'

module.exports.up = function (next) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection('organizations').insertOne({
      code: 'kia',
      name: 'KIA'
    }, (err, results) => {
      client.close();
      next();
    })   
  })
}

module.exports.down = function (next) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection('organizations').deleteOne({
      code: 'kia'
    }, (err, results) => {
      client.close();
      next();
    })        
  })
}



