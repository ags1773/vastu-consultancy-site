var express = require('express');
var router = express.Router();
var Customer = require("../models/customers");
var Archive = require("../models/archives");
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
  req.body.nameSrch   = req.sanitize(req.body.nameSrch);
  req.body.dateStart  = req.sanitize(req.body.dateStart);
  req.body.dateEnd    = req.sanitize(req.body.dateEnd);
  var nameSrch = " ";
  var startDate = "000000000000000000000000";
  var endDate   = "ffffffffffffffffffffffff";
  if(req.body.nameSrch){
    nameSrch = req.body.nameSrch;
  }
  if(req.body.dateStart){
    var unixStartDate = Date.parse(req.body.dateStart.toString());
    startDate = (Math.floor(unixStartDate/1000)).toString(16) + "0000000000000000";
  }
  if(req.body.dateEnd){
    var unixEndDate = Date.parse(req.body.dateEnd.toString());
    endDate = (Math.floor(unixEndDate/1000) + 86399).toString(16) + "0000000000000000";
    //23 hrs 59 min 59 sec = 86399 sec. It will ensure to get even the last entry for the day
  }
  console.log("name Search --> " + nameSrch);
  console.log("start--> " + startDate);
  console.log("end--> " + endDate);
  // Customer.find(
  //   {
  //     "_id" : {$gte : startDate, $lte : endDate},
  //     $text: { $search: nameSrch }                                           //fast but NOT thorough search. Searching 'tom' will NOT show 'tommy' .Uses index ('name' field needs to be indexed first)
  //   },
  //   function(err,foundCustRecords){
  //     res.render("customerdata", {custRecord: foundCustRecords});
  //   }
  // );
  Customer.find(
    {
      _id : {$gte : startDate, $lte : endDate},
      name: {$regex : new RegExp(nameSrch, "i")}                                //slow but thorough search (does not use index). Searching 'tom' WILL show 'tommy' .Case insensitive, searches all characters under 'name'
    },
    function(err,foundCustRecords){
      res.render("customerdata", {custRecord: foundCustRecords});
    }
  );
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
router.delete('/customerdata', middleware.isLoggedIn, function(req,res){
  var deleteQueue = req.body.pipeline.split(",");
  console.log("Hit Delete Route...");
  console.log(deleteQueue);

  Customer.remove({_id: {$in: deleteQueue}}, function(err){
    if(err){
      console.log(err);
    } else{
      console.log("Selected records deleted!");
      //Find next 20 records and render them..
      //Temperorily redirecting to /customerdata
      res.redirect('/customerdata');
    }
  });
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
router.post('/customerdata/archives', middleware.isLoggedIn, function(req,res){
  var archiveQueue = req.body.pipeline.split(",");
  Customer.find({_id: {$in: archiveQueue}}, function(err, foundDocs){
    if(err){
      console.log(err);
    } else{
      console.log("Found " + foundDocs.length + " Docs..");
      Archive.insertMany(foundDocs, function(err, insertedDocs){
        if(err){
          console.log(err);
        } else{
          console.log(insertedDocs.length + " Documents inserted into collection 'Archives'");
          Customer.deleteMany({_id: {$in: insertedDocs}}, function(err, deletedDocs){
            if(err){
              console.log(err);
            } else{
              console.log(deletedDocs.result.n + " Documents deleted from collection 'Customers'");
              res.redirect('/customerdata');
            }
          });
        }
      });
    }
  });
});

module.exports = router;
