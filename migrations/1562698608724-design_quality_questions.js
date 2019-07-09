const MongoClient = require('mongodb').MongoClient; 
const url = 'mongodb://localhost:27017';
const dbName = 'coe'

module.exports.up = function (next) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection('categories').insertOne({
      code: 'design_quality',
      label : "Design Quality",
      assessment_code: 'coe2016',
      questions : [
        {
          "name" : "predominantly_white",
          "label" : "Are pages in the dealer site predominantly white?",
          "number" : 1,
          "label_french" : "Les pages du site du concessionnaire sont-elles principalement blanches?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/10/Kia-Homepage-Guidelines.pdf",
            "title" : "Homepage Guidelines"
          }
        },
        {
          "name" : "uses_approved_vehicle_images",
          "label" : "Does the dealer site use approved New Vehicle images from Kia Canada and/or photography guidelines for Certified Pre-Owned vehicles?",
          "number" : 2,
          "label_french" : "Le site du concessionnaire utilise-t-il des images de véhicules neufs approuvées de Kia Canada et/ou respecte-t-il les directives concernant les photos des véhicules d’occasion certifiés?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/09/Kia-Photography-Guidelines.pdf",
            "title" : "Photography Guidelines"
          }
        },
        {
          "name" : "banners_promotions_standards",
          "label" : "Are banners and promotions following Kia design standards avoiding the use of clipart, inappropriate fonts and effects?",
          "number" : 3,
          "label_french" : "Les bandeaux et les promotions sont-ils conformes aux normes de design de Kia et évitent-ils l’utilisation de cliparts, de polices ou d’effets inappropriés?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/10/Kia-Image-Optimization.pdf",
            "title" : "Image Optimization"
          }
        },
        {
          "name" : "images_properly_optimized",
          "label" : "Are images properly optimized to maintain a high quality (this would mean overall image quality throughout the site)?",
          "number" : 4,
          "label_french" : "Les images sont-elles optimisées correctement afin de maintenir une bonne qualité (cela signifie que la qualité des images est conservée sur l’ensemble du site)?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/10/Kia-Image-Optimization.pdf",
            "title" : "Image Optimization"
          }
        },
        {
          "name" : "images_avoid_crops",
          "label" : "Do images on the dealer site avoid crops that hide large sections of a vehicle?",
          "number" : 5,
          "label_french" : "Les images du site du concessionnaire évitent-elles les rognures qui cachent une grande partie d’un véhicule?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/09/Kia-Photography-Guidelines.pdf",
            "title" : "Photography Guidelines"
          }
        },
        {
          "name" : "images_staged_appropropriately",
          "label" : "Does the dealer site ensure used images are staged appropriately (e.i. well lit, proper angles, features of the car shown)?",
          "number" : 6,
          "label_french" : "Le site du concessionnaire veille-t-il à ce que les images des véhicules d’occasion soient prises correctement (c’est-à-dire bien éclairées, bien dirigées, montrant les caractéristiques du véhicule)?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/09/Kia-Photography-Guidelines.pdf",
            "title" : "Photography Guidelines"
          }
        },
        {
          "name" : "information_logically_organized",
          "label" : "Is information logically organized, uncluttered and prioritized on the page?",
          "number" : 7,
          "label_french" : "Les informations sont-elles organisées de façon logique, faciles à lire et priorisées sur la page?",
          "required" : true,
          "status_flag" : "",
          "layout" : "standard",
          "resources" : {
            "href" : "https://kia.dwcp.ca/wp-content/uploads/2015/10/Kia-Homepage-Guidelines.pdf",
            "title" : "Homepage Guidelines"
          }
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
      code: 'design_quality',
    }, (err, results) => {
      client.close();
      next();
    })        
  })
}



