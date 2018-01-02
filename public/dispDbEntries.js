function filter(inputObj, callback){
  var Collection;
  var pgCount;
  if(inputObj.collection === "Archive"){
    Collection = require("../models/archives");
  }
  if(inputObj.collection === "Customer"){
    Collection = require("../models/customers");
  }
  if(inputObj.collection === "Trash"){
    Collection = require("../models/trashes");
  }

  var nameSrch = " ";
  var startDate = "000000000000000000000000";
  var endDate   = "ffffffffffffffffffffffff";
  if(inputObj.srchName){
    nameSrch = inputObj.srchName;
  }
  if(inputObj.startDt){
    var unixStartDate = Date.parse(inputObj.startDt.toString());
    startDate = (Math.floor(unixStartDate/1000)).toString(16) + "0000000000000000";
  }
  if(inputObj.endDt){
    var unixEndDate = Date.parse(inputObj.endDt.toString());
    endDate = (Math.floor(unixEndDate/1000) + 86399).toString(16) + "0000000000000000";
    //23 hrs 59 min 59 sec = 86399 sec. It will ensure to get even the last entry for the day
  }
  console.log("name Search --> " + nameSrch);
  console.log("start--> " + startDate);
  console.log("end--> " + endDate);
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
            name: {$regex : new RegExp(nameSrch, "i")}                          //slow but thorough search (does not use index). Searching 'tom' WILL show 'tommy' .Case insensitive, searches all characters under 'name'
          }
        ).sort({_id: 1}).limit(inputObj.recordsPerPage).skip(inputObj.skipCounter).exec(function(err,foundDocs){
          if(err){
            console.log(err);
          } else{
            let currentPg;
            let disp;
            if(count === 0){
              pgCount = currentPg = 1;
              disp = "No records found";
            } else{
              currentPg = (inputObj.skipCounter / inputObj.recordsPerPage) + 1;
              disp = (inputObj.skipCounter + 1) + " to " + (inputObj.skipCounter + (inputObj.recordsPerPage>count-inputObj.skipCounter?count-inputObj.skipCounter:inputObj.recordsPerPage)) + " of " + (count) + " Record(s)";
              ((count%inputObj.recordsPerPage) === 0)?(pgCount = count/inputObj.recordsPerPage):(pgCount=((count/inputObj.recordsPerPage)-((count%inputObj.recordsPerPage)/inputObj.recordsPerPage)+1));
            }
            // return callback(foundDocs,pgCount,currentPg,disp);
            let retObj = {
              foundDocs: foundDocs,
              pgCount: pgCount,
              currentPg: currentPg,
              disp: disp
            }
            return callback(retObj);
          }
        });
      }
    }
  );

}

module.exports = filter;
