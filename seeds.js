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
