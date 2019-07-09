const MongoClient = require('mongodb').MongoClient; 
const url = 'mongodb://localhost:27017';
const dbName = 'coe'

module.exports.up = function (next) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection('assessments').insertOne({
      code: 'coe2016',
      title: 'COE Assessment from 2016',
      date: new Date('07/07/2016'),
      categories: ['user_experience','design_quality','brand_consistency_visual'],
      orgCode: 'blvd'
    }, (err, results) => {
      client.close();
      next();
    })   
  })
}

module.exports.down = function (next) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection('assessments').deleteOne({
      code: 'coe2016'
    }, (err, results) => {
      client.close();
      next();
    })        
  })
}



