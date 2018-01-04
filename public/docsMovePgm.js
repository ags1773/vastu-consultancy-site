//inputs: idsQueue, sourceCollection, destCollection
//data returned: NO
function docsMove(inputObj, callback){
  var Source, Destination;
  if(inputObj.sourceCollection === "Customer"){
    Source = require("../models/customers");
  }
  if(inputObj.sourceCollection === "Archive"){
    Source = require("../models/archives");
  }
  if(inputObj.sourceCollection === "Trash"){
    Source = require("../models/trashes");
  }
  if(inputObj.destCollection === "Customer"){
    Destination = require("../models/customers");
  }
  if(inputObj.destCollection === "Archive"){
    Destination = require("../models/archives");
  }
  if(inputObj.destCollection === "Trash"){
    Destination = require("../models/trashes");
  }

  Source.find({_id: {$in: inputObj.idsQueue}}, function(err, foundDocs){
    if(err){
      console.log(err);
    } else{
      console.log("Found " + foundDocs.length + " Docs..");
      Destination.insertMany(foundDocs, function(err, insertedDocs){
        if(err){
          console.log(err);
        } else{
          console.log(insertedDocs.length + " Documents inserted into collection " + inputObj.destCollection);
          Source.deleteMany({_id: {$in: insertedDocs}}, function(err, deletedDocs){
            if(err){
              console.log(err);
            } else{
              console.log(deletedDocs.result.n + " Documents deleted from collection " + inputObj.sourceCollection);
              return callback();
            }
          });
        }
      });
    }
  });
}

module.exports = docsMove;
