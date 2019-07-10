const MongoClient = require('mongodb').MongoClient; 
const url = 'mongodb://localhost:27017';
const dbName = 'coe'

module.exports.up = function (next) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection('insight_types').insertOne({
      type: 'average',
      category_code: 'user_experience',
      maximum_weight: 1,
      weights : [
        {
          question_name: "labeling_menu_items",
          weight: 0.1
        },
        {
          question_name : "main_drop_down_navigation",
          weight: 0.1
        },
        {
          question_name : "dealership_name_and_mailing_address",
          weight: 0.1
        },
        {
          question_name : "detailed_contact_information",
          weight: 0.1
        },
        {
          question_name : "include_sections",
          weight: 0.1
        },
        {
          question_name : "include_link_to_kia",
          weight: 0.1
        },
        {
          question_name : "exclude_links_to_other_manufacturers",
          weight: 0.1
        },
        {
          question_name : "support_promotional_sales",
          weight: 0.1
        },
        {
          question_name : "distinction_between_used_cars",
          weight: 0.1
        },
        {
          question_name : "search_for_certified_preowned",
          weight: 0.1
        }
      ]
    }, (err, results) => {
      client.close();
      next();
    })   
  })
}

module.exports.down = function (next) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection('insight_types').deleteOne({
      type: 'average',
      category_code: 'user_experience'
    }, (err, results) => {
      client.close();
      next();
    })        
  })
}



