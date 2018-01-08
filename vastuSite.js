var express               = require("express"),
    methodOverride        = require('method-override'),
    bodyParser            = require('body-parser'),
    mongoose              = require("mongoose"),
    expressSanitizer      = require('express-sanitizer'),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    session               = require('express-session'),
    seedDB                = require('./seeds'),
    flash                 = require('connect-flash');

var middleware = require('./middleware');

//==== Requiring routes ====
var navRoutes   = require('./routes/nav'),
    authRoutes  = require('./routes/auth'),
    customerDataRoutes  = require('./routes/customerdata'),
    archiveRoutes  = require('./routes/archives'),
    trashRoutes  = require('./routes/trash');

mongoose.connect(process.env.DBURL_DEV1);
var port = 8080;
var User = require("./models/users");
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(flash());
app.use(methodOverride('_method'));

//==== Passport and session configuration ====
app.use(session({
  secret: 'I think emojis are dumb',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==== middleware to make below objects available to all routes ====
app.use(function(req, res, next){
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.info = req.flash('info');
  res.locals.currentUser = req.user;
  next();
});
app.use(navRoutes);
app.use(authRoutes);
app.use(customerDataRoutes);
app.use(archiveRoutes);
app.use(trashRoutes);

//seedDB();

app.listen(port);
