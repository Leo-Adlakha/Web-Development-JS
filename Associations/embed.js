var mongoose = require("mongoose") ;
mongoose.connect("mongodb://localhost/blog_demo", { useNewUrlParser: true });

var postSchema = new mongoose.Schema({
	title: String,
	content: String
}) ;

var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	posts: [postSchema]
}) ;

var User = new mongoose.model("User", userSchema) ;
var Post = new mongoose.model("Post", postSchema) ;

// var newUser = new User({
// 	name: "Hermoine Granger",
// 	email: "hermoine@hogwarts.edu"
// }) ;

// newUser.posts.push({
// 	title: "Polyjuice Potion",
// 	content: "Attend the Potions Class!"
// }) ;

// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err) ;
// 	}else{
// 		console.log(user) ;
// 	}
// }) ;

// User.create(
// 	{
// 		name: "Leo",
// 		email: "leo8p18sb0092@gmail.com"
// 	}, function(err, user){
// 		if(err){
// 			console.log(err) ;
// 		}else{
// 			console.log(user) ;
// 		}
// 	}) ;

// Post.create({
// 	title: "Reflections on Apple",
// 	content: "They are very delicious"
// }, function(err, post){
// 	if(err){
// 		console.log(err) ;
// 	}else{
// 		console.log(post) ;
// 	}
// }) ;

User.findOne({
	name: "Hermoine Granger"
}, function(err, user){
	if(err){
		console.log(err) ;
	}else{
		user.posts.push({
			title: "I hate: ",
			content: "Malfoy"
		}) ;
		user.save(function(err, user){
			if(err){
				console.log(err) ;
			}else{
				console.log(user) ;
			}
		}) ;
	}
}) ;
