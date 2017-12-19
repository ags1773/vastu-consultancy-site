function docsMove(idsQueue, sourceCollection, destCollection, callback){
  var Source, Destination;
  if(sourceCollection === "Customer"){
    Source = require("../models/customers");
  }
  if(sourceCollection === "Archive"){
    Source = require("../models/archives");
  }
  if(sourceCollection === "Trash"){
    Source = require("../models/trashes");
  }
  if(destCollection === "Customer"){
    Destination = require("../models/customers");
  }
  if(destCollection === "Archive"){
    Destination = require("../models/archives");
  }
  if(destCollection === "Trash"){
    Destination = require("../models/trashes");
  }

  Source.find({_id: {$in: idsQueue}}, function(err, foundDocs){
    if(err){
      console.log(err);
    } else{
      console.log("Found " + foundDocs.length + " Docs..");
      Destination.insertMany(foundDocs, function(err, insertedDocs){
        if(err){
          console.log(err);
        } else{
          console.log(insertedDocs.length + " Documents inserted into collection " + destCollection);
          Source.deleteMany({_id: {$in: insertedDocs}}, function(err, deletedDocs){
            if(err){
              console.log(err);
            } else{
              console.log(deletedDocs.result.n + " Documents deleted from collection " + sourceCollection);
              //res.redirect('/customerdata');
              return callback();
            }
          });
        }
      });
    }
  });
}

module.exports = docsMove;
