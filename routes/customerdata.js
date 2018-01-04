var express       = require("express"),
    router        = express.Router(),
    middleware    = require("../middleware"),
    dispDbEntries = require("../public/dispDbEntries"),
    moveDocs      = require("../public/docsMovePgm");

var recordsPerPage = 10;
var skipCounter = 0;
var tempArray = [];
var tempObj = {};
var clearObject = function(obj){
  Object.keys(obj).forEach(function(key){
    delete obj[key];
  })
};

router.get("/customerdata", middleware.isLoggedIn, function(req,res){
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

router.post("/customerdata", middleware.isLoggedIn, function(req,res){
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
      if(typeof pipelineData[2] !== "undefined"){
        tempArray[0] = req.sanitize(pipelineData[2]);
      }
      if(typeof pipelineData[3] !== "undefined"){
        tempArray[1] = req.sanitize(pipelineData[3]);
      }
      if(typeof pipelineData[4] !== "undefined"){
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

router.put("/customerdata", middleware.isLoggedIn, function(req,res){
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
      res.redirect("/customerdata/archives");
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
      res.redirect("/customerdata/trash");
    });
  }
});

module.exports = router;
