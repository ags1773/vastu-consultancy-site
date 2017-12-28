function filter(collection, recordsPerPage, skipCounter, srchName, startDt, endDt, callback){
  var Collection;
  var pgCount;
  if(collection === "Archive"){
    Collection = require("../models/archives");
  }
  if(collection === "Customer"){
    Collection = require("../models/customers");
  }
  if(collection === "Trash"){
    Collection = require("../models/trashes");
  }

  var nameSrch = " ";
  var startDate = "000000000000000000000000";
  var endDate   = "ffffffffffffffffffffffff";
  if(srchName){
    nameSrch = srchName;
  }
  if(startDt){
    var unixStartDate = Date.parse(startDt.toString());
    startDate = (Math.floor(unixStartDate/1000)).toString(16) + "0000000000000000";
  }
  if(endDt){
    var unixEndDate = Date.parse(endDt.toString());
    endDate = (Math.floor(unixEndDate/1000) + 86399).toString(16) + "0000000000000000";
    //23 hrs 59 min 59 sec = 86399 sec. It will ensure to get even the last entry for the day
  }
  console.log("name Search --> " + nameSrch);
  console.log("start--> " + startDate);
  console.log("end--> " + endDate);
  // Collection.find(
  //   {
  //     _id : {$gte : startDate, $lte : endDate},
  //     name: {$regex : new RegExp(nameSrch, "i")}                                //slow but thorough search (does not use index). Searching 'tom' WILL show 'tommy' .Case insensitive, searches all characters under 'name'
  //   },
  //   function(err,foundDocs){
  //     if(err){
  //       console.log(err);
  //     } else{
  //       return callback(foundDocs);
  //     }
  //   }
  // );
  Collection.count(
    {
      _id : {$gte : startDate, $lte : endDate},
      name: {$regex : new RegExp(nameSrch, "i")}                                //slow but thorough search (does not use index). Searching 'tom' WILL show 'tommy' .Case insensitive, searches all characters under 'name'
    }, function(err,count){
      if(err){
        console.log(err);
      } else{
        Collection.find(
          {
            _id : {$gte : startDate, $lte : endDate},
            name: {$regex : new RegExp(nameSrch, "i")}                                //slow but thorough search (does not use index). Searching 'tom' WILL show 'tommy' .Case insensitive, searches all characters under 'name'
          }
        ).sort({_id: 1}).limit(recordsPerPage).skip(skipCounter).exec(function(err,foundDocs){
          if(err){
            console.log(err);
          } else{
            ((count%recordsPerPage) === 0)?(pgCount = count/recordsPerPage):(pgCount=((count/recordsPerPage)-((count%recordsPerPage)/recordsPerPage)+1));
            let currentPg = (skipCounter / recordsPerPage) + 1;
            let disp = (skipCounter + 1) + " to " + (skipCounter + (recordsPerPage>count-skipCounter?count-skipCounter:recordsPerPage)) + " of " + (count);
            return callback(foundDocs,pgCount,currentPg,disp);
          }
        });
      }
    }
  );

}

module.exports = filter;
