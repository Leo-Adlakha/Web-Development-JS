var express = require('express') ;
var app = express() ;

app.get('/', function(req, res){
    res.send("Hi there, Welcome to my Assignment!") ;
}) ;

app.get('/speak/:animal', function(req, res){
    var animal = req.params.animal ;
    if ( animal === 'pig' ){
        res.send('The ' + animal + ' says OINK!') ;
    }else if ( animal === 'cow' ){
        res.send('The ' + animal + ' says MOO!') ;
    }else{
        res.send('The ' + animal + ' says WOOF WOOF!') ;
    }
}) ;

app.get('/repeat/:word/:n', function(req, res){
    var word = req.params.word ;
    var n = Number(req.params.n) ;
    var string = "" ;
    for ( var i = 0 ; i < n ; i++ ){
        string += word + " " ;
    }
    res.send(string) ;
}) ;

app.get('*', function(req, res){
    res.send("Sorry, Page not Found.... What are you doing with your life?") ;
}) ;

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The server started at ' + process.env.PORT + ' ' + process.env.IP ) ;
}) ;