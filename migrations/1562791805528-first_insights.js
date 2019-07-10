const MongoClient = require('mongodb').MongoClient; 
const url = 'mongodb://localhost:27017';
const dbName = 'coe'

module.exports.up = function (next) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection('insights').insertOne({
      period_label: 'November 2018',
      unit_code: '11005',
      category_code: 'user_experience',
      insight_type: 'average',
      total_score: 1,
      scores: [
        {
          question_name: "labeling_menu_items",
          score: 0
        },
        {
          question_name : "main_drop_down_navigation",
          answer : 0.2
        },
        {
          question_name : "dealership_name_and_mailing_address",
          answer : 0.2
        },
        {
          question_name : "detailed_contact_information",
          answer : 0.1
        },
        {
          question_name : "include_sections",
          answer : 0
        },
        {
          question_name : "include_link_to_kia",
          answer : 0
        },
        {
          question_name : "exclude_links_to_other_manufacturers",
          answer : 0.2
        },
        {
          question_name : "support_promotional_sales",
          answer : 0.2
        },
        {
          question_name : "distinction_between_used_cars",
          answer : 0.1
        },
        {
          question_name : "search_for_certified_preowned",
          answer : 0
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
    db.collection('insights').deleteOne({
      period_label: 'November 2018',
      unit_code: '11005',
      category_code: 'user_experience',
      insight_type: 'average'
    }, (err, results) => {
      client.close();
      next();
    })        
  })
}



