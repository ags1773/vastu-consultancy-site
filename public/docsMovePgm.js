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
      if(inputObj.destCollection === "Trash"){
        foundDocs.forEach(function(doc){
          doc.expiryCtr = new Date();
          console.log("name ==> " + doc.name + " expiryCtr => " + doc.expiryCtr);
        });
      }
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


// inputObj.idsQueue.forEach(function(id){
//   console.log("Moving docs one at a time...");
//   Source.findOne({_id: id}, function(err,foundDoc){
//     if(err){
//       console.log(err);
//     } else{
//       console.log("Found document in " + inputObj.sourceCollection + " Collection -> " + foundDoc);
//       foundDoc.expiryCtr = new Date();
//       Destination.insertOne(foundDoc, function(err,insertedDoc){
//         if(err){
//           console.log(err);
//         } else{
//           console.log("Inserted into " + inputObj.destCollection + " Collection -> " + insertedDoc);
//           Source.deleteOne({_id:id}, function(err,deletedDoc){
//             if(err){
//               console.log(err);
//             } else{
//               console.log("Deleted from " + inputObj.sourceCollection + " Collection -> " + deletedDoc);
//               return callback();
//             }
//           });
//         }
//       });
//     }
//   });
// });
