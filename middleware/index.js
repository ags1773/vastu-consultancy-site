var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    next();
  } else{
    req.flash('error', 'Please log-in');
    res.redirect('/login');
  }
}

module.exports = middlewareObj;
