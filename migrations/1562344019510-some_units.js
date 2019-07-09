const MongoClient = require('mongodb').MongoClient; 
const url = 'mongodb://localhost:27017';
const dbName = 'coe'

module.exports.up = function (next) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection('units').insertMany([{
    	code: '11005',
      name: 'HARRIS KIA',
      address : "2575 BOWEN ROAD",
      city : "NANAIMO",
      province : "BC",
      postal_code : "V9T3L4",      
      org_code: 'kia'
    },{
    	code: '11023',
      name: 'RICHMOND KIA',
      "address" : "5660 MINORU BLVD.",
      "city" : "RICHMOND",
      "province" : "BC",
      "postal_code" : "V6X2A9",
      org_code: 'kia'
    },{
    	code: '11003',
      name: 'APPLEWOOD KIA',
      "address" : "16299 FRASER HIGHWAY",
      "city" : "SURREY",
      "province" : "BC",
      "postal_code" : "V4N0G1",
      org_code: 'kia'
    }], (err, results) => {
      client.close();
      next();
    })   
  })
}

module.exports.down = function (next) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection('units').deleteMany({
      code: {$in : ['11005','11023','11003']}
    }, (err, results) => {
      client.close();
      next();
    })        
  })
}



