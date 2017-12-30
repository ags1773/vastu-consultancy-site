var express       = require('express'),
    router        = express.Router(),
    Customer      = require('../models/customers'),
    Archive       = require('../models/archives'),
    Trash         = require('../models/trashes'),
    middleware    = require('../middleware'),
    dispDbEntries = require('../public/dispDbEntries'),
    moveDocs      = require('../public/docsMovePgm');

//recordsPerPage value can be set
var recordsPerPage = 2;
var skipCounter = 0;
var renderData = [];
var tempArray = [];

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
  dispDbEntries("Customer", recordsPerPage, skipCounter, tempArray[0], tempArray[1], tempArray[2], function(foundDocs,pgCount,currentPg,disp){
    renderData.length = 0;
    renderData = [foundDocs,currentPg,disp,pgCount,tempArray]
    res.render("customerdata", {renderData: renderData});
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
      console.log("---bhingtas---");
      console.log(tempArray);
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
    dispDbEntries("Customer", recordsPerPage, skipCounter, tempArray[0], tempArray[1], tempArray[2], function(foundDocs,pgCount,currentPg,disp){
      renderData.length = 0;
      renderData = [foundDocs,currentPg,disp,pgCount,tempArray]
      res.render("customerdata", {renderData: renderData});
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
  tempArray.length = 0;
  skipCounter = 0;
  tempArray[0] = tempArray[1] = tempArray[2] = undefined;
  dispDbEntries("Archive", recordsPerPage, skipCounter, tempArray[0], tempArray[1], tempArray[2], function(foundDocs,pgCount,currentPg,disp){
    renderData.length = 0;
    renderData = [foundDocs,currentPg,disp,pgCount,tempArray]
    res.render("archives", {renderData: renderData});
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
      console.log("---bhingtas---");
      console.log(tempArray);
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
    dispDbEntries("Archive", recordsPerPage, skipCounter, tempArray[0], tempArray[1], tempArray[2], function(foundDocs,pgCount,currentPg,disp){
      renderData.length = 0;
      renderData = [foundDocs,currentPg,disp,pgCount,tempArray]
      res.render("archives", {renderData: renderData});
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

router.get("/customerdata/trash", middleware.isLoggedIn, function(req,res){
  tempArray.length = 0;
  skipCounter = 0;
  tempArray[0] = tempArray[1] = tempArray[2] = undefined;
  dispDbEntries("Trash", recordsPerPage, skipCounter, tempArray[0], tempArray[1], tempArray[2], function(foundDocs,pgCount,currentPg,disp){
    renderData.length = 0;
    renderData = [foundDocs,currentPg,disp,pgCount,tempArray]
    res.render("trash", {renderData: renderData});
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
      console.log("---bhingtas---");
      console.log(tempArray);
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
    dispDbEntries("Trash", recordsPerPage, skipCounter, tempArray[0], tempArray[1], tempArray[2], function(foundDocs,pgCount,currentPg,disp){
      renderData.length = 0;
      renderData = [foundDocs,currentPg,disp,pgCount,tempArray]
      res.render("trash", {renderData: renderData});
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
        res.redirect('/customerdata/trash');
      }
    });
  }
});

module.exports = router;
