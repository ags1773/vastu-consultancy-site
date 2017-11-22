var express             = require("express"),
    // methodOverride      = require('method-override'),
    bodyParser          = require('body-parser'),
    mongoose            = require("mongoose"),
    expressSanitizer    = require('express-sanitizer')

mongoose.connect(process.env.DBURL_DEV2);
var Customer = require("./models/customers");
// var Campground = require("./models/campgrounds");

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
// app.use(methodOverride('_method'));

app.get("/", function(req,res){
    res.render('landing');
});
app.get("/contact-us", function(req,res){
    res.render("contactus");
});
app.post("/contact-us", function(req,res){
  var newCustomer = ({
    fname: req.sanitize(req.body.fname),
    lname: req.sanitize(req.body.lname),
    phone: req.sanitize(req.body.phone),
    email: req.sanitize(req.body.email)
  });
  Customer.create(newCustomer, function(err,customer){
    if(err){
      console.log("Error");
    } else{
      res.render("formsubmit");
    }
  })
});


app.listen(3000, "localhost", function(){
    console.log('Vastu Site now serving on localhost:3000');
});
