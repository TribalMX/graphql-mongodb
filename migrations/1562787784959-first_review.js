const MongoClient = require('mongodb').MongoClient; 
const url = 'mongodb://localhost:27017';
const dbName = 'coe'

module.exports.up = function (next) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection('reviews').insertOne({
      period_label: 'November 2018',
      unit_code: '11005',
      category_code: 'user_experience',
      answers: [
        {
          question_name: "labeling_menu_items",
          answer: 0,
          comments: "There are many inconsistencies with the Centre of Excellence Naming Requirements standard on your web site. Please refer to this standard so that you can make the appropriate enhancements.\r\n",
        },
        {
          question_name : "main_drop_down_navigation",
          answer : 2,
          comments : "",
        },
        {
          question_name : "dealership_name_and_mailing_address",
          answer : 2,
          comments : "",
        },
        {
          question_name : "detailed_contact_information",
          answer : 1,
          comments : "There is detailed contact information for Sales, Service, and Parts & Accessories — however not all present on the Contact Us page specifically email addresses for Service and Parts departments. Please consider including all contact details in this page for ease of access for your customers.\r\n",
        },
        {
          question_name : "include_sections",
          answer : 0,
          comments : "You do not have Certified Pre-Owned inventory or Shopping Tools sections on your website. Please add these sections to your website as per the Centre of Excellence standard.\r\n\r\nWhile you have all of these sections, the Showroom is incorrectly in the New Vehicle section. Please create a stand-alone section for Showroom as per the Centre of Excellence standard.\r\n\r\n\r\n\r\n",
        },
        {
          question_name : "include_link_to_kia",
          answer : 0,
          comments : "We could not locate a link to kia.ca. At a minimum, please include a link to kia.ca within the \"tiger nose\" Kia footer logo in a new window.\r\n",
        },
        {
          question_name : "exclude_links_to_other_manufacturers",
          answer : 2,
          comments : "",
        },
        {
          question_name : "support_promotional_sales",
          answer : 2,
          comments : "",
        },
        {
          question_name : "distinction_between_used_cars",
          answer : 1,
          comments : "The following vehicles should not be included in your Showroom:\r\n • K900\r\n\r\n",
        },
        {
          question_name : "search_for_certified_preowned",
          answer : 0,
          comments : "Your website does not allow for certified pre-owned cars to be filtered and specifically selected as part of your inventory search. Please add certified pre-owned in your search filtering.",
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
    db.collection('reviews').deleteOne({
      period_label: 'November 2018',
      unit_code: '11005',
      category_code: 'user_experience'
    }, (err, results) => {
      client.close();
      next();
    })        
  })
}



