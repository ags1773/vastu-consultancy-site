var express       = require("express"),
    router        = express.Router(),
    middleware    = require("../middleware"),
    dispDbEntries = require("../public/dispDbEntries"),
    moveDocs      = require("../public/docsMovePgm");

//recordsPerPage can be set, but SET THE SAME VALUE IN customerdata.js, archives.js and trash.js
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
  if(req.session.skipCtr){
    skipCounter = req.session.skipCtr;
    req.session.skipCtr = null;
  }
  if(req.session.filter){
    tempArray = req.session.filter;
    req.session.filter = null;
  }
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
        filterArray: tempArray,
        skipCounter: skipCounter,
        recordsPerPage: recordsPerPage
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
          filterArray: tempArray,
          skipCounter: skipCounter,
          recordsPerPage: recordsPerPage
        });
    });
});

router.put("/customerdata", middleware.isLoggedIn, function(req,res){
  let pipelineData = req.body.pipeline.split(",");
  let skipCounter = pipelineData[0];
  let filterArray = pipelineData.slice(1,4);
  let idsQueue = pipelineData.slice(4);
  let action = req.body.action;

  if(action === "archiveToCust"){
    clearObject(tempObj);
    tempObj = {
      idsQueue: idsQueue,
      sourceCollection: "Archive",
      destCollection: "Customer"
    };
    moveDocs(tempObj, function(){
      req.session.skipCtr = skipCounter;
      req.session.filter = filterArray;
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
      req.session.skipCtr = skipCounter;
      req.session.filter = filterArray;
      res.redirect("/customerdata/trash");
    });
  }
});

module.exports = router;
