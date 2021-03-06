var express = require('express'),
    router  = express.Router(),
    Campground = require('../models/campground'),
    middleware = require('../middleware/') ;

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    } ;
    var newCampground = {name: name, image: image, description: desc, author: author} ;
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            req.flash("error", "Whoops, Something went wrong !!");
            console.log(err);
        } else {
            req.flash("success", "Succesfully added a new Campground !!");
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            req.flash("error", "Whoops, Something went wrong !!");
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT - campgrounds route
router.get("/:id/edit", middleware.isLoggedIn, middleware.isAuthorizedCampground, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            req.flash("error", "Whoops, Something went wrong !!");
            console.log(err) ;
        }else{
            if ( foundCampground.author.id.equals(req.user._id) ){
                res.render('campgrounds/edit', {campground: foundCampground});
            } else{
                req.flash("error", "Sorry, You're not authorized to edit this campground !!");
            }
        }
    })
});

// UPDATE - campgrounds route
router.put("/:id", middleware.isLoggedIn, middleware.isAuthorizedCampground, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if ( err ){
            console.log(err) ;
            req.flash("error", "Whoops, Something went wrong !!");
            res.redirect('/campgrounds/'+req.params.id) ;
        } else{
            req.flash("info", "Successfully updated the Campground !!");
            res.redirect('/campgrounds/'+req.params.id) ;
        }
    })
});

// DELETE
router.delete("/:id", middleware.isLoggedIn, middleware.isAuthorizedCampground, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err, deletecampground){
        if ( err ){
            console.log(err) ;
            req.flash("error", "Whoops, Something went wrong !!");
            res.redirect('/campgrounds') ;
        }else{
            req.flash("success", "Successfully deleted the Campground !!");
            res.redirect('/campgrounds') ;
        }
    })
}) ;

module.exports = router ;