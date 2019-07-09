const MongoClient = require('mongodb').MongoClient; 
const url = 'mongodb://localhost:27017';
const dbName = 'coe'

module.exports.up = function (next) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection('categories').insertOne({
      code: 'user_experience',
      label: 'User Experience',
      assessment_code: 'coe2016',
      questions : [
        {
          "name" : "labeling_menu_items",
          "label" : "Are best practices for labeling menu items, including the correct language & terminology being followed for both English and French (where applicable)?",
          "number" : 1,
          "label_french" : "Les meilleures pratiques d’étiquetage des articles de menu, incluant la langue et la terminologie correctes, sont-elles suivies en anglais et en français (le cas échéant)?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/10/Kia-Naming-Requirements.pdf",
            "title" : "Naming Requirements"
          }
        },
        {
          "name" : "main_drop_down_navigation",
          "label" : "Does the main drop down navigation consist of 5-7 items and using a white or black background?",
          "number" : 2,
          "label_french" : "Le menu déroulant principal de navigation est-il composé de 5 à 7 articles, avec un fond blanc ou noir?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/10/Kia-Naming-Requirements.pdf",
            "title" : "Naming Requirements"
          }
        },
        {
          "name" : "dealership_name_and_mailing_address",
          "label" : "Is the dealership name and mailing address (incl. link to Google Maps) in the top-right header? Is it in alignment with the Kia logo?",
          "number" : 3,
          "label_french" : "Le nom et l’adresse postale de la concession (incluant le lien vers Google Maps) se trouvent-ils en haut à droite de l’en-tête? Sont-ils alignés avec le logo Kia?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/10/Kia-Header-Requirements.pdf",
            "title" : "Website Header Requirements"
          }
        },
        {
          "name" : "detailed_contact_information",
          "label" : "Is detailed contact information displayed on the Contact Us page, including: email addresses, phone numbers and hours of operation for Sales, Service and Parts & Accessories?",
          "number" : 4,
          "label_french" : "Les coordonnées détaillées s’affichent-elles sur la page « Nous joindre », incluant les adresses courriel, les numéros de téléphone et les heures d’ouverture, pour les départements des ventes, du service, des pièces et des accessoires?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/10/Kia-Naming-Requirements.pdf",
            "title" : "Naming Requirements"
          }
        },
        {
          "name" : "include_sections",
          "label" : "Does the dealer site include sections for new vehicle overview, certified pre-owned inventory, used vehicle inventory, and shopping tools?",
          "number" : 5,
          "label_french" : "Le site du concessionnaire inclut-il des sections pour la description des véhicules neufs, les stocks de véhicules d’occasion certifiés, les stocks de véhicules d’occasion et les outils de magasinage?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/10/Kia-Naming-Requirements.pdf",
            "title" : "Naming Requirements"
          }
        },
        {
          "name" : "include_link_to_kia",
          "label" : "Does the site include a link to \"kia.ca\" and/or links to other Kia affiliated sites and pages appropriately?",
          "number" : 6,
          "label_french" : "Le site inclut-il de façon appropriée un lien vers « kia.ca » et/ou des liens vers d’autres sites et pages affiliés à Kia?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/10/Kia-Linking-Guidelines.pdf",
            "title" : "Linking Guidelines"
          }
        },
        {
          "name" : "exclude_links_to_other_manufacturers",
          "label" : "Does the site exclude links to other automotive manufacturers?",
          "number" : 7,
          "label_french" : "Le site exclut-il les liens vers les sites d’autres constructeurs automobiles?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/10/Kia-Linking-Guidelines.pdf",
            "title" : "Linking Guidelines"
          }
        },
        {
          "name" : "support_promotional_sales",
          "label" : "Does the dealer site support promotional sales offers either (using iframe or new window to Kia.ca) or directly supported on the dealer site?",
          "number" : 8,
          "label_french" : "Le site du concessionnaire indique-t-il les offres promotionnelles (par le biais d’une photo ou d’une nouvelle fenêtre reliée à kia.ca) ou directement sur le site du concessionnaire?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/10/Kia-Linking-Guidelines.pdf",
            "title" : "Linking Guidelines"
          }
        },
        {
          "name" : "distinction_between_used_cars",
          "label" : "Is there a distinction between used cars versus certified pre-owned inventory?",
          "number" : 9,
          "label_french" : "La différence entre le stock de véhicules d’occasion et le stock de véhicules d’occasion certifiés est-elle claire?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : [ ]
        },
        {
          "name" : "search_for_certified_preowned",
          "label" : "Does the search criteria allow for certified pre-owned cars to be selected?",
          "number" : 10,
          "label_french" : "Les critères de recherche permettent-ils de sélectionner les véhicules d’occasion certifiés?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : [ ]
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
    db.collection('categories').deleteOne({
      code: 'user_experience',
    }, (err, results) => {
      client.close();
      next();
    })        
  })
}



