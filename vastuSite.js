var express             = require("express"),
    app                 = express(),
    // methodOverride      = require('method-override'),
    bodyParser          = require('body-parser'),
    // mongoose            = require("mongoose"),
    expressSanitizer    = require('express-sanitizer')

// mongoose.connect('mongodb://localhost/yelp_camp');
// var Comment = require("./models/comments");
// var Campground = require("./models/campgrounds");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
// app.use(methodOverride('_method'));

app.get('/', function(req,res){
    res.render('landing');

});

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log('YelpCamp Server started!');
// });
app.listen(8080);
