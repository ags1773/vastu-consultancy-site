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
  let errCtr=0;
  let capsFirstLtr = function(str){
    if(typeof str != undefined && str){
      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    } else{
      return "";
    }
  };
  req.body.fname = req.sanitize(req.body.fname);
  req.body.lname = req.sanitize(req.body.lname);
  req.body.phone = req.sanitize(req.body.phone);
  req.body.email = req.sanitize(req.body.email);
  if(req.body.fname && typeof req.body.fname != undefined){
    if(!RegExp("^[a-zA-Z\']{1,35} ?(([a-zA-Z\']{1,35} ?){0,2})?$").test(req.body.fname)){
      errCtr++;
    }
  } else{
    errCtr++;
  }
  if(req.body.lname && typeof req.body.lname != undefined){
    if(!RegExp("^[a-zA-Z\']{1,35} ?(([a-zA-Z\']{1,35} ?){0,2})?$").test(req.body.lname)){
      errCtr++;
    }
  }
  if(req.body.phone && typeof req.body.phone != undefined){
    if(!RegExp("^(\\+?[0-9]+[ -]{0,3})?(([0-9]{2,4}[ -]{0,3})*)?[0-9]+$").test(req.body.phone)){
      errCtr++;
    }
  } else{
    errCtr++;
  }
  if(req.body.email && typeof req.body.email != undefined){
    if(!RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$").test(req.body.email)){
      errCtr++;
    }
  }
  if(errCtr>0){
    req.flash('error', 'Please enter valid data.');
    res.redirect("/contact-us");
  } else{
    let newCustomer = ({
      name: capsFirstLtr(req.body.fname) + " " + capsFirstLtr(req.body.lname),
      phone: req.body.phone,
      expiryCtr: new Date(0),
      email: req.body.email
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
  }

});

module.exports = router;
