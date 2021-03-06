var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus consectetur ipsam libero accusantium voluptas mollitia eaque quo ab sit, eius, deleniti sunt iusto aperiam impedit vel quos modi voluptates. Magnam!"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus consectetur ipsam libero accusantium voluptas mollitia eaque quo ab sit, eius, deleniti sunt iusto aperiam impedit vel quos modi voluptates. Magnam!"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus consectetur ipsam libero accusantium voluptas mollitia eaque quo ab sit, eius, deleniti sunt iusto aperiam impedit vel quos modi voluptates. Magnam!"
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        // console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    // console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                // console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
