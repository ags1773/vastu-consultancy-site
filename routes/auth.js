var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require("../models/users");

//Login
router.get('/login', function(req,res){
  res.render("login");
});
router.get('/contact-us/login', function(req,res){
  res.redirect('/login');
});
router.post('/login', passport.authenticate('local', {
  successRedirect: '/customerdata',
  failureRedirect: '/login',
  failureFlash: true
  })
);

//Register
router.get('/register', function(req,res){
  if(!req.isAuthenticated()){
    res.render('register');
  } else{
    res.redirect('/');
  }
});
router.post('/register', function(req,res){
  var newUser = ({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      // req.session.message = "Error registering user";
      return res.redirect('register');
    }
    passport.authenticate('local')(req,res,function(){
      res.redirect('customerdata');
    });
  });
});
//Logout
router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
