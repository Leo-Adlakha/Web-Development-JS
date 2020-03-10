var express = require('express') ;
var app = express() ;
var bodyparser = require('body-parser') ;
var friends = ['Tony', 'Rahul', 'Gaurav'] ;

app.set("view engine", "ejs") ;
app.use(bodyparser.urlencoded({extended: true})) ;

app.get('/', function(req, res){
    res.render('home') ;
}) ;

app.get("/friends", function(req, res){
    res.render('friends',{
        friends: friends
    }) ;
}) ;

app.post("/addfriend", function(req, res){
    friends.push(req.body.newfriend) ;
    res.redirect('/friends') ;
}) ;


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started with: " + process.env.PORT + " " + process.env.IP) ;
}) ;