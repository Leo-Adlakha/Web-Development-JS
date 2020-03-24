var express = require('express'),
    router  = express.Router(),
    passport = require('passport'),
    User    = require('../models/user') ;

router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message ) ;
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "You've successfully registered as " + user.username) ;
            res.redirect("/campgrounds"); 
        });
    });
});

// show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
        req.flash("error", "You've successfully logged in as " + req.body.user.username ) ;
});

// logic route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Succesfully Logged you out !!")
   res.redirect("/campgrounds");
});

module.exports = router ;