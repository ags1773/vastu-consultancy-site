var express       = require("express"),
    router        = express.Router(),
    Customer      = require("../models/customers"),
    Trash         = require("../models/trashes"),
    middleware    = require("../middleware"),
    dispDbEntries = require("../public/dispDbEntries"),
    moveDocs      = require("../public/docsMovePgm");

router.get("/", function(req,res){
    res.render("landing");
});

router.get("/contact-us", function(req,res){
    res.render("contactus");
});

router.post("/contact-us", function(req,res){
  let capsFirstLtr = function(str){
    if(typeof str != undefined && str){
      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    } else{
      return "";
    }
  }
  var newCustomer = ({
    name: capsFirstLtr(req.sanitize(req.body.fname)) + " " + capsFirstLtr(req.sanitize(req.body.lname)),
    phone: req.sanitize(req.body.phone),
    expiryCtr: new Date(0),
    email: req.sanitize(req.body.email)
  });
  Customer.create(newCustomer, function(err,customer){
    if(err){
      console.log("Error adding customer to DB");
      console.log(err);
    } else{
      req.flash("success", "Details submitted successfully!");
      res.redirect("/contact-us");
    }
  });
});

module.exports = router;
