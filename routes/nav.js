var express = require('express');
var router = express.Router();
var Customer = require("../models/customers");
var middleware = require('../middleware');

router.get("/", function(req,res){
    res.render('landing');
});

router.get("/contact-us", function(req,res){
    res.render("contactus");
});
router.post("/contact-us", function(req,res){
  var newCustomer = ({
    fname: req.sanitize(req.body.fname),
    lname: req.sanitize(req.body.lname),
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
  })
});
router.get('/customerdata', middleware.isLoggedIn, function(req,res){
  res.render("customerdata");
});

module.exports = router;
