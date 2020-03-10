var mongoose = require("mongoose") ;
mongoose.connect("mongodb://localhost/blog_demo_2", { useNewUrlParser: true });

var Post = require('./models/posts') ;

var User = require('./models/users') ;

// Post.create({
// 	title: "Best Burger",
// 	content: "Seriously, the best!"
// }, function(err, post){
// 	if(err){
// 		console.log(err) ;
// 	}else{
// 		User.findOne({email: "bob@gmail.com"}, function(err, user){
// 			if(err){
// 				console.log(err) ;
// 			}else{
// 				user.posts.push(post) ;
// 				user.save(function(err, data){
// 				if (err){
// 					console.log(err) ;
// 				}
// 				else{
// 					console.log(data) ;
// 				}
// 			}) ;
// 			}
// 		}) ;
// 	}
// }) ;

User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
	if(err){
		console.log(err) ;
	}else{
		console.log(user) ;
	}
}) ;

// User.create({
// 	name: "Bob, The Builder",
// 	email: "bob@gmail.com"
// }) ;