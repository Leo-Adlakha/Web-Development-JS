var express = require('express'),
    router  = express.Router({mergeParams: true}),
    Campground = require('../models/campground'),
    Comment    = require('../models/comment'),
    middleware = require('../middleware/') ;

router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

router.post("/", middleware.isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           req.flash("error", "Whoops, Something went wrong !!")
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               comment.author.id = req.user._id ;
               comment.author.username = req.user.username ;
               comment.save();
               campground.comments.push(comment);
               campground.save();
               req.flash("success", "Added a new comment !!") ;
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});

router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.isAuthorizedComment, function(req, res){
    // We can do the below or we can directly use req.params.id as we are using only that in our routes on templates of edit comments
    Campground.findById(req.params.id, function(err, foundCampground){
        if ( err ){
            console.log(err) ;
            req.flash("error", "Whoops, Something went wrong !!")
            res.redirect('/campgrounds/'+foundCampground._id) ;
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if ( err ){
                    console.log(err) ;
                    req.flash("error", "Whoops, Something went wrong !!")
                    res.redirect('/campgrounds/'+foundCampground._id) ;
                } else {
                    res.render("comments/edit", {campground: foundCampground, comment: foundComment}) ;
                }
            });
        }
    });
});

router.put("/:comment_id", middleware.isLoggedIn, middleware.isAuthorizedComment, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if ( err ) {
            console.log(err) ;
            req.flash("error", "Whoops, Something went wrong !!")
            res.redirect('back') ;
        } else {
            Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
                if ( err ){
                    console.log(err) ;
                    req.flash("error", "Whoops, Something went wrong !!")
                    res.redirect('/campgrounds'+ foundCampground._id) ;
                } else {
                    req.flash("info", "Successfully updated your comment !!")
                    res.redirect('/campgrounds/'+ foundCampground._id) ;
                }
            });
        }
    }) ;
}) ;

router.delete("/:comment_id", middleware.isLoggedIn, middleware.isAuthorizedComment, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if( err ){
            console.log(err) ;
            req.flash("error", "Whoops, Something went wrong !!")
            res.redirect('/campgrounds') ;
        } else {
            Comment.findByIdAndRemove(req.params.comment_id, function(err, foundComment){
                if ( err ){
                    console.log(err) ;
                    req.flash("error", "Whoops, Something went wrong !!")
                    res.redirect('/campgrounds/'+foundCampground._id) ;
                } else {
                    req.flash("success", "Succesfully deleted your comment!!")
                    res.redirect('/campgrounds/'+foundCampground._id) ;
                }
            }) ;
        }
    });
}) ;

module.exports = router ;

