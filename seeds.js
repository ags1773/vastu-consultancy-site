var mongoose = require("mongoose");
var Customer = require("./models/customers");
var dummyDate = new Date(0);
var seedData = [
      {
        name:   "John Doe",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "Ron Swanson",
        phone:  "785463887",
        expiryCtr: dummyDate,
        email:  "ron@yahoo.com"
      },
      {
        name:   "Credance Smiths",
        phone:  "9344026587",
        expiryCtr: dummyDate,
        email:  "smelly_fish@gmail.com"
      },
      {
        name:   "Reese Kneeling",
        phone:  "7859326837",
        expiryCtr: dummyDate,
        email:  "ree@hotmail.com"
      },
      {
        name:   "Greg Thomas",
        phone:  "3640126587",
        expiryCtr: dummyDate,
        email:  "greg.tt@gmail.com"
      },
      {
        name:   "Will Turner",
        phone:  "2547841026",
        expiryCtr: dummyDate,
        email:  "will@aol.com"
      },
      {
        name:   "Johnny Cash",
        phone:  "5345345326",
        expiryCtr: dummyDate,
        email:  "johnny@aol.com"
      },
      {
        name:   "Simon Fouler",
        phone:  "5654645",
        expiryCtr: dummyDate,
        email:  "dxcsdfv@hotmail.com"
      },
      {
        name:   "Nate Dogg",
        phone:  "84564",
        expiryCtr: dummyDate,
        email:  "hkyhdtf"
      },
      {
        name:   "Shadtree Surgeon",
        phone:  "59684645",
        expiryCtr: dummyDate,
        email:  "dfgsfv78"
      },
      {
        name:   "Kala Khatta",
        phone:  "684651",
        expiryCtr: dummyDate,
        email:  "dfgs35"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "one last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "two last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "three last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "four last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "five last",
        phone:  "7854026587",
        expiryCtr: dummyDate,
        email:  "john@gmail.com"
      },
      {
        name:   "six last",
        phone:  "785785",
        expiryCtr: dummyDate,
        email:  "gfsvsdf545"
      }
    ];

function seedDB(){
  for(var i=0; i<seedData.length; i++){
      Customer.create(seedData[i], function(err,createdCust){
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
