var mongoose = require("mongoose");
var Customer = require("./models/customers");
var seedData = [
      {
        name:   "John Doe",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "Ron Swanson",
        phone:  "785463887",
        email:  "ron@yahoo.com"
      },
      {
        name:   "hkyuj",
        phone:  "42324",
        email:  "dfgdfg"
      },
      {
        name:   "Credance Smiths",
        phone:  "9344026587",
        email:  "smelly_fish@gmail.com"
      },
      {
        name:   "Reese Kneeling",
        phone:  "7859326837",
        email:  "ree@hotmail.com"
      },
      {
        name:   "Greg Thomas",
        phone:  "3640126587",
        email:  "greg.tt@gmail.com"
      },
      {
        name:   "Will Turner",
        phone:  "2547841026",
        email:  "will@aol.com"
      },
      {
        name:   "tyhtrfgh",
        phone:  "356354",
        email:  "fgbhdf"
      },
      {
        name:   "Johnny Cash",
        phone:  "5345345326",
        email:  "johnny@aol.com"
      },
      {
        name:   "Simon Fouler",
        phone:  "5654645",
        email:  "dxcsdfv@hotmail.com"
      },
      {
        name:   "asdfds",
        phone:  "78457424",
        email:  "zsdgdrg"
      },
      {
        name:   "Nate Dogg",
        phone:  "84564",
        email:  "hkyhdtf"
      },
      {
        name:   "Shadtree Surgeon",
        phone:  "59684645",
        email:  "dfgsfv78"
      },
      {
        name:   "Kala Khatta",
        phone:  "684651",
        email:  "dfgs35"
      },
      {
        name:   "hjkuyhjyfh",
        phone:  "785785",
        email:  "gfsvsdf545"
      }
    ];

var seedData1 = [
      {
        name:   "one last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        email:  "john@gmail.com"
      },
      {
        name:   "six last",
        phone:  "785785",
        email:  "gfsvsdf545"
      }
    ];

function seedDB(){
  for(var i=0; i<seedData1.length; i++){
      Customer.create(seedData1[i], function(err,createdCust){
          if(err){
            console.log(err);
          } else{
            console.log('record added from seeds file...');
            createdCust.save(function(err){
              if(err){
                console.log(err);
              }
            });
          }
      });
  }
}

module.exports = seedDB;
