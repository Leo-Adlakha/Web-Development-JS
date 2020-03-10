var request = require('request') ;
request('http://samples.openweathermap.org/data/2.5/weather?id=2172797&appid=b6907d289e10d714a6e88b30761fae22', function(error, response, body){
    if ( error ){
        console.log("ERROR!") ;
        console.log(error) ;
    }
    else{
        if ( response.statusCode == 200 ){
            var data = JSON.parse(body)
            console.log(data) ;
        }
    }
}) ;