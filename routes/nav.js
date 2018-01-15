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
  let validationErr = false;
  req.body.fname = req.sanitize(req.body.fname);
  req.body.lname = req.sanitize(req.body.lname);
  req.body.phone = req.sanitize(req.body.phone);
  req.body.email = req.sanitize(req.body.email);

  let capsFirstLtr = function(str){
    if(typeof str != undefined && str){
      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    } else{
      return "";
    }
  };

  if(req.body.fname && typeof req.body.fname != undefined){
    (RegExp("^[a-zA-Z\']{1,35} ?(([a-zA-Z\']{1,35} ?){0,2})?$").test(req.body.fname))?(validationErr = false):(validationErr = true);
  } else{
    validationErr = true;
  }
  if(req.body.lname && typeof req.body.lname != undefined){
    (RegExp("^[a-zA-Z\']{1,35} ?(([a-zA-Z\']{1,35} ?){0,2})?$").test(req.body.lname))?(validationErr = false):(validationErr = true);
  } else{
    validationErr = false;
  }
  if(req.body.phone && typeof req.body.phone != undefined){
    (RegExp("^(\\+?[0-9]+[ -]{0,3})?(([0-9]{2,4}[ -]{0,3})*)?[0-9]+$").test(req.body.phone))?(validationErr = false):(validationErr = true);
  } else{
    validationErr = true;
  }
  if(req.body.email && typeof req.body.email != undefined){
    (RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$").test(req.body.email))?(validationErr = false):(validationErr = true);
  } else{
    validationErr = false;
  }

  console.log("validationErr " + validationErr);
  // if(validationErr){
  //   req.flash('error', 'Please enter valid data.');
  //   res.redirect("/contact-us");
  // } else{
  //   let newCustomer = ({
  //     name: capsFirstLtr(req.body.fname) + " " + capsFirstLtr(req.body.lname),
  //     phone: req.body.phone,
  //     expiryCtr: new Date(0),
  //     email: req.body.email
  //   });
  //   Customer.create(newCustomer, function(err,customer){
  //     if(err){
  //       console.log("Error adding customer to DB");
  //       console.log(err);
  //     } else{
  //       req.flash("success", "Details submitted successfully!");
  //       res.redirect("/contact-us");
  //     }
  //   });
  // }

  // (RegExp("^[a-zA-Z\']{1,35} ?(([a-zA-Z\']{1,35} ?){0,2})?$").test(req.body.fname))?(validationErr = false):(validationErr = true);
  // if(req.body.lname){
  //   (RegExp("^[a-zA-Z\']{1,35} ?(([a-zA-Z\']{1,35} ?){0,2})?$").test(req.body.lname))?(validationErr = false):(validationErr = true);
  // } else{
  //   validationErr = false;
  // }
  // (RegExp("^(\\+?[0-9]+[ -]{0,3})?(([0-9]{2,4}[ -]{0,3})*)?[0-9]+$").test(req.body.phone))?(validationErr = false):(validationErr = true);
  // if(req.body.email){
  //   (RegExp("^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$").test(req.body.email))?(validationErr = false):(validationErr = true);
  // } else{
  //   validationErr = false;
  // }

  // let capsFirstLtr = function(str){
  //   if(typeof str != undefined && str){
  //     return str[0].toUpperCase() + str.slice(1).toLowerCase();
  //   } else{
  //     return "";
  //   }
  // }
  // var newCustomer = ({
  //   name: capsFirstLtr(req.sanitize(req.body.fname)) + " " + capsFirstLtr(req.sanitize(req.body.lname)),
  //   phone: req.sanitize(req.body.phone),
  //   expiryCtr: new Date(0),
  //   email: req.sanitize(req.body.email)
  // });
  // Customer.create(newCustomer, function(err,customer){
  //   if(err){
  //     console.log("Error adding customer to DB");
  //     console.log(err);
  //   } else{
  //     req.flash("success", "Details submitted successfully!");
  //     res.redirect("/contact-us");
  //   }
  // });
});

module.exports = router;
