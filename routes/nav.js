var express = require('express');
var router = express.Router();
var Customer = require("../models/customers");
var middleware = require('../middleware');

router.get("/", function(req,res){
    res.render('landing');
});

router.get("/temp", function(req,res){
    res.render('temp');
});

router.get("/contact-us", function(req,res){
    res.render("contactus");
});
router.post("/contact-us", function(req,res){
  var newCustomer = ({
    name: capsFirstLtr(req.sanitize(req.body.fname)) + " " + capsFirstLtr(req.sanitize(req.body.lname)),
    phone: req.sanitize(req.body.phone),
    email: req.sanitize(req.body.email)
  });
  Customer.create(newCustomer, function(err,customer){
    if(err){
      console.log("Error adding customer to DB");
      console.log(err);
    } else{
      res.render("formsubmit");
    }
  });
  function capsFirstLtr(str){
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }
});
router.post('/customerdata', middleware.isLoggedIn, function(req,res){
  req.body.dateStart = req.sanitize(req.body.dateStart);
  req.body.dateEnd = req.sanitize(req.body.dateEnd);
  var startDate = "000000000000000000000000";
  var endDate   = "ffffffffffffffffffffffff";
  if(req.body.dateStart){
    var unixStartDate = Date.parse(req.body.dateStart.toString());
    startDate = (Math.floor(unixStartDate/1000)).toString(16) + "0000000000000000";
  }
  if(req.body.dateEnd){
    var unixEndDate = Date.parse(req.body.dateEnd.toString());
    endDate = (Math.floor(unixEndDate/1000) + 86399).toString(16) + "0000000000000000";
    //23 hrs 59 min 59 sec = 86399 sec. It will ensure to get even the last entry for the day
  }
  console.log("start--> " + startDate);
  console.log("end--> " + endDate);
  Customer.find({"_id" : {$gte : startDate, $lte : endDate}}, function(err,foundC){
    res.render("customerdata", {custRecord: foundC});
  });
});
router.get('/customerdata', middleware.isLoggedIn, function(req,res){
  Customer.find({}, function(err, foundCustRecords){
    if(err){
      console.log(err);
    } else{
      res.render("customerdata", {custRecord: foundCustRecords});
    }
  });
});

module.exports = router;
