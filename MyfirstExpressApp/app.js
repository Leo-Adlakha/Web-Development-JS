var express = require('express') ;
var app = express() ;

app.get("/", function(req, res){
    res.send('Hi there!') ;
}) ;

app.get('/bye', function(req, res){
    res.send("GoodBye") ;
}) ;

app.get('/dogs', function(req, res){
    res.send("MEOW!!!") ;
}) ; 

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started as: " + process.env.PORT + " " + process.env.IP) ;
}) ;