var express       = require('express'),
    router        = express.Router(),
    Customer      = require('../models/customers'),
    Archive       = require('../models/archives'),
    Trash         = require('../models/trashes'),
    middleware    = require('../middleware'),
    dispDbEntries = require('../public/dispDbEntries'),
    moveDocs      = require('../public/docsMovePgm');

//recordsPerPage value can be set
var recordsPerPage = 10;
var skipCounter = 0;
var tempArray = [];
var tempObj = {};
var clearObject = function(obj){
  Object.keys(obj).forEach(function(key){
    delete obj[key];
  })
};

router.get("/", function(req,res){
    res.render('landing');
});

router.get("/contact-us", function(req,res){
    res.render("contactus");
});

router.post("/contact-us", function(req,res){
  let capsFirstLtr = function(str){
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }
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
      req.flash('success', 'Details submitted successfully!');
      res.redirect("/contact-us");
    }
  });
});
router.get('/customerdata', middleware.isLoggedIn, function(req,res){
  tempArray.length = 0;
  skipCounter = 0;
  tempArray[0] = tempArray[1] = tempArray[2] = undefined;
  clearObject(tempObj);
  tempObj = {
    collection: "Customer",
    recordsPerPage: recordsPerPage,
    skipCounter: skipCounter,
    filters: {
      srchName: tempArray[0],
      startDt: tempArray[1],
      endDt: tempArray[2]
    }
  };
  dispDbEntries(tempObj, function(k){
    res.render("customerdata",
      {
        foundDocs: k.foundDocs,
        currentPg: k.currentPg,
        disp: k.disp,
        pgCount: k.pgCount,
        filterArray: tempArray
      });
  });
});

router.post('/customerdata', middleware.isLoggedIn, function(req,res){
  tempArray.length = 0;
  let pipelineData = [];
    if(req.body.action === "1"){
      //POST request from filterbar
      pipelineData[0] = "0";
      tempArray[0] = req.sanitize(req.body.nameSrch);
      tempArray[1] = req.sanitize(req.body.dateStart);
      tempArray[2] = req.sanitize(req.body.dateEnd);
    } else if(req.body.action === "2"){
      //POST request from pagination menu and from clearing filters
      pipelineData = req.body.pipeline.split(",");
      tempArray[0] = tempArray[1] = tempArray[2] = undefined;
      if(pipelineData[2]){
        tempArray[0] = req.sanitize(pipelineData[2]);
      }
      if(pipelineData[3]){
        tempArray[1] = req.sanitize(pipelineData[3]);
      }
      if(pipelineData[4]){
        tempArray[2] = req.sanitize(pipelineData[4]);
      }
    }
    //go to first page
    if(pipelineData[0] === "0"){
      skipCounter = 0;
    }
    //go to last page
    else if(pipelineData[0] === "Z"){
      skipCounter = (Number(pipelineData[1]) - 1) * recordsPerPage;
    }
    //go to chosen page
    else{
      skipCounter = (Number(pipelineData[0]) - 1) * recordsPerPage;
    }
    console.log(skipCounter + " Records skipped");
    clearObject(tempObj);
    tempObj = {
      collection: "Customer",
      recordsPerPage: recordsPerPage,
      skipCounter: skipCounter,
      filters: {
        srchName: tempArray[0],
        startDt: tempArray[1],
        endDt: tempArray[2]
      }
    };
    dispDbEntries(tempObj, function(k){
      res.render("customerdata",
        {
          foundDocs: k.foundDocs,
          currentPg: k.currentPg,
          disp: k.disp,
          pgCount: k.pgCount,
          filterArray: tempArray
        });
    });
});

router.put('/customerdata', middleware.isLoggedIn, function(req,res){
  var idsQueue = req.body.pipeline.split(",");
  var action = req.body.action;

  if(action === "archiveToCust"){
    clearObject(tempObj);
    tempObj = {
      idsQueue: idsQueue,
      sourceCollection: "Archive",
      destCollection: "Customer"
    };
    moveDocs(tempObj, function(){
      res.redirect('/customerdata/archives');
    });
  }
  if(action === "trashToCust"){
    clearObject(tempObj);
    tempObj = {
      idsQueue: idsQueue,
      sourceCollection: "Trash",
      destCollection: "Customer"
    };
    moveDocs(tempObj, function(){
      res.redirect('/customerdata/trash');
    });
  }

});

router.get('/customerdata/archives', middleware.isLoggedIn, function(req,res){
  tempArray.length = 0;
  skipCounter = 0;
  tempArray[0] = tempArray[1] = tempArray[2] = undefined;
  clearObject(tempObj);
  tempObj = {
    collection: "Archive",
    recordsPerPage: recordsPerPage,
    skipCounter: skipCounter,
    filters: {
      srchName: tempArray[0],
      startDt: tempArray[1],
      endDt: tempArray[2]
    }
  };
  dispDbEntries(tempObj, function(k){
    res.render("archives",
      {
        foundDocs: k.foundDocs,
        currentPg: k.currentPg,
        disp: k.disp,
        pgCount: k.pgCount,
        filterArray: tempArray
      });
  });
});

router.post('/customerdata/archives', middleware.isLoggedIn, function(req,res){
  tempArray.length = 0;
  let pipelineData = [];
    if(req.body.action === "1"){
      //POST request from filterbar
      pipelineData[0] = "0";
      tempArray[0] = req.sanitize(req.body.nameSrch);
      tempArray[1] = req.sanitize(req.body.dateStart);
      tempArray[2] = req.sanitize(req.body.dateEnd);
    } else if(req.body.action === "2"){
      //POST request from pagination menu and from clearing filters
      pipelineData = req.body.pipeline.split(",");
      tempArray[0] = tempArray[1] = tempArray[2] = undefined;
      if(pipelineData[2]){
        tempArray[0] = req.sanitize(pipelineData[2]);
      }
      if(pipelineData[3]){
        tempArray[1] = req.sanitize(pipelineData[3]);
      }
      if(pipelineData[4]){
        tempArray[2] = req.sanitize(pipelineData[4]);
      }
    }
    //go to first page
    if(pipelineData[0] === "0"){
      skipCounter = 0;
    }
    //go to last page
    else if(pipelineData[0] === "Z"){
      skipCounter = (Number(pipelineData[1]) - 1) * recordsPerPage;
    }
    //go to chosen page
    else{
      skipCounter = (Number(pipelineData[0]) - 1) * recordsPerPage;
    }
    console.log(skipCounter + " Records skipped");
    clearObject(tempObj);
    tempObj = {
      collection: "Archive",
      recordsPerPage: recordsPerPage,
      skipCounter: skipCounter,
      filters: {
        srchName: tempArray[0],
        startDt: tempArray[1],
        endDt: tempArray[2]
      }
    };
    dispDbEntries(tempObj, function(k){
      res.render("archives",
        {
          foundDocs: k.foundDocs,
          currentPg: k.currentPg,
          disp: k.disp,
          pgCount: k.pgCount,
          filterArray: tempArray
        });
    });
});

router.put('/customerdata/archives', middleware.isLoggedIn, function(req,res){
  var idsQueue = req.body.pipeline.split(",");
  var action = req.body.action;

  if(action === "custToArchive"){
    clearObject(tempObj);
    tempObj = {
      idsQueue: idsQueue,
      sourceCollection: "Customer",
      destCollection: "Archive"
    };
    moveDocs(tempObj, function(){
      res.redirect('/customerdata');
    });
  }
  if(action === "trashToArchive"){
    clearObject(tempObj);
    tempObj = {
      idsQueue: idsQueue,
      sourceCollection: "Trash",
      destCollection: "Archive"
    };
    moveDocs(tempObj, function(){
      res.redirect('/customerdata/trash');
    });
  }
});

router.get("/customerdata/trash", middleware.isLoggedIn, function(req,res){
  tempArray.length = 0;
  skipCounter = 0;
  tempArray[0] = tempArray[1] = tempArray[2] = undefined;
  clearObject(tempObj);
  tempObj = {
    collection: "Trash",
    recordsPerPage: recordsPerPage,
    skipCounter: skipCounter,
    filters: {
      srchName: tempArray[0],
      startDt: tempArray[1],
      endDt: tempArray[2]
    }
  };
  dispDbEntries(tempObj, function(k){
    res.render("trash",
      {
        foundDocs: k.foundDocs,
        currentPg: k.currentPg,
        disp: k.disp,
        pgCount: k.pgCount,
        filterArray: tempArray
      });
  });
});

router.post('/customerdata/trash', middleware.isLoggedIn, function(req,res){
  tempArray.length = 0;
  let pipelineData = [];
    if(req.body.action === "1"){
      //POST request from filterbar
      pipelineData[0] = "0";
      tempArray[0] = req.sanitize(req.body.nameSrch);
      tempArray[1] = req.sanitize(req.body.dateStart);
      tempArray[2] = req.sanitize(req.body.dateEnd);
    } else if(req.body.action === "2"){
      //POST request from pagination menu and from clearing filters
      pipelineData = req.body.pipeline.split(",");
      tempArray[0] = tempArray[1] = tempArray[2] = undefined;
      if(pipelineData[2]){
        tempArray[0] = req.sanitize(pipelineData[2]);
      }
      if(pipelineData[3]){
        tempArray[1] = req.sanitize(pipelineData[3]);
      }
      if(pipelineData[4]){
        tempArray[2] = req.sanitize(pipelineData[4]);
      }
    }
    //go to first page
    if(pipelineData[0] === "0"){
      skipCounter = 0;
    }
    //go to last page
    else if(pipelineData[0] === "Z"){
      skipCounter = (Number(pipelineData[1]) - 1) * recordsPerPage;
    }
    //go to chosen page
    else{
      skipCounter = (Number(pipelineData[0]) - 1) * recordsPerPage;
    }
    console.log(skipCounter + " Records skipped");
    clearObject(tempObj);
    tempObj = {
      collection: "Trash",
      recordsPerPage: recordsPerPage,
      skipCounter: skipCounter,
      filters: {
        srchName: tempArray[0],
        startDt: tempArray[1],
        endDt: tempArray[2]
      }
    };
    dispDbEntries(tempObj, function(k){
      res.render("trash",
        {
          foundDocs: k.foundDocs,
          currentPg: k.currentPg,
          disp: k.disp,
          pgCount: k.pgCount,
          filterArray: tempArray
        });
    });
});

router.put('/customerdata/trash', middleware.isLoggedIn, function(req,res){
  var idsQueue = req.body.pipeline.split(",");
  var action = req.body.action;

  if(action === "archiveToTrash"){
    clearObject(tempObj);
    tempObj = {
      idsQueue: idsQueue,
      sourceCollection: "Archive",
      destCollection: "Trash"
    };
    moveDocs(tempObj, function(){
      res.redirect('/customerdata/archives');
    });
  }
  if(action === "custToTrash"){
    clearObject(tempObj);
    tempObj = {
      idsQueue: idsQueue,
      sourceCollection: "Customer",
      destCollection: "Trash"
    };
    moveDocs(tempObj, function(){
      res.redirect('/customerdata');
    });
  }
  if(action === "deleteForever"){
    Trash.remove({_id: {$in: idsQueue}}, function(err){
      if(err){
        console.log(err);
      } else{
        console.log("Selected records deleted!");
        res.redirect('/customerdata/trash');
      }
    });
  }
});

module.exports = router;
