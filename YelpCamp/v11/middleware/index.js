var middlewareObj = {} ;
var Campground = require('../models/campground'),
    Comment    = require('../models/comment') ;

middlewareObj.isLoggedIn = function(req, res, next ){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login to continue !!")
    res.redirect("/login");
} ;

middlewareObj.isAuthorizedComment = function(req, res, next ){
    Campground.findById(req.params.id, function(err, foundCampground){
        if( err ){
            console.log(err) ;
            req.flash("error", "Campground Not Found !!")
            res.redirect("back") ;
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if( err ){
                    console.log(err) ;
                    req.flash("error", "Comment Not Found !!")
                    res.redirect("back") ;
                } else {
                    if ( foundComment.author.id.equals(req.user._id) ){
                        next() ;
                    } else {
                        req.flash("error", "Sorry, You don't have acces to perform this operation !!")
                        res.redirect("back") ;
                    }
                }
            }) ;
        } 
    });
} ;

middlewareObj.isAuthorizedCampground = function(req, res, next ){
    Campground.findById(req.params.id, function(err, foundCampground){
        if ( err ){
            console.log(err) ;
            req.flash("error", "Campground Not Found !!")
            res.redirect("back") ;
        }else{
            if ( foundCampground.author.id.equals(req.user._id) ){
                next() ;
            } else{
                req.flash("error", "Sorry, You don't have acces to perform this operation !!")
                res.redirect("back") ;
            }
        }
    });
} ;

module.exports = middlewareObj ;