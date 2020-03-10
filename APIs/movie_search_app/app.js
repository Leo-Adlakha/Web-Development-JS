var express = require('express') ;
var app = express() ;
var bodyparser = require('body-parser') ;
var request = require('request') ;
var searchedMovies = [] ;
var results = 0 ;
var totalResults = 0 ;

app.set("view engine", "ejs") ;
app.use(bodyparser.urlencoded({extended: true})) ;

app.get('/', function(req, res){
    res.render('search', {
        movies: searchedMovies, 
        results: results,
        totalResults: totalResults 
    }) ;
}) ;

app.post('/searchmovie', function(req, res){
    var item = req.body.item ;
    var api_string = 'http://www.omdbapi.com/?apikey=thewdb&plot=full&s=' + item ;
    request(api_string, function(error, response, body){
    if ( !error && response.statusCode == 200 ){
        var data = JSON.parse(body) ;
        // console.log(data.search.length) ;
        for ( var i = 0 ; i < data.Search.length ; i++ ){
            searchedMovies.push(data.Search[i]) ;
            results++ ;
        }
    totalResults = data.totalResults ;
    res.redirect('/')
    }
    else{
        console.log(error) ;
        console.log(response.statusCode) ;
    }
}) ;
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started as: " + process.env.PORT + " " + process.env.IP) ;
}) ;
