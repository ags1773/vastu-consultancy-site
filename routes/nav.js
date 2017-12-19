var express     = require('express');
var router      = express.Router();
var Customer    = require("../models/customers");
var Archive     = require("../models/archives");
var Trash       = require("../models/trashes");
var middleware  = require('../middleware');
var dispDbEntries  = require('../public/dispDbEntries');
var moveDocs    = require('../public/docsMovePgm');

router.get("/", function(req,res){
    res.render('landing');
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
router.get('/customerdata', middleware.isLoggedIn, function(req,res){
  Customer.find({}, function(err, foundCustRecords){
    if(err){
      console.log(err);
    } else{
      res.render("customerdata", {custRecord: foundCustRecords});
    }
  });
});

router.post('/customerdata', middleware.isLoggedIn, function(req,res){
  req.body.nameSrch   = req.sanitize(req.body.nameSrch);
  req.body.dateStart  = req.sanitize(req.body.dateStart);
  req.body.dateEnd    = req.sanitize(req.body.dateEnd);
  dispDbEntries("Customer", req.body.nameSrch, req.body.dateStart, req.body.dateEnd, function(foundDocs){
    res.render("customerdata", {custRecord: foundDocs});
  });
});

router.put('/customerdata', middleware.isLoggedIn, function(req,res){
  var idsQueue = req.body.pipeline.split(",");
  var action = req.body.action;

  if(action === "archiveToCust"){
    moveDocs(idsQueue, "Archive", "Customer", function(){
      res.redirect('/customerdata/archives');
    });
  }
  if(action === "trashToCust"){
    moveDocs(idsQueue, "Trash", "Customer", function(){
      res.redirect('/customerdata/trash');
    });
  }

});

router.get('/customerdata/archives', middleware.isLoggedIn, function(req,res){
  Archive.find({}, function(err, foundArchives){
    if(err){
      console.log(err);
    } else{
      res.render("archives", {archivedRecord: foundArchives});
    }
  });
});

router.put('/customerdata/archives', middleware.isLoggedIn, function(req,res){
  var idsQueue = req.body.pipeline.split(",");
  var action = req.body.action;

  if(action === "custToArchive"){
    moveDocs(idsQueue, "Customer", "Archive", function(){
      res.redirect('/customerdata');
    });
  }
  if(action === "trashToArchive"){
    moveDocs(idsQueue, "Trash", "Archive", function(){
      res.redirect('/customerdata/trash');
    });
  }
});

router.post('/customerdata/archives', middleware.isLoggedIn, function(req,res){
  req.body.nameSrch   = req.sanitize(req.body.nameSrch);
  req.body.dateStart  = req.sanitize(req.body.dateStart);
  req.body.dateEnd    = req.sanitize(req.body.dateEnd);

  dispDbEntries("Archive", req.body.nameSrch, req.body.dateStart, req.body.dateEnd, function(foundDocs){
    res.render("archives", {archivedRecord: foundDocs});
  });
});

router.get("/customerdata/trash", middleware.isLoggedIn, function(req,res){
  Trash.find({}, function(err, foundItems){
    if(err){
      console.log(err);
    } else{
      res.render("trash", {trashRecord: foundItems});
    }
  });
});

router.post('/customerdata/trash', middleware.isLoggedIn, function(req,res){
  req.body.nameSrch   = req.sanitize(req.body.nameSrch);
  req.body.dateStart  = req.sanitize(req.body.dateStart);
  req.body.dateEnd    = req.sanitize(req.body.dateEnd);

  dispDbEntries("Trash", req.body.nameSrch, req.body.dateStart, req.body.dateEnd, function(foundDocs){
    res.render("trash", {trashRecord: foundDocs});
  });
});

router.put('/customerdata/trash', middleware.isLoggedIn, function(req,res){
  var idsQueue = req.body.pipeline.split(",");
  var action = req.body.action;

  if(action === "archiveToTrash"){
    moveDocs(idsQueue, "Archive", "Trash", function(){
      res.redirect('/customerdata/archives');
    });
  }
  if(action === "custToTrash"){
    moveDocs(idsQueue, "Customer", "Trash", function(){
      res.redirect('/customerdata');
    });
  }
  if(action === "deleteForever"){
    Trash.remove({_id: {$in: idsQueue}}, function(err){
      if(err){
        console.log(err);
      } else{
        console.log("Selected records deleted!");
        //Find next 20 records and render them..
        //Temperorily redirecting to /customerdata
        res.redirect('/customerdata/trash');
      }
    });
  }
});

module.exports = router;
