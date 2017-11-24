var express               = require("express"),
    // methodOverride     = require('method-override'),
    bodyParser            = require('body-parser'),
    mongoose              = require("mongoose"),
    expressSanitizer      = require('express-sanitizer'),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    session               = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash')


mongoose.connect(process.env.DBURL_DEV1);
var port = 8080;
var Customer = require("./models/customers");
var User = require("./models/users");
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
// app.use(methodOverride('_method'));

//==== Passport and session configuration ====
app.use(session({
  secret: 'I think emojis are dumb',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==== Cookie-parser and connect-flash config ===
app.use(cookieParser('I think emojis are dumb'));
app.use(flash());

//==== middleware to make 'currentUser' object available to all routes ====
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//==== restful routes ====
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
      console.log("Error adding customer to DB");
      console.log(err);
    } else{
      res.render("formsubmit");
    }
  })
});
app.get('/customerdata', isLoggedIn, function(req,res){
  res.render("customerdata");
});

//==== Auth routes ====
//Login
app.get('/login', function(req,res){
    if(!req.isAuthenticated()){
      res.render("login", {msg: req.session.flash || ''});
      delete req.session.flash;
    } else {
      res.redirect('/');
    }
});
app.get('/contact-us/login', function(req,res){
  res.redirect('/login');
});
app.post('/login', passport.authenticate('local', {
    successRedirect: '/customerdata',
    failureRedirect: '/login',
    failureFlash: true })
);

//Register
app.get('/register', function(req,res){
    res.render('register');
});
app.post('/register', function(req,res){
    var newUser = ({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log("Error resistering user");
            console.log(err);
            return res.redirect('register');
        }
        passport.authenticate('local')(req,res,function(){
            res.redirect('customerdata');
        });
    });
});
//Logout
app.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
});

//==== Middleware to check if user is logged in ====
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen(port);
